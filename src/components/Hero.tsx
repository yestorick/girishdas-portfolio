import { SiteProfile, RightNow } from '@/lib/types';
import { ArrowRight, Compass, FileText, Mail, Sparkles } from 'lucide-react';

interface HeroProps {
  profile: SiteProfile;
  rightNow: RightNow;
}

export default function Hero({ profile, rightNow }: HeroProps) {
  return (
    <section id="now" className="py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Intro & Headline */}
        <div className="lg:col-span-7 space-y-6">
          {/* Avatar Photo + Status Badge Container (Integrated Circular Shape) */}
          <div className="flex items-center gap-3.5 flex-wrap">
            {/* Circular Photo Frame on the Left */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-black shadow-brutal bg-[#FDE68A] overflow-hidden flex items-center justify-center">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FDE68A] to-[#FFC4B0] text-black font-extrabold text-lg sm:text-xl font-display tracking-tight">
                    <span>GD</span>
                  </div>
                )}
              </div>
              {/* Online pulsing dot badge on circle corner */}
              <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black shadow-brutal-sm" />
            </div>

            {/* Status Pill Badge directly attached to right of circle */}
            <div className="space-y-1">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#BBF7D0] border-2 border-black shadow-brutal-sm text-black">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                {profile.status_badge || 'Open to opportunities'}
              </span>
              <p className="text-[11px] font-bold text-slate-600 tracking-wide uppercase pl-1">
                Performance & Digital Marketer
              </p>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black leading-tight sm:leading-snug">
            {profile.headline_intro}{' '}
            <span className="inline-block my-1 sm:my-0">
              <span className="bg-[#FDE68A] px-3 py-1 border-2 border-black rounded-lg shadow-brutal-sm">
                {profile.headline_highlight}
              </span>
            </span>
            .
          </h1>

          {/* Bio sentence */}
          <p className="text-base sm:text-lg text-[#333336] leading-relaxed max-w-xl">
            {profile.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#contact"
              className="neo-btn inline-flex items-center gap-2 bg-[#E54830] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-brutal hover:bg-[#d03d27]"
            >
              <span>Say hello</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={profile.resume_url && profile.resume_url !== '#' ? profile.resume_url : '#contact'}
              className="neo-btn inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold shadow-brutal hover:bg-slate-50"
            >
              <FileText className="w-4 h-4" />
              <span>Download résumé</span>
            </a>
          </div>
        </div>

        {/* Right Column: "Right now" Card */}
        <div className="lg:col-span-5">
          <div className="neo-card-static bg-[#FFC4B0] rounded-2xl p-6 text-black relative">
            {/* Header with Icon */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-black/20">
              <div className="w-7 h-7 rounded-lg bg-white border-2 border-black flex items-center justify-center shadow-brutal-sm">
                <Compass className="w-4 h-4 text-black" />
              </div>
              <h2 className="font-extrabold text-base tracking-wide uppercase font-display">Right now</h2>
            </div>

            {/* List of current status */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <span className="font-bold block text-black">Building:</span>
                <span className="text-[#1A1A1C]">
                  <strong>{rightNow.building_title}</strong>
                  {rightNow.building_desc ? ` — ${rightNow.building_desc}` : ''}
                </span>
              </div>

              <div>
                <span className="font-bold block text-black">Learning:</span>
                <span className="text-[#1A1A1C]">{rightNow.learning}</span>
              </div>

              <div>
                <span className="font-bold block text-black">Reading:</span>
                <span className="text-[#1A1A1C] italic">{rightNow.reading}</span>
              </div>

              <div>
                <span className="font-bold block text-black">Based in:</span>
                <span className="text-[#1A1A1C]">{rightNow.based_in}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
