import type { FunItem, GunnersFunItem, TravelFunItem } from "../types/fun";
import { GunnersContent } from "./fun/GunnersContent";
import { ReadMoreButton } from "./fun/ReadMoreButton";
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

  return (
    <div
      className={
        layout === "full" ? "mx-auto max-w-[760px] pt-12" : "flex h-full flex-col"
      }
    >
      {layout === "full" ? (
        <h1 className="text-[clamp(38px,6vw,58px)] font-bold leading-none tracking-[-0.03em]">
          {item.title}
        </h1>
      ) : (
        <h3 className="text-[17px] font-bold">{item.title}</h3>
      )}
      <p
        className={`leading-relaxed text-[#40404a] dark:text-[#c7c7d1] ${
          layout === "full" ? "mt-5 text-[19px]" : "mt-2.5 text-[15px]"
        }`}
      >
        {item.preview}
      </p>
      {layout === "inline" && onReadMore && (
        <div className="mt-auto pt-5">
          <ReadMoreButton className="mt-0" onClick={onReadMore} />
        </div>
      )}
    </div>
  );
}
