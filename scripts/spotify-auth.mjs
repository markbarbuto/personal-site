// One-time helper that prints a Spotify refresh token for api/spotify/now-playing.ts.
// Usage: node --env-file=.env.local scripts/spotify-auth.mjs
import { randomBytes } from "node:crypto";
import { createServer } from "node:http";

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-read-currently-playing user-read-recently-played";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first.");
  process.exit(1);
}

const state = randomBytes(16).toString("hex");
const authorizeUrl = new URL("https://accounts.spotify.com/authorize");
authorizeUrl.search = new URLSearchParams({
  response_type: "code",
  client_id: clientId,
  scope: SCOPES,
  redirect_uri: REDIRECT_URI,
  state,
}).toString();

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", REDIRECT_URI);
  if (url.pathname !== "/callback") {
    response.writeHead(404).end();
    return;
  }

  const code = url.searchParams.get("code");
  if (url.searchParams.get("state") !== state || !code) {
    response.writeHead(400).end("Authorization failed. Check the terminal.");
    console.error("Authorization failed:", url.searchParams.get("error") ?? "state mismatch");
    server.close();
    return;
  }

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT_URI }),
  });
  const body = await tokenResponse.json();

  if (!tokenResponse.ok) {
    response.writeHead(500).end("Token exchange failed. Check the terminal.");
    console.error("Token exchange failed:", body);
  } else {
    response.writeHead(200).end("Done. Copy the refresh token from your terminal.");
    console.log(`\nSPOTIFY_REFRESH_TOKEN=${body.refresh_token}\n`);
    console.log("Add it to .env.local and to the Vercel project's environment variables.");
  }
  server.close();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Add ${REDIRECT_URI} as a redirect URI in your Spotify app, then open:\n\n${authorizeUrl}\n`);
});
