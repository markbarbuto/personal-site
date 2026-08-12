import type { FunItem } from "../../types/fun";
import { gunnersFunItem } from "./gunners";
import { musicFunItem } from "./music";
import { travelFunItem } from "./travel";

export { gunnersFunItem, musicFunItem, travelFunItem };

export const funItems: FunItem[] = [
  gunnersFunItem,
  travelFunItem,
  musicFunItem,
];
