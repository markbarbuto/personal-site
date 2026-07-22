import type { FocusImage } from "./content";

export type FunLink = {
  label: string;
  url: string;
  preserveHash?: boolean;
};

export type FunCardImage = FocusImage & {
  mode?: "contain" | "cover" | "cutout";
  opacity?: number;
};

export type FunFeatureMedia = {
  previewImage: FocusImage;
  headerImage: FocusImage;
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

export type GunnersFeature = FunFeatureMedia & {
  type: "905-gunners";
  cards: FunFeatureCard[];
  sections: FunFeatureSection[];
};

export type TravelPhoto = {
  id: string;
  alt: string;
  src?: string;
  objectPosition?: string;
  orientation?: FocusImage["orientation"];
};

export type TravelDateRange = {
  start: string;
  end?: string;
  labelOverride?: string;
};

export type TravelDestination = {
  country: string;
  countryCode: string;
};

export type TravelStamp = {
  accent: string;
  shape: "arch" | "oval" | "rectangle" | "ticket";
  motif: "coast" | "compass" | "landmark" | "mountains";
};

export type TravelTrip = {
  id: string;
  title: string;
  dateRange: TravelDateRange;
  destinations: TravelDestination[];
  cities: string[];
  summary: string;
  photos: TravelPhoto[];
  stamp: TravelStamp;
};

export type TravelFeature = FunFeatureMedia & {
  type: "travel";
  intro: string;
  trips: TravelTrip[];
};

type FunItemBase = {
  key: string;
  icon?: string;
  decoration?: FunCardImage;
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
  actions: FunLink[];
  feature: GunnersFeature;
};

export type TravelFunItem = FunItemBase & {
  tagline: string;
  actions: FunLink[];
  feature: TravelFeature;
};

export type FunItem = BasicFunItem | GunnersFunItem | TravelFunItem;
