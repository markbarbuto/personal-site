import type { FunItem } from "../types/content";

export const funItems: FunItem[] = [
  {
    key: "gunners",
    icon: "⚽",
    title: "905 Gunners",
    tagline: "Arsenal supporters' club",
    tint: "rgba(0,113,227,0.07)",
    accent: "#0071e3",
    detail:
      "I'm part of the 905 Gunners, the Arsenal supporters' club for the Toronto area. Match days mean early alarms, a packed pub, and singing through 90 minutes with a few hundred fellow fans. It's the best kind of community — people from every background brought together by one (often stressful) team.",
    link: { label: "About the club", url: "#" },
  },
  {
    key: "travel",
    icon: "✈️",
    title: "Travel",
    tagline: "Always planning the next trip",
    tint: "rgba(160,107,255,0.08)",
    accent: "#a06bff",
    detail:
      "There's almost always a next trip on my whiteboard. I like slow travel — renting a place for a couple of weeks, learning the neighbourhood coffee spot, and wandering without much of a plan. Recent favourites include long train journeys and anywhere with good food and worse WiFi.",
    link: null,
  },
  {
    key: "music",
    icon: "🎧",
    title: "Music",
    tagline: "Always something playing",
    tint: "rgba(255,138,92,0.09)",
    accent: "#ff8a5c",
    detail:
      "Music is the constant soundtrack to my day — deep-focus playlists while coding, something louder on the walk home. I'm always hunting for the next artist to obsess over, and I keep a running playlist of what I've had on repeat lately.",
    link: { label: "My playlist", url: "#" },
  },
];
