import { profile } from "../data/profile";
import { BrandIcon } from "./icons/BrandIcon";
import { SectionCard } from "./SectionCard";

const universityLogo = "/skill-icons/utoronto-coa.png";
const mobilePhoneImage = "/skill-icons/mobile-phone.png";

const aboutCardClass =
  "fun-item glossy-tile relative isolate flex min-h-[320px] overflow-hidden rounded-2xl border p-[18px]";
const aboutCardContentClass = "relative z-10 flex min-h-[284px] flex-col justify-end";
const aboutChipClass =
  "glossy-tile rounded-full border border-black/5 bg-white/90 px-3 py-1.5 text-[13px] leading-none";

export function AboutSection() {
  return (
    <section className="pt-0">
      <h2 className="mb-[18px] text-[30px] font-bold tracking-[-0.02em]">About me</h2>
      <SectionCard>
        <p className="mb-[22px] text-base leading-relaxed text-[#40404a]">
          {profile.aboutSummary}
        </p>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          <div className={`${aboutCardClass} bg-[#f7f2ff]`}>
            <BrandIcon
              name="dotnet"
              className="pointer-events-none absolute left-[-5px] top-[-55px] h-60 w-auto opacity-[0.25]"
            />
            <div className={aboutCardContentClass}>
              <div>
                <p className="text-[15px] leading-relaxed text-[#40404a]">
                  {profile.aboutIntro}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {profile.coreStack.map((skill) => (
                    <span key={skill} className={aboutChipClass}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`${aboutCardClass} bg-[#f4f7ff]`}>
            <img
              src={universityLogo}
              alt=""
              className="pointer-events-none absolute left-[55px] top-[-15px] object-contain opacity-[0.25]"
              loading="lazy"
            />
            <div className={aboutCardContentClass}>
              <div>
                <p className="text-[15px] leading-relaxed text-[#40404a]">
                  {profile.educationSummary}
                </p>
              </div>
            </div>
          </div>

          <div className={`${aboutCardClass} bg-[#f4fbf7]`}>
            <img
              src={mobilePhoneImage}
              alt=""
              className="pointer-events-none absolute top-[-20px] left-[-10px] h-auto w-auto scale-x-[-1] rotate-[20deg] object-contain opacity-[0.25]"
              loading="lazy"
            />
            <div className={aboutCardContentClass}>
              <div>
                <p className="text-[15px] leading-relaxed text-[#40404a]">
                  {profile.mobileExperience}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["React Native", "Expo", "TypeScript", "NativeWind"].map((skill) => (
                    <span key={skill} className={aboutChipClass}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </section>
  );
}
