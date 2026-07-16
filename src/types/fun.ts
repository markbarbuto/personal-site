import type { FocusImage } from "./content";

export type FunLink = {
  label: string;
  url: string;
};

export type FunFeatureChip = {
  label: string;
  value?: string;
};

export type FunFeatureCard = {
  id: "team" | "values" | "tournament";
  title: string;
  body: string;
  chips: FunFeatureChip[];
  backgroundImage: FocusImage;
};

export type FunFeatureSection = {
  id: string;
  title: string;
  body: string;
  images: FocusImage[];
};

export type GunnersFeature = {
  type: "905-gunners";
  previewImage: FocusImage;
  headerImage: FocusImage;
  cards: FunFeatureCard[];
  sections: FunFeatureSection[];
};

type FunItemBase = {
  key: string;
  icon?: string;
  decoration?: FocusImage;
  title: string;
  tint: string;
  accent: string;
  detail: string;
};

export type BasicFunItem = FunItemBase & {
  feature?: undefined;
};

export type GunnersFunItem = FunItemBase & {
  tagline: string;
  link: FunLink;
  feature: GunnersFeature;
};

export type FunItem = BasicFunItem | GunnersFunItem;
