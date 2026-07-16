import type { FunFeatureCard, GunnersFunItem } from "../../types/fun";
import { CompactGlossyChip, FeatureCard, FeatureCardCopy } from "../FeatureCard";
import { ImageFocusOverlay } from "../ImageFocus";
import { useImageFocus } from "../useImageFocus";
import { FunFeatureDetailLayout, FunFeaturePreview } from "./FunFeatureLayouts";
import { SectionImageGallery } from "./FunImageGallery";

type Gunners905ContentProps = {
  item: GunnersFunItem;
  layout: "inline" | "full";
  onReadMore?: () => void;
};

const cardStyles: Record<FunFeatureCard["id"], { card: string; image: string }> = {
  team: {
    card: "bg-[#f1ebff] dark:bg-[#211a33]",
    image:
      "-right-12 top-1/2 h-[240px] w-[240px] -translate-y-1/2 opacity-[0.10] dark:opacity-[0.12]",
  },
  values: {
    card: "bg-[#f4f7ff] dark:bg-[#1b2335]",
    image:
      "-right-16 top-1/2 h-[260px] w-[260px] -translate-y-1/2 opacity-[0.10] dark:opacity-[0.08]",
  },
  tournament: {
    card: "bg-[#f4fbf7] dark:bg-[#1a2a23]",
    image:
      "-right-5 top-1/2 h-[230px] w-[170px] -translate-y-1/2 opacity-[0.12] dark:opacity-[0.10]",
  },
};

export function Gunners905Content({ item, layout, onReadMore }: Gunners905ContentProps) {
  const {
    focusedImage,
    isFocusedImageClosing,
    openFocusedImage,
    closeFocusedImageWithAnimation,
  } = useImageFocus();
  const { feature } = item;

  if (layout === "inline") {
    return (
      <>
        <FunFeaturePreview
          title={item.title}
          detail={item.detail}
          image={feature.previewImage}
          onOpenImage={openFocusedImage}
          onReadMore={onReadMore}
        />
        {focusedImage && (
          <ImageFocusOverlay
            image={focusedImage}
            isClosing={isFocusedImageClosing}
            onClose={closeFocusedImageWithAnimation}
          />
        )}
      </>
    );
  }

  return (
    <>
      <FunFeatureDetailLayout
        title={item.title}
        tagline={item.tagline}
        link={item.link}
        headerImage={feature.headerImage}
        onOpenImage={openFocusedImage}
      >
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {feature.cards.map((card) => {
            const styles = cardStyles[card.id];

            return (
              <FeatureCard
                key={card.id}
                className={`min-h-[160px] flex-col justify-end ${styles.card}`}
              >
                <img
                  src={card.backgroundImage.src}
                  alt={card.backgroundImage.alt}
                  className={`pointer-events-none absolute max-w-none object-contain ${styles.image}`}
                  loading="lazy"
                />
                <FeatureCardCopy title={card.title}>
                  <p>{card.body}</p>
                </FeatureCardCopy>
                <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                  {card.chips.map((chip) => (
                    <CompactGlossyChip key={`${chip.value ?? ""}-${chip.label}`}>
                      {chip.value && <strong>{chip.value}</strong>}
                      {chip.value && <>&nbsp; </>}
                      {chip.label}
                    </CompactGlossyChip>
                  ))}
                </div>
              </FeatureCard>
            );
          })}
        </div>

        {feature.sections.map((section, index) => (
          <section key={section.id} className={index === 0 ? "mt-14" : "mt-16"}>
            <h2 className="text-[28px] font-bold tracking-[-0.025em]">{section.title}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
              {section.body}
            </p>
            <SectionImageGallery images={section.images} onOpen={openFocusedImage} />
          </section>
        ))}
      </FunFeatureDetailLayout>

      {focusedImage && (
        <ImageFocusOverlay
          image={focusedImage}
          isClosing={isFocusedImageClosing}
          onClose={closeFocusedImageWithAnimation}
        />
      )}
    </>
  );
}
