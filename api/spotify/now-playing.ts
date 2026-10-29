import type { NowPlaying, SpotifyTrack } from "../../src/types/spotify";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";
const ALBUM_IMAGE_MIN_WIDTH = 300;

type SpotifyApiTrack = {
  id: string;
  name: string;
  duration_ms: number;
  external_urls: { spotify: string };
  artists: { name: string; external_urls: { spotify: string } }[];
  album: {
    name: string;
    external_urls: { spotify: string };
    images: { url: string; width: number | null }[];
  };
};

type CurrentlyPlayingResponse = {
  is_playing: boolean;
  progress_ms: number | null;
  currently_playing_type: string;
  item: SpotifyApiTrack | null;
};

type RecentlyPlayedResponse = {
  items: { played_at: string; track: SpotifyApiTrack }[];
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  const clientId = requireEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET");
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: requireEnv("SPOTIFY_REFRESH_TOKEN"),
    }),
  });
  if (!response.ok) throw new Error(`Spotify token refresh failed: ${response.status}`);

  const { access_token, expires_in } = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };
  cachedToken = { value: access_token, expiresAt: Date.now() + (expires_in - 60) * 1000 };
  return access_token;
}

async function spotifyGet<T>(path: string, token: string): Promise<T | null> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 204) return null;
  if (!response.ok) throw new Error(`Spotify ${path} failed: ${response.status}`);
  return (await response.json()) as T;
}

function toTrack(track: SpotifyApiTrack): SpotifyTrack {
  const images = [...track.album.images].sort((a, b) => (a.width ?? 0) - (b.width ?? 0));
  const image = images.find((candidate) => (candidate.width ?? 0) >= ALBUM_IMAGE_MIN_WIDTH) ?? images.at(-1);

  return {
    id: track.id,
    title: track.name,
    url: track.external_urls.spotify,
    durationMs: track.duration_ms,
    artists: track.artists.map((artist) => ({ name: artist.name, url: artist.external_urls.spotify })),
    album: {
      name: track.album.name,
      url: track.album.external_urls.spotify,
      imageUrl: image?.url ?? null,
    },
  };
}

async function readNowPlaying(): Promise<NowPlaying> {
  const token = await getAccessToken();
  const current = await spotifyGet<CurrentlyPlayingResponse>("/me/player/currently-playing", token);

  if (current?.item && current.currently_playing_type === "track") {
    const track = toTrack(current.item);
    const progressMs = current.progress_ms ?? 0;
    return current.is_playing
      ? { state: "playing", track, progressMs, fetchedAt: Date.now() }
      : { state: "paused", track, progressMs };
  }

  const recent = await spotifyGet<RecentlyPlayedResponse>("/me/player/recently-played?limit=1", token);
  const last = recent?.items[0];
  return last ? { state: "recent", track: toTrack(last.track), playedAt: last.played_at } : { state: "offline" };
}

export async function GET() {
  try {
    return Response.json(await readNowPlaying(), {
      headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30" },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ state: "offline" } satisfies NowPlaying, {
      status: 502,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
