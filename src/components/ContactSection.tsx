import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile, socialLinks } from "../data/profile";
import { BlueAction } from "./BlueAction";

export function ContactSection() {
  const linkedIn = socialLinks.find((link) => link.label === "LinkedIn")?.href ?? "#";
  const github = socialLinks.find((link) => link.label === "GitHub")?.href ?? "#";

  return (
    <section id="contact" className="pt-[52px]">
      <div className="rounded-[22px] bg-ink p-[30px] text-center shadow-soft dark:bg-[#19191f] dark:shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
        <h2 className="text-[30px] font-bold tracking-[-0.02em] text-white">Get in touch</h2>
        <p className="mx-auto mt-2.5 max-w-[460px] text-base text-white/65">{profile.contactIntro}</p>
        <BlueAction
          href={`mailto:${profile.email}`}
          className="mt-6"
        >
          <FaEnvelope aria-hidden="true" className="h-4 w-4" />
          {profile.email}
        </BlueAction>
        <div className="mt-[22px] flex justify-center gap-3">
          <a
            href={linkedIn}
            title="LinkedIn"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn glossy-tile contact-social-btn flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-white/10 text-white no-underline transition"
          >
            <FaLinkedinIn aria-hidden="true" className="h-[18px] w-[18px]" />
          </a>
          <a
            href={github}
            title="GitHub"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn glossy-tile contact-social-btn flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-white/10 text-white no-underline transition"
          >
            <FaGithub aria-hidden="true" className="h-[19px] w-[19px]" />
          </a>
        </div>
        <div className="mt-[30px] text-[12.5px] text-white/40">{profile.copyright}</div>
      </div>
    </section>
  );
}
