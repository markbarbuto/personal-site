import { profile } from "../data/profile";
import { CompactGlossyChip, FeatureCard } from "./FeatureCard";
import { SectionCard } from "./SectionCard";

const aboutCardContentClass = "relative z-10 flex min-h-[284px] flex-col justify-end";

export function AboutSection() {
  return (
    <section className="pt-0">
      <h2 className="mb-[18px] text-[30px] font-bold tracking-[-0.02em]">About me</h2>
      <SectionCard>
        <p className="mb-[22px] text-base leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
          {profile.aboutSummary}
        </p>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          <FeatureCard className="min-h-[320px] bg-[#dcd5f6] dark:bg-[#2a1e55]">
            <img
              src="/about-assets/dotnet-3d-faded.png"
              alt=""
              className="pointer-events-none absolute left-1/2 top-0 h-auto w-[258px] max-w-none -translate-x-1/2 object-contain opacity-[0.25]"
              width={1254}
              height={1254}
              loading="lazy"
            />
            <div className={aboutCardContentClass}>
              <div>
                <p className="text-[15px] leading-relaxed text-[#40404a] dark:text-[#d7d7df]">
                  {profile.aboutIntro}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {profile.coreStack.map((skill) => (
                    <CompactGlossyChip key={skill}>{skill}</CompactGlossyChip>
                  ))}
                </div>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard className="min-h-[320px] bg-[#e6ecfb] dark:bg-[#1c2743]">
            <img
              src="/about-assets/utoronto-coa.png"
              alt=""
              className="pointer-events-none absolute top-5 left-1/2 h-[270px] w-auto -translate-x-1/2 object-contain opacity-[0.25]"
              width={1068}
              height={1472}
              loading="lazy"
            />
            <div className={aboutCardContentClass}>
              <div>
                <p className="text-[15px] leading-relaxed text-[#40404a] dark:text-[#d7d7df]">
                  {profile.educationSummary}
                </p>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard className="min-h-[320px] bg-[#e5f4eb] dark:bg-[#1a3327]">
            <img
              src="/about-assets/mobile-phone.png"
              alt=""
              className="pointer-events-none absolute top-5 left-1/2 h-[270px] w-auto -translate-x-1/2 object-contain opacity-[0.25]"
              width={589}
              height={864}
              loading="lazy"
            />
            <div className={aboutCardContentClass}>
              <div>
                <p className="text-[15px] leading-relaxed text-[#40404a] dark:text-[#d7d7df]">
                  {profile.mobileExperience}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["React Native", "Expo", "TypeScript", "NativeWind"].map((skill) => (
                    <CompactGlossyChip key={skill}>{skill}</CompactGlossyChip>
                  ))}
                </div>
              </div>
            </div>
          </FeatureCard>
        </div>
      </SectionCard>
    </section>
  );
}
