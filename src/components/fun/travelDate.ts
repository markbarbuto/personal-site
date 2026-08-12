import type { TravelDateRange } from "../../types/fun";

function parseDateParts(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return { year, month, day };
}

function monthName(month: number, style: "long" | "short" = "long") {
  return new Intl.DateTimeFormat("en-CA", { month: style, timeZone: "UTC" }).format(
    new Date(Date.UTC(2024, month - 1, 1)),
  );
}

export function getTravelYear(dateRange: TravelDateRange) {
  return String(parseDateParts(dateRange.start).year);
}

export function formatTravelDateRange(dateRange: TravelDateRange) {
  if (dateRange.labelOverride) return dateRange.labelOverride;

  const start = parseDateParts(dateRange.start);
  if (!dateRange.end) {
    if (!start.month) return String(start.year);
    if (!start.day) return `${monthName(start.month)} ${start.year}`;
    return `${monthName(start.month)} ${start.day}, ${start.year}`;
  }

  const end = parseDateParts(dateRange.end);
  if (start.year === end.year && start.month === end.month && start.day && end.day) {
    return `${monthName(start.month)} ${start.day}–${end.day}, ${start.year}`;
  }

  const startLabel = start.month
    ? `${monthName(start.month, "short")}${start.day ? ` ${start.day}` : ""}`
    : String(start.year);
  const endLabel = end.month
    ? `${monthName(end.month, "short")}${end.day ? ` ${end.day}` : ""}, ${end.year}`
    : String(end.year);

  return `${startLabel}–${endLabel}`;
}
