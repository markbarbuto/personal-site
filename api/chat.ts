import type { AssistantRequest } from "../src/types/assistant";

const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY = 6;
const MAX_HISTORY_CHARS = 1000;
// Covers the whole stream, not just the headers: an answer queued behind three others can take a few minutes.
const BACKEND_TIMEOUT_MS = 240_000;

function parseRequest(body: unknown): AssistantRequest | null {
  if (typeof body !== "object" || body === null) return null;
  const { message, history } = body as Record<string, unknown>;
  if (typeof message !== "string" || !message.trim() || message.length > MAX_MESSAGE_CHARS) return null;
  if (!Array.isArray(history) || history.length > MAX_HISTORY) return null;
  if (!history.every((entry) => typeof entry === "string" && entry.length <= MAX_HISTORY_CHARS)) return null;
  return { message, history };
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";
}

function badGateway() {
  return Response.json({ error: "Assistant unavailable" }, { status: 502, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const body = parseRequest(await request.json().catch(() => null));
  if (!body) {
    return Response.json(
      {
        error: `Expected { message, history } with a message of 1-${MAX_MESSAGE_CHARS} characters and at most ${MAX_HISTORY} history entries of ${MAX_HISTORY_CHARS} characters each`,
      },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const backendUrl = process.env.VITAE_BACKEND_URL;
  const edgeSecret = process.env.VITAE_EDGE_SECRET;
  if (!backendUrl || !edgeSecret) {
    console.error("Missing VITAE_BACKEND_URL or VITAE_EDGE_SECRET");
    return badGateway();
  }

  try {
    const upstream = await fetch(`${backendUrl.replace(/\/$/, "")}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Edge-Secret": edgeSecret,
        "X-Client-IP": clientIp(request),
      },
      body: JSON.stringify({ question: body.message, history: body.history }),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
    if (upstream.status !== 200 || !upstream.body) {
      console.error(`Vitae backend returned ${upstream.status}`);
      return badGateway();
    }
    return new Response(upstream.body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform" },
    });
  } catch (error) {
    console.error(`Vitae backend unreachable: ${error instanceof Error ? error.name : "unknown error"}`);
    return badGateway();
  }
}
