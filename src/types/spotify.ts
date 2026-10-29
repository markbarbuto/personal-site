export type SpotifyArtist = {
  name: string;
  url: string;
};

export type SpotifyTrack = {
  id: string;
  title: string;
  url: string;
  durationMs: number;
  artists: SpotifyArtist[];
  album: {
    name: string;
    url: string;
    imageUrl: string | null;
  };
};

export type NowPlaying =
  | { state: "playing"; track: SpotifyTrack; progressMs: number; fetchedAt: number }
  | { state: "paused"; track: SpotifyTrack; progressMs: number }
  | { state: "recent"; track: SpotifyTrack; playedAt: string }
  | { state: "offline" };
