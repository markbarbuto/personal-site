import type { FunItem, GunnersFunItem, TravelFunItem } from "../types/fun";
import { GunnersContent } from "./fun/GunnersContent";
import { FunFeaturePreview } from "./fun/FunFeatureLayouts";
import { TravelContent } from "./fun/TravelContent";

type FunInterestContentProps = {
  item: FunItem;
  layout: "inline" | "full";
  onReadMore?: () => void;
};

function isGunnersItem(item: FunItem): item is GunnersFunItem {
  return item.feature?.type === "905-gunners";
}

function isTravelItem(item: FunItem): item is TravelFunItem {
  return item.feature?.type === "travel";
}

export function FunInterestContent({ item, layout, onReadMore }: FunInterestContentProps) {
  if (isGunnersItem(item)) {
    return <GunnersContent item={item} layout={layout} onReadMore={onReadMore} />;
  }

  if (isTravelItem(item)) {
    return <TravelContent item={item} layout={layout} onReadMore={onReadMore} />;
  }

  if (layout === "inline") {
    return (
      <FunFeaturePreview
        title={item.title}
        preview={item.preview}
        onReadMore={onReadMore}
      />
    );
  }

  return (
    <div className="mx-auto max-w-[760px] pt-12">
      <h1 className="text-[clamp(38px,6vw,58px)] font-bold leading-none tracking-[-0.03em]">
        {item.title}
      </h1>
      <p
        className="mt-5 text-[19px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]"
      >
        {item.preview}
      </p>
    </div>
  );
}
