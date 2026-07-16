import type { FunItem, GunnersFunItem } from "../types/fun";
import { Gunners905Content } from "./fun/Gunners905Content";
import { ReadMoreButton } from "./fun/ReadMoreButton";

type FunInterestContentProps = {
  item: FunItem;
  layout: "inline" | "full";
  onReadMore?: () => void;
};

function isGunnersItem(item: FunItem): item is GunnersFunItem {
  return item.feature?.type === "905-gunners";
}

export function FunInterestContent({ item, layout, onReadMore }: FunInterestContentProps) {
  if (isGunnersItem(item)) {
    return <Gunners905Content item={item} layout={layout} onReadMore={onReadMore} />;
  }

  return (
    <div className={layout === "full" ? "mx-auto max-w-[760px] pt-12" : ""}>
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
        {item.detail}
      </p>
      {layout === "inline" && onReadMore && <ReadMoreButton onClick={onReadMore} />}
    </div>
  );
}
