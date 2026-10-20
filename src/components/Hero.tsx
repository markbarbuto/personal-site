import type { ReactNode } from "react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile, socialLinks } from "../data/profile";
import { AvatarCoin } from "./AvatarCoin";

type HeroProps = {
  children: ReactNode;
};

const socialIcons = {
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
  Email: FaEnvelope,
};

export function Hero({ children }: HeroProps) {
  return (
    <section
      id="me"
      className="flex flex-col items-center px-6 pb-10 pt-[100px] text-center sm:pt-[100px]"
    >
      <div className="isolate flex max-w-full flex-col items-center">
        <AvatarCoin />
        <div className="glossy-tile relative z-0 -mt-3 w-[334px] max-w-full rounded-[28px] border bg-white px-5 pb-6 pt-7 dark:bg-[#24242c]">
          <h1 className="text-[30px] font-bold leading-[1.2] tracking-[-0.02em]">
            {profile.name}
          </h1>
          <p className="mt-[7px] text-base font-medium leading-[1.3] text-appleBlue dark:text-[#58aaff]">
            {profile.title}
          </p>
        </div>
      </div>
      <div className="mt-[22px] flex gap-3">
        {socialLinks.map((link) => {
          const Icon = socialIcons[link.label];
          return (
            <a
              key={link.label}
              href={link.href}
              className="social-btn glossy-tile flex h-11 w-11 items-center justify-center rounded-[14px] border border-black/10 bg-white text-ink shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition dark:border-white/10 dark:bg-[#1f1f27] dark:text-white dark:shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
              aria-label={link.label}
              title={link.label}
            >
              <Icon aria-hidden="true" className="h-5 w-5" />
            </a>
          );
        })}
      </div>
      {children}
    </section>
  );
}
