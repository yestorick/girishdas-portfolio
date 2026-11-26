import { SiteProfile, RightNow } from '@/lib/types';
import { ArrowRight, Compass, FolderKanban } from 'lucide-react';

interface HeroProps {
  profile: SiteProfile;
  rightNow: RightNow;
}

export default function Hero({ profile, rightNow }: HeroProps) {
  const currentProjectsText = rightNow.current_projects || rightNow.reading || '';
  const highlight = profile.headline_highlight?.trim();
  const fullHeadline = highlight
    ? `${profile.headline_intro.trim()} ${highlight.replace(/\.$/, '')}.`
    : profile.headline_intro;

  return (
    <section id="now" className="scroll-mt-24 py-10 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Clean Professional Intro Headline */}
        <div className="md:col-span-7 space-y-5 min-w-0">
          <h1 className="text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.22] font-display">
            {fullHeadline}
          </h1>

          {/* Bio Paragraph */}
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-xl">
            {profile.bio}
          </p>

          {/* Personal & Professional CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#contact"
              className="neo-btn inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] text-white px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              <span>{profile.hero_primary_cta || 'Contact me'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href="#work"
              className="neo-btn inline-flex items-center gap-2 bg-white hover:bg-[#F5F2EB] text-[#1C1917] px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              <FolderKanban className="w-4 h-4" aria-hidden="true" />
              <span>{profile.hero_secondary_cta || 'My project & works'}</span>
            </a>
          </div>
        </div>

        {/* Right Column: "Right now" Card */}
        <div className="md:col-span-5 min-w-0">
          <div className="neo-card-static bg-[#F7ECE6] rounded-2xl p-6 text-[#1C1917]">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#1C1917]/15">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#292524] flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
              </div>
              <h2 className="font-bold text-sm tracking-wide uppercase font-display text-[#1C1917]">
                {rightNow.card_title || 'Right now'}
              </h2>
            </div>

            <dl className="space-y-3 text-xs sm:text-sm">
              <div>
                <dt className="font-bold text-[#1C1917] inline">Building: </dt>
                <dd className="text-[#44403C] inline">
                  <span className="font-semibold text-[#1C1917]">
                    {rightNow.building_title}
                  </span>
                  {rightNow.building_desc ? ` — ${rightNow.building_desc}` : ''}
                </dd>
              </div>

              <div>
                <dt className="font-bold text-[#1C1917] inline">Learning: </dt>
                <dd className="text-[#44403C] inline">{rightNow.learning}</dd>
              </div>

              <div>
                <dt className="font-bold text-[#1C1917] inline">
                  Current projects:{' '}
                </dt>
                <dd className="text-[#44403C] inline">{currentProjectsText}</dd>
              </div>

              <div>
                <dt className="font-bold text-[#1C1917] inline">Based in: </dt>
                <dd className="text-[#44403C] inline">{rightNow.based_in}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
