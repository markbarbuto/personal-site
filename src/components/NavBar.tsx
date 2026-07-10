import { navItems, profile, socialLinks } from "../data/profile";
import { ThemeToggle } from "./ThemeToggle";

export function NavBar() {
  const linkedInHref = socialLinks.find((link) => link.label === "LinkedIn")?.href ?? "#";

  return (
    <nav
      aria-label="Primary"
      className="fixed left-1/2 top-[18px] z-50 flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-full border border-black/5 bg-white/70 p-1.5 shadow-nav backdrop-blur-xl transition-colors hide-scrollbar dark:border-white/10 dark:bg-[#1c1c22]/75 dark:shadow-[0_10px_36px_rgba(0,0,0,0.42)]"
    >
      <a
        href={linkedInHref}
        className="mr-1 flex h-[34px] w-[34px] flex-none items-center justify-center overflow-hidden rounded-full border border-white/80 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.12)] dark:border-white/15 dark:bg-[#2a2a32] dark:shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
        aria-label="Open Mark Barbuto on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={profile.avatarUrl}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </a>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="nav-link flex-none rounded-full px-4 py-2 text-sm font-medium text-ink no-underline transition-colors dark:text-white"
        >
          {item.label}
        </a>
      ))}
      <ThemeToggle />
    </nav>
  );
}
