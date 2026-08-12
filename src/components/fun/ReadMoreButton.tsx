import { FaArrowRight } from "react-icons/fa6";

type ReadMoreButtonProps = {
  className?: string;
  onClick: () => void;
};

export function ReadMoreButton({ className = "mt-5", onClick }: ReadMoreButtonProps) {
  return (
    <button
      type="button"
      className={`fun-item glossy-tile inline-flex items-center gap-2 rounded-full border bg-panel px-4 py-2.5 text-sm font-semibold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-appleBlue focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:bg-[#23232b] dark:text-white dark:focus-visible:ring-offset-[#19191f] ${className}`}
      onClick={onClick}
    >
      Read more
      <FaArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
    </button>
  );
}
