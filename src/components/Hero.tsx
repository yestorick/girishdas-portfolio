import Link from 'next/link';
import { SiteProfile, RightNow } from '@/lib/types';
import { ArrowRight, Compass, FileText } from 'lucide-react';

interface HeroProps {
  profile: SiteProfile;
  rightNow: RightNow;
}

export default function Hero({ profile, rightNow }: HeroProps) {
  const hasExternalResume = Boolean(profile.resume_url && profile.resume_url !== '#');

  return (
    <section id="now" className="scroll-mt-24 py-10 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Avatar + Availability + Intro Headline */}
        <div className="md:col-span-7 space-y-5 min-w-0">
          {/* Matched Circular Photo Lockup on Left Side of "Open to opportunities" */}
          <div className="inline-flex items-center gap-2.5 flex-wrap">
            <div className="w-11 h-11 rounded-full border-[1.5px] border-[#292524] bg-[#F5F2EB] overflow-hidden shrink-0 flex items-center justify-center shadow-[1.5px_1.5px_0px_#292524]">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-display font-bold text-sm text-[#1C1917] tracking-tight">
                  GD
                </span>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E4F1E7] border-[1.5px] border-[#292524] text-[#1E5631]">
                <span
                  className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"
                  aria-hidden="true"
                />
                <span>{profile.status_badge || 'Open to opportunities'}</span>
              </span>
            </div>
          </div>

          {/* Balanced Hero H1 with Smooth Multi-Line Marker Highlight (Zero Overlap) */}
          <h1 className="text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold tracking-[-0.025em] text-[#1C1917] leading-[1.32] font-display">
            {profile.headline_intro}{' '}
            <span className="headline-highlight">
              {profile.headline_highlight}
            </span><span className="-ml-0.5">.</span>
          </h1>

          {/* One concise calm intro paragraph */}
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-xl">
            {profile.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#contact"
              className="neo-btn inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] text-white px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              <span>Say hello</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            {hasExternalResume ? (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-2 bg-white hover:bg-[#F5F2EB] text-[#1C1917] px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>Download résumé</span>
              </a>
            ) : (
              <Link
                href="/resume"
                className="neo-btn inline-flex items-center gap-2 bg-white hover:bg-[#F5F2EB] text-[#1C1917] px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>Download résumé</span>
              </Link>
            )}
          </div>
        </div>

        {/* Right Column: Soft Blush-Sand "Right now" Card */}
        <div className="md:col-span-5 min-w-0">
          <div className="neo-card-static bg-[#F7ECE6] rounded-2xl p-6 text-[#1C1917]">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#1C1917]/15">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#292524] flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
              </div>
              <h2 className="font-bold text-sm tracking-wide uppercase font-display text-[#1C1917]">
                Right now
              </h2>
            </div>

            <dl className="space-y-3 text-xs sm:text-sm">
              <div>
                <dt className="font-bold text-[#1C1917] inline">Building: </dt>
                <dd className="text-[#44403C] inline">
                  <span className="font-semibold text-[#1C1917]">{rightNow.building_title}</span>
                  {rightNow.building_desc ? ` — ${rightNow.building_desc}` : ''}
                </dd>
              </div>

              <div>
                <dt className="font-bold text-[#1C1917] inline">Learning: </dt>
                <dd className="text-[#44403C] inline">{rightNow.learning}</dd>
              </div>

              <div>
                <dt className="font-bold text-[#1C1917] inline">Reading: </dt>
                <dd className="text-[#44403C] inline italic">{rightNow.reading}</dd>
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
