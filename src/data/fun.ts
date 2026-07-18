import type { FunItem } from "../types/fun";
import { gunnersFunItem } from "./fun/gunners";
import { travelFunItem } from "./fun/travel";

export const funItems: FunItem[] = [
  gunnersFunItem,
  travelFunItem,
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
