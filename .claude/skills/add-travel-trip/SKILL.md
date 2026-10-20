---
name: add-travel-trip
description: Add a trip or destination to this portfolio's Fun / Travel log using supplied photos and trip highlights. Generate its passport stamp, trip card description, and photo carousel through the existing travel data and components.
---

# Add a travel trip

Update this repository's Fun > Travel section from the user's photos and highlights, matching existing trips.

## Inputs

Expect photos (attachments or local files), highlights and personal impressions, destination countries, cities visited, and travel dates at the precision the user knows. Use information already supplied; ask for missing photos or essential destination/date details. Do not invent dates, cities, personal experiences, or uncertain landmark identifications. Choose a suitable stamp treatment without requiring design input. Honour a requested photo order; otherwise arrange a coherent sequence around the highlights.

## Read the current implementation

Resolve paths from the repository root; current code is authoritative:

- `src/data/fun/travel.ts`: `travelFunItem.feature.trips`, existing descriptions, and photo metadata.
- `src/types/fun.ts`: `TravelTrip`, `TravelPhoto`, `TravelDateRange`, `TravelDestination`, and `TravelStamp`.
- `src/components/fun/TravelPassportSelector.tsx`: stamp shape classes, icon mappings, selection, and keyboard behaviour.
- `src/components/fun/TravelTripCard.tsx`: title, date badge, country badges, summary, city chips, and shared gallery.
- `src/components/fun/FunImageGallery.tsx`: mobile snap carousel and desktop gallery layout.
- `src/components/fun/TravelContent.tsx` and `travelDate.ts`: chronological sorting, hash navigation, transitions, and date formatting.
- `src/index.css`: existing `travel-*` styling in both themes.

## Build the entry

1. Inspect supplied photos before choosing filenames, alt text, orientation, or crops. Copy usable web images into `public/fun-assets/travel/<trip-id>/` with descriptive lowercase hyphenated filenames. Follow existing image conventions and supported browser formats; avoid overwriting assets. If conversion or resizing is needed, use available local image tooling while preserving the scene and useful detail.
2. Add one `TravelTrip` to `travelFunItem.feature.trips` following the existing object structure. Use a unique stable ID such as `japan-2026`, disambiguating repeat trips as needed. Keep source entries chronological for readability; the UI also sorts by `dateRange.start`. Preserve existing IDs because they are used in `#travel-<trip-id>` links.
3. Populate `title`, `dateRange`, `destinations`, `cities`, `summary`, `stamp`, and `photos`. Use sortable date strings (`YYYY`, `YYYY-MM`, or `YYYY-MM-DD`) at the supplied precision; add an end only when known. Use `labelOverride` when needed for an accurate natural label, including a single-month trip with identical start and end. Use uppercase two-letter country codes. The first destination supplies the stamp's country code; all destinations appear as trip card badges.
4. Write a concise personal first-person `summary` from the highlights, matching the conversational tone, approximate length, and Canadian spelling of existing entries. Preserve specific memories and personality rather than adding generic tourism copy.
5. Configure `stamp.accent`, `stamp.shape`, and `stamp.motif` to suit the destination and neighbouring stamps. Current shapes are `arch`, `oval`, `rectangle`, and `ticket`; motifs are `coast`, `compass`, `landmark`, and `mountains`. Recheck the current type and mappings before use. These fields generate the passport stamp button; a separate stamp image is unnecessary. Prefer an existing motif. If the requested design needs a new motif, extend the type and icon mapping together using the existing icon library and styling.
6. Give each photo a unique descriptive `id`, root-relative `src` (`/fun-assets/travel/<trip-id>/<filename>`), accurate `alt`, and appropriate `objectPosition`. Set `orientation: "portrait"` where appropriate; consult the current `FocusImage` type for other supported values. Every added photo needs a real `src`: the trip card filters out entries without one. Avoid duplicate `src` values because the gallery uses them as React keys.

The data entry should render the stamp and trip card automatically. Reuse `TravelPassportSelector`, `TravelTripCard`, `SectionImageGallery`, and the image focus overlay. Preserve dimensions, typography, chips, borders, shadows, spacing, transitions, accessibility, and theme styles. Keep the shared travel introduction and header imagery unless asked to update them. Change components or CSS only when needed for the requested trip rather than introducing a parallel layout.

## Verify and deliver

- Confirm unique trip IDs, valid date order, accurate metadata, and that new image paths resolve under `public/` with matching filename case.
- Run existing build and lint scripts (`npm.cmd run build` and `npm.cmd run lint` on Windows). Distinguish pre-existing failures from new issues.
- When browser preview is available, inspect Fun > Travel on desktop and mobile in light and dark themes. Check stamp title/date fit, selection of the correct card, `#travel-<trip-id>` navigation, country and city badges, carousel scrolling, image overlay, and photo crops. Preserve keyboard selection and focus behaviour. Report visual checks that could not be performed.
- Summarize the added trip, asset location, stamp choice, and validation. Implement the local site update; commit, push, or deploy only when requested.
