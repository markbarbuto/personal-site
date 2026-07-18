import type { FocusImage } from "../../types/content";
import type { TravelPhoto, TravelTrip } from "../../types/fun";
import { CompactGlossyChip } from "../FeatureCard";
import { SectionImageGallery } from "./FunImageGallery";
import { formatTravelDateRange } from "./travelDate";

type TravelTripCardProps = {
  trip: TravelTrip;
  onOpenImage: (image: FocusImage) => void;
};

function getPhotoImage(photo: TravelPhoto): FocusImage | null {
  if (!photo.src) return null;

  return {
    src: photo.src,
    alt: photo.alt,
    objectPosition: photo.objectPosition,
  };
}

export function TravelTripCard({
  trip,
  onOpenImage,
}: TravelTripCardProps) {
  const galleryImages = trip.photos
    .map(getPhotoImage)
    .filter((image): image is FocusImage => image !== null);

  return (
    <article
      id={`travel-trip-${trip.id}`}
      role="tabpanel"
      className="travel-trip-swap mt-7 overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-soft dark:border-white/10 dark:bg-[#19191f] dark:shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
    >
      <div className="p-5 sm:p-7">
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <h3 className="text-[30px] font-bold leading-tight tracking-[-0.025em]">{trip.title}</h3>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="inline-flex min-h-9 items-center rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-ink dark:border-white/10 dark:bg-[#23232b] dark:text-[#f5f5f7]">
              {formatTravelDateRange(trip.dateRange)}
            </span>
            {trip.destinations.map((destination) => (
              <span
                key={`${trip.id}-${destination.countryCode}`}
                className="inline-flex h-8 items-center rounded-md border px-2.5 text-[11px] font-bold tracking-[0.12em]"
                style={{ borderColor: trip.stamp.accent, color: trip.stamp.accent }}
              >
                {destination.countryCode}
              </span>
            ))}
          </div>
        </header>

        <p className="mt-5 text-[16px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
          {trip.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Cities visited">
          {trip.cities.map((city) => (
            <CompactGlossyChip key={city}>{city}</CompactGlossyChip>
          ))}
        </div>
      </div>

      {galleryImages.length > 0 && (
        <div className="px-4 pb-4 sm:px-5 sm:pb-5 dark:bg-[#19191f]">
          <SectionImageGallery images={galleryImages} onOpen={onOpenImage} />
        </div>
      )}
    </article>
  );
}
