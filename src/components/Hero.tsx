import type { ReactNode } from "react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile, socialLinks } from "../data/profile";

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
      <div className="flex h-[116px] w-[116px] items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-white shadow-[0_12px_30px_rgba(0,0,0,0.16)]">
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="mt-6 text-[17px] font-medium text-muted">Hey, I'm</div>
      <h1 className="mt-1 text-[clamp(36px,5vw,52px)] font-bold leading-none tracking-[-0.03em]">
        {profile.name}
      </h1>
      <div className="mt-2.5 text-[21px] font-medium text-appleBlue">{profile.title}</div>
      <div className="mt-[22px] flex gap-3">
        {socialLinks.map((link) => {
          const Icon = socialIcons[link.label];
          return (
            <a
              key={link.label}
              href={link.href}
              className="social-btn glossy-tile flex h-11 w-11 items-center justify-center rounded-[14px] border border-black/10 bg-white text-ink shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition"
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
