import type { CSSProperties, KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCompass,
  FaLandmark,
  FaMountainSun,
  FaUmbrellaBeach,
} from "react-icons/fa6";
import type { TravelStamp, TravelTrip } from "../../types/fun";
import { formatTravelDateRange } from "./travelDate";

type TravelPassportSelectorProps = {
  trips: TravelTrip[];
  activeTripId: string;
  onSelect: (tripId: string) => void;
};

const stampShapeClasses: Record<TravelStamp["shape"], string> = {
  arch: "rounded-t-[44%] rounded-b-[14px]",
  oval: "rounded-[50%]",
  rectangle: "rounded-[13px]",
  ticket: "travel-stamp-ticket rounded-[18px]",
};

const stampMotifs = {
  coast: FaUmbrellaBeach,
  compass: FaCompass,
  landmark: FaLandmark,
  mountains: FaMountainSun,
};

export function TravelPassportSelector({
  trips,
  activeTripId,
  onSelect,
}: TravelPassportSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    setCanScrollLeft(scroller.scrollLeft > 2);
    setCanScrollRight(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return undefined;

    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [trips.length, updateScrollState]);

  function scrollTrips(direction: -1 | 1) {
    scrollRef.current?.scrollBy({
      left: direction * Math.max(240, scrollRef.current.clientWidth * 0.72),
      behavior: "smooth",
    });
  }

  function selectTrip(tripId: string) {
    onSelect(tripId);
    const selectedButton = scrollRef.current?.querySelector<HTMLElement>(
      `[data-trip-id="${tripId}"]`,
    );
    selectedButton?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  function selectAdjacentTrip(event: KeyboardEvent<HTMLButtonElement>, tripIndex: number) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const direction = event.key === "ArrowLeft" ? -1 : 1;
    const nextIndex = (tripIndex + direction + trips.length) % trips.length;
    const nextTrip = trips[nextIndex];
    if (!nextTrip) return;

    selectTrip(nextTrip.id);
    window.requestAnimationFrame(() => {
      scrollRef.current
        ?.querySelector<HTMLButtonElement>(`[data-trip-id="${nextTrip.id}"]`)
        ?.focus();
    });
  }

  return (
    <section id="travel-passport" className="scroll-mt-8 pt-14" aria-labelledby="travel-passport-title">
      <div className="flex items-end justify-between gap-4">
        <h2 id="travel-passport-title" className="text-[30px] font-bold tracking-[-0.025em]">
          Where I&apos;ve been
        </h2>

        <div className="flex flex-none rounded-full border border-black/5 bg-white/70 p-1.5 shadow-nav backdrop-blur-xl dark:border-white/10 dark:bg-[#1c1c22]/75 dark:shadow-[0_10px_36px_rgba(0,0,0,0.42)]">
          <button
            type="button"
            className="nav-link flex h-9 w-9 items-center justify-center rounded-full text-ink transition disabled:cursor-default disabled:opacity-30 dark:text-white"
            onClick={() => scrollTrips(-1)}
            disabled={!canScrollLeft}
            aria-label="Show earlier trips"
          >
            <FaChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="nav-link flex h-9 w-9 items-center justify-center rounded-full text-ink transition disabled:cursor-default disabled:opacity-30 dark:text-white"
            onClick={() => scrollTrips(1)}
            disabled={!canScrollRight}
            aria-label="Show later trips"
          >
            <FaChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="travel-passport-fade -mx-1 mt-5">
        <div
          ref={scrollRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-7 py-3 sm:gap-4 sm:px-8"
          onScroll={updateScrollState}
          role="tablist"
          aria-label="Trips organized by date"
        >
          {trips.map((trip, tripIndex) => {
            const active = trip.id === activeTripId;
            const StampIcon = stampMotifs[trip.stamp.motif];
            const primaryDestination = trip.destinations[0];

            return (
              <button
                key={trip.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={active ? `travel-trip-${trip.id}` : undefined}
                data-trip-id={trip.id}
                data-selected={active}
                className="travel-stamp-card fun-item glossy-tile relative flex w-[154px] flex-none snap-center flex-col rounded-[20px] border p-3 text-left text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-appleBlue focus-visible:ring-offset-4 focus-visible:ring-offset-panel sm:w-[190px] sm:p-4 dark:text-white dark:focus-visible:ring-offset-[#101014]"
                style={{ "--stamp-accent": trip.stamp.accent } as CSSProperties}
                onClick={() => selectTrip(trip.id)}
                onKeyDown={(event) => selectAdjacentTrip(event, tripIndex)}
              >
                <span
                  className={`travel-stamp flex h-[104px] w-full flex-col items-center justify-center border-2 px-3 text-center sm:h-[118px] ${stampShapeClasses[trip.stamp.shape]}`}
                >
                  <span className="absolute left-2.5 top-2 text-[9px] font-bold uppercase tracking-[0.12em]">
                    {primaryDestination?.countryCode}
                  </span>
                  <StampIcon aria-hidden="true" className="h-7 w-7 sm:h-8 sm:w-8" />
                  <span className="mt-2 max-w-full truncate text-[14px] font-bold uppercase tracking-[0.08em] sm:text-[15px]">
                    {trip.title}
                  </span>
                </span>

                <span className="travel-stamp-date mt-3 block truncate text-center text-[11px] font-bold uppercase tracking-[0.1em] sm:text-xs">
                  {formatTravelDateRange(trip.dateRange)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
