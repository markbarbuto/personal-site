import type { AssistantEvent, AssistantRequest } from "../types/assistant";

const EVENT_NAMES = new Set<string>(["meta", "token", "refusal", "done", "busy", "rate_limited", "error"]);

export async function* streamAssistant(request: AssistantRequest): AsyncGenerator<AssistantEvent> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok || !response.body) {
    throw new Error(`Assistant API returned ${response.status}`);
  }
  yield* readAssistantEvents(response.body);
}

export async function* readAssistantEvents(body: ReadableStream<Uint8Array>): AsyncGenerator<AssistantEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let pending = "";

  for (;;) {
    const { done, value } = await reader.read();
    const text = pending + (done ? "" : decoder.decode(value, { stream: true }));
    // SSE allows CRLF, LF or CR. A trailing CR waits for the next chunk in case it is half of a CRLF.
    pending = !done && text.endsWith("\r") ? "\r" : "";
    buffer += (pending ? text.slice(0, -1) : text).replace(/\r\n?/g, "\n");

    let end;
    while ((end = buffer.indexOf("\n\n")) !== -1) {
      const event = parseEvent(buffer.slice(0, end));
      buffer = buffer.slice(end + 2);
      if (event) yield event;
    }
    if (done) return;
  }
}

function parseEvent(block: string): AssistantEvent | null {
  let name = "";
  let data = "";
  for (const line of block.split("\n")) {
    if (line.startsWith("event:")) name = line.slice(6).trim();
    else if (line.startsWith("data:")) data += line.slice(5).trim();
  }
  if (!EVENT_NAMES.has(name)) return null;
  return { event: name, data: JSON.parse(data) } as AssistantEvent;
}
