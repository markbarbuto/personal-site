import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
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

type PendingTripSelection = {
  tripId: string;
  updateHistory: boolean;
};

const EXIT_DURATION = 120;
const ENTER_DURATION = 190;
const HEIGHT_DURATION = 230;

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
  const activeTripIdRef = useRef(activeTripId);
  const tripShellRef = useRef<HTMLDivElement>(null);
  const tripStageRef = useRef<HTMLDivElement>(null);
  const transitionRunningRef = useRef(false);
  const queuedTripRef = useRef<PendingTripSelection | null>(null);
  const transitionAnimationsRef = useRef<Animation[]>([]);
  const isMountedRef = useRef(true);
  const transitionRunnerRef = useRef<(selection: PendingTripSelection) => void>(() => undefined);
  activeTripIdRef.current = activeTripId;
  const activeTripIndex = Math.max(
    0,
    trips.findIndex((trip) => trip.id === activeTripId),
  );
  const activeTrip = trips[activeTripIndex];

  const runTripTransition = useCallback(
    async ({ tripId, updateHistory }: PendingTripSelection) => {
      if (!tripIds.includes(tripId)) return;

      if (transitionRunningRef.current) {
        queuedTripRef.current = { tripId, updateHistory };
        return;
      }

      const currentTripId = activeTripIdRef.current;
      if (tripId === currentTripId) return;

      const commitTrip = () => {
        activeTripIdRef.current = tripId;
        flushSync(() => setActiveTripId(tripId));
        if (updateHistory) {
          window.history.pushState(null, "", getTripHash(tripId));
        }
      };

      const shell = tripShellRef.current;
      const stage = tripStageRef.current;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (
        layout !== "full" ||
        prefersReducedMotion ||
        !shell ||
        !stage ||
        typeof stage.animate !== "function"
      ) {
        commitTrip();
        return;
      }

      const currentIndex = trips.findIndex((trip) => trip.id === currentTripId);
      const nextIndex = trips.findIndex((trip) => trip.id === tripId);
      const direction = nextIndex > currentIndex ? 1 : -1;
      const exitOffset = direction * -12;
      const enterOffset = direction * 12;
      const oldHeight = shell.getBoundingClientRect().height;

      transitionRunningRef.current = true;

      try {
        const exitAnimation = stage.animate(
          [
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
            { opacity: 0, transform: `translate3d(${exitOffset}px, 0, 0)` },
          ],
          {
            duration: EXIT_DURATION,
            easing: "cubic-bezier(0.4, 0, 1, 1)",
            fill: "forwards",
          },
        );
        transitionAnimationsRef.current = [exitAnimation];
        await exitAnimation.finished;

        if (!isMountedRef.current) return;

        stage.style.opacity = "0";
        stage.style.transform = `translate3d(${enterOffset}px, 0, 0)`;
        exitAnimation.cancel();

        shell.style.height = `${oldHeight}px`;
        shell.style.overflow = "hidden";
        commitTrip();

        const newHeight = stage.getBoundingClientRect().height;
        const heightAnimation = shell.animate(
          [{ height: `${oldHeight}px` }, { height: `${newHeight}px` }],
          {
            duration: HEIGHT_DURATION,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          },
        );
        const enterAnimation = stage.animate(
          [
            { opacity: 0, transform: `translate3d(${enterOffset}px, 0, 0)` },
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
          ],
          {
            duration: ENTER_DURATION,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          },
        );
        transitionAnimationsRef.current = [heightAnimation, enterAnimation];
        await Promise.all([heightAnimation.finished, enterAnimation.finished]);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          throw error;
        }
      } finally {
        transitionAnimationsRef.current.forEach((animation) => animation.cancel());
        transitionAnimationsRef.current = [];
        stage.style.removeProperty("opacity");
        stage.style.removeProperty("transform");
        shell.style.removeProperty("height");
        shell.style.removeProperty("overflow");
        transitionRunningRef.current = false;

        if (isMountedRef.current) {
          const queuedSelection = queuedTripRef.current;
          queuedTripRef.current = null;
          if (queuedSelection && queuedSelection.tripId !== activeTripIdRef.current) {
            transitionRunnerRef.current(queuedSelection);
          }
        }
      }
    },
    [layout, tripIds, trips],
  );

  transitionRunnerRef.current = (selection) => {
    void runTripTransition(selection);
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      queuedTripRef.current = null;
      transitionAnimationsRef.current.forEach((animation) => animation.cancel());
      transitionAnimationsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (layout !== "full" || !activeTrip) return undefined;

    if (!getTripIdFromHash(tripIds)) {
      window.history.replaceState(null, "", getTripHash(activeTrip.id));
    }

    function selectTripFromHistory() {
      const hashTripId = getTripIdFromHash(tripIds);
      if (hashTripId) {
        transitionRunnerRef.current({ tripId: hashTripId, updateHistory: false });
      }
    }

    window.addEventListener("hashchange", selectTripFromHistory);
    window.addEventListener("popstate", selectTripFromHistory);
    return () => {
      window.removeEventListener("hashchange", selectTripFromHistory);
      window.removeEventListener("popstate", selectTripFromHistory);
    };
  }, [activeTrip, layout, tripIds]);

  useEffect(() => {
    if (layout !== "full") return;

    const adjacentTrips = [trips[activeTripIndex - 1], trips[activeTripIndex + 1]];
    for (const trip of adjacentTrips) {
      for (const photo of trip?.photos ?? []) {
        if (!photo.src) continue;

        const image = new Image();
        image.decoding = "async";
        image.src = photo.src;
      }
    }
  }, [activeTripIndex, layout, trips]);

  function selectTrip(tripId: string) {
    transitionRunnerRef.current({ tripId, updateHistory: true });
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
            <div ref={tripShellRef} className="travel-trip-transition-shell">
              <div ref={tripStageRef} className="travel-trip-transition-stage flow-root">
                <TravelTripCard trip={activeTrip} onOpenImage={openFocusedImage} />
              </div>
            </div>
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
