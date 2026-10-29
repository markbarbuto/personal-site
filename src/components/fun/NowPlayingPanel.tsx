import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa6";
import type { NowPlaying } from "../../types/spotify";

const NOW_PLAYING_URL = "/api/spotify/now-playing";
const POLL_INTERVAL = 20_000;
const PANEL_CLASS_NAME =
  "relative isolate flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#14141c] p-4 text-white shadow-[0_16px_38px_rgba(0,0,0,0.11)] sm:p-5";

const COVER_CLASS_NAME = "h-[60px] w-[60px] flex-none rounded-xl sm:h-[104px] sm:w-[104px]";

const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function formatRelative(isoDate: string, now: number) {
  const minutes = Math.round((new Date(isoDate).getTime() - now) / 60_000);
  if (minutes > -60) return relativeTime.format(Math.min(minutes, -1), "minute");
  const hours = Math.round(minutes / 60);
  if (hours > -24) return relativeTime.format(hours, "hour");
  return relativeTime.format(Math.round(hours / 24), "day");
}

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

function getProgressMs(nowPlaying: NowPlaying, now: number) {
  if (nowPlaying.state === "playing") {
    return Math.min(nowPlaying.progressMs + now - nowPlaying.fetchedAt, nowPlaying.track.durationMs);
  }
  return nowPlaying.state === "paused" ? nowPlaying.progressMs : null;
}

function useNowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    async function load(initial = false) {
      let next: NowPlaying = { state: "offline" };
      if (initial || !document.hidden) {
        try {
          next = (await (await fetch(NOW_PLAYING_URL)).json()) as NowPlaying;
        } catch {
          next = { state: "offline" };
        }
        if (cancelled) return;
        setNowPlaying(next);
      }

      const remainingMs =
        next.state === "playing"
          ? next.track.durationMs - (next.progressMs + Date.now() - next.fetchedAt)
          : Infinity;
      timer = window.setTimeout(() => load(), Math.max(1000, Math.min(POLL_INTERVAL, remainingMs + 1000)));
    }

    load(true);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return nowPlaying;
}

function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);

  return now;
}

function EqualizerIcon() {
  return (
    <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
      {[0, 180, 360].map((delay) => (
        <span
          key={delay}
          className="now-playing-bar h-full w-[3px] rounded-full bg-[#1ed760]"
          style={{ animationDelay: `-${delay}ms` }}
        />
      ))}
    </span>
  );
}

function GlossySheen() {
  return <span aria-hidden="true" className="now-playing-sheen pointer-events-none absolute inset-0 -z-10 rounded-[inherit]" />;
}

type PanelLayoutProps = {
  status: ReactNode;
  spotifyIconClassName: string;
  cover: ReactNode;
  title: ReactNode;
  artists: ReactNode;
  album: ReactNode;
  progress: { bar: ReactNode; elapsed: ReactNode; total: ReactNode } | null;
  className?: string;
};

function PanelLayout({
  status,
  spotifyIconClassName,
  cover,
  title,
  artists,
  album,
  progress,
  className = "",
}: PanelLayoutProps) {
  return (
    <div className={`flex h-full flex-col justify-between gap-2.5 ${className}`}>
      <div className="flex items-center justify-between gap-3 text-[12px] font-semibold tracking-[0.08em] text-white/80">
        <span className="flex min-w-0 items-center gap-2">{status}</span>
        <FaSpotify aria-hidden="true" className={`h-5 w-5 flex-none ${spotifyIconClassName}`} />
      </div>

      <div className="flex min-w-0 items-center gap-4">
        {cover}
        <div className="min-w-0 flex-1">
          <div className="truncate text-[17px] font-bold leading-tight">{title}</div>
          <div className="mt-1 truncate text-[14px] text-white/80">{artists}</div>
          <div className="mt-0.5 truncate text-[13px] text-white/55">{album}</div>
        </div>
      </div>

      <div aria-hidden={!progress} className={progress ? "" : "invisible"}>
        <div className="h-1 overflow-hidden rounded-full bg-white/20">{progress?.bar}</div>
        <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-white/60">
          <span>{progress?.elapsed ?? "0:00"}</span>
          <span>{progress?.total ?? "0:00"}</span>
        </div>
      </div>
    </div>
  );
}

function Bone({ className }: { className: string }) {
  return <span aria-hidden="true" className={`inline-block h-[0.8em] rounded-full bg-white/15 align-middle ${className}`} />;
}

type PanelSkeletonProps = {
  fading: boolean;
  onFaded: () => void;
};

function PanelSkeleton({ fading, onFaded }: PanelSkeletonProps) {
  return (
    <div
      role={fading ? undefined : "status"}
      aria-hidden={fading}
      className={`absolute inset-0 p-4 sm:p-5 ${fading ? "now-playing-skeleton-exit" : ""}`}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) onFaded();
      }}
    >
      <span className="sr-only">Loading what I'm listening to</span>
      <PanelLayout
        className="animate-pulse"
        status={<Bone className="w-24" />}
        spotifyIconClassName="text-white/25"
        cover={<span aria-hidden="true" className={`${COVER_CLASS_NAME} bg-white/15`} />}
        title={<Bone className="w-36 max-w-full bg-white/20" />}
        artists={<Bone className="w-24" />}
        album={<Bone className="w-16 bg-white/10" />}
        progress={{ bar: null, elapsed: <Bone className="w-6" />, total: <Bone className="w-6" /> }}
      />
    </div>
  );
}

export function NowPlayingPanel() {
  const nowPlaying = useNowPlaying();
  const now = useNow(nowPlaying?.state === "playing" ? 1000 : 30_000);
  const [hasShownArt, setHasShownArt] = useState(false);
  const [skeletonGone, setSkeletonGone] = useState(false);

  if (nowPlaying?.state === "offline") {
    return (
      <div className={`${PANEL_CLASS_NAME} items-center justify-center text-[14px] text-white/70`}>
        <GlossySheen />
        <div className="now-playing-reveal flex flex-col items-center gap-2">
          <FaSpotify aria-hidden="true" className="h-7 w-7 text-[#1ed760]" />
          Nothing on Spotify right now
        </div>
      </div>
    );
  }

  const track = nowPlaying ? nowPlaying.track : null;
  const ready = track !== null && (hasShownArt || !track.album.imageUrl);
  const artists = track?.artists.map((artist) => artist.name).join(", ");
  const progressMs = nowPlaying ? getProgressMs(nowPlaying, now) : null;

  return (
    <a
      href={track?.url}
      target="_blank"
      rel="noreferrer"
      aria-label={track ? `${track.title} by ${artists}, open on Spotify` : undefined}
      aria-busy={!ready}
      className={`${PANEL_CLASS_NAME} ${
        track
          ? "fun-item focus:outline-none focus-visible:ring-2 focus-visible:ring-appleBlue focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#19191f]"
          : ""
      }`}
    >
      {track?.album.imageUrl && (
        <img
          src={track.album.imageUrl}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-30 h-full w-full scale-125 object-cover blur-2xl transition-opacity duration-500 ${
            ready ? "opacity-70" : "opacity-0"
          }`}
        />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-t from-black/25 via-black/10 to-black/5"
      />
      <GlossySheen />

      {!skeletonGone && <PanelSkeleton fading={ready} onFaded={() => setSkeletonGone(true)} />}

      {nowPlaying && track && (
        <PanelLayout
          className={ready ? "now-playing-reveal" : "opacity-0"}
          status={
            <>
              {nowPlaying.state === "playing" && <EqualizerIcon />}
              <span className="truncate">
                {nowPlaying.state === "playing"
                  ? "Listening now"
                  : nowPlaying.state === "paused"
                    ? "Paused"
                    : `Last played ${formatRelative(nowPlaying.playedAt, now)}`}
              </span>
            </>
          }
          spotifyIconClassName="text-[#1ed760]"
          cover={
            track.album.imageUrl && (
              <img
                src={track.album.imageUrl}
                alt={`${track.album.name} album cover`}
                onLoad={() => setHasShownArt(true)}
                onError={() => setHasShownArt(true)}
                className={`${COVER_CLASS_NAME} object-cover shadow-[0_10px_28px_rgba(0,0,0,0.35)]`}
              />
            )
          }
          title={track.title}
          artists={artists}
          album={track.album.name}
          progress={
            progressMs === null
              ? null
              : {
                  bar: (
                    <div
                      className="h-full rounded-full bg-white transition-[width] duration-1000 ease-linear"
                      style={{ width: `${(progressMs / track.durationMs) * 100}%` }}
                    />
                  ),
                  elapsed: formatDuration(progressMs),
                  total: formatDuration(track.durationMs),
                }
          }
        />
      )}
    </a>
  );
}
