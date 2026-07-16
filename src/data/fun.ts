import type { FunItem } from "../types/fun";
import { gunnersFunItem } from "./fun/gunners";

export const funItems: FunItem[] = [
  gunnersFunItem,
  {
    key: "travel",
    icon: "✈️",
    title: "Travel",
    tint: "rgba(160,107,255,0.08)",
    accent: "#a06bff",
    detail:
      "There's almost always a next trip on my whiteboard. I like slow travel—renting a place for a couple of weeks, learning the neighbourhood coffee spot, and wandering without much of a plan. Recent favourites include long train journeys and anywhere with good food and worse WiFi.",
  },
  {
    key: "music",
    icon: "🎧",
    title: "Music",
    tint: "rgba(255,138,92,0.09)",
    accent: "#ff8a5c",
    detail:
      "Music is the constant soundtrack to my day—deep-focus playlists while coding, something louder on the walk home. I'm always hunting for the next artist to obsess over, and I keep a running playlist of what I've had on repeat lately.",
  },
];
