import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

type BlueActionProps = {
  children: ReactNode;
  className?: string;
  iconOnly?: boolean;
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  title?: string;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const baseClass =
  "send-btn inline-flex items-center justify-center rounded-full bg-appleBlue text-white transition-colors";

const pillClass = "gap-2 px-[26px] py-[13px] text-[15px] font-semibold no-underline";

const iconClass =
  "h-10 w-10 flex-none border-0 disabled:cursor-not-allowed disabled:opacity-60";

export function BlueAction({
  children,
  className = "",
  iconOnly = false,
  href,
  target,
  rel,
  type = "button",
  title,
  ariaLabel,
  disabled,
  onClick,
}: BlueActionProps) {
  const classes = `${baseClass} ${iconOnly ? iconClass : pillClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} target={target} rel={rel} title={title} aria-label={ariaLabel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
