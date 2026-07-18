import { useEffect, useMemo, useState } from "react";
import type { TravelFunItem } from "../../types/fun";
import { ImageFocusOverlay } from "../ImageFocus";
import { useImageFocus } from "../useImageFocus";
import { FunFeatureDetailLayout, FunFeaturePreview } from "./FunFeatureLayouts";
import { TravelPassportSelector } from "./TravelPassportSelector";
import { TravelTripCard } from "./TravelTripCard";

type TravelContentProps = {
  item: TravelFunItem;
  layout: "inline" | "full";
  onReadMore?: () => void;
};

function getTripHash(tripId: string) {
  return `#travel-${tripId}`;
}

function getTripIdFromHash(tripIds: string[]) {
  const hashTripId = window.location.hash.replace(/^#travel-/, "");
  return tripIds.includes(hashTripId) ? hashTripId : null;
}

export function TravelContent({ item, layout, onReadMore }: TravelContentProps) {
  const {
    focusedImage,
    isFocusedImageClosing,
    openFocusedImage,
    closeFocusedImageWithAnimation,
  } = useImageFocus();
  const { feature } = item;
  const trips = useMemo(
    () => [...feature.trips].sort((first, second) => first.dateRange.start.localeCompare(second.dateRange.start)),
    [feature.trips],
  );
  const tripIds = useMemo(() => trips.map((trip) => trip.id), [trips]);
  const [activeTripId, setActiveTripId] = useState(
    () => getTripIdFromHash(tripIds) ?? tripIds[0] ?? "",
  );
  const activeTripIndex = Math.max(
    0,
    trips.findIndex((trip) => trip.id === activeTripId),
  );
  const activeTrip = trips[activeTripIndex];

  useEffect(() => {
    if (layout !== "full" || !activeTrip) return undefined;

    if (!getTripIdFromHash(tripIds)) {
      window.history.replaceState(null, "", getTripHash(activeTrip.id));
    }

    function selectTripFromHistory() {
      const hashTripId = getTripIdFromHash(tripIds);
      if (hashTripId) setActiveTripId(hashTripId);
    }

    window.addEventListener("hashchange", selectTripFromHistory);
    window.addEventListener("popstate", selectTripFromHistory);
    return () => {
      window.removeEventListener("hashchange", selectTripFromHistory);
      window.removeEventListener("popstate", selectTripFromHistory);
    };
  }, [activeTrip, layout, tripIds]);

  function selectTrip(tripId: string) {
    if (tripId === activeTripId) return;
    setActiveTripId(tripId);
    window.history.pushState(null, "", getTripHash(tripId));
  }

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
        actions={item.actions}
        headerImage={feature.headerImage}
        onOpenImage={openFocusedImage}
      >
        <p className="mt-8 max-w-[760px] text-[18px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
          {feature.intro}
        </p>

        {activeTrip && (
          <>
            <TravelPassportSelector
              trips={trips}
              activeTripId={activeTrip.id}
              onSelect={selectTrip}
            />
            <TravelTripCard
              key={activeTrip.id}
              trip={activeTrip}
              onOpenImage={openFocusedImage}
            />
          </>
        )}
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
