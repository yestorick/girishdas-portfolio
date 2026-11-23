import { Experience as ExperienceType } from '@/lib/types';
import { Briefcase } from 'lucide-react';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-10 border-t-2 border-black/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#DDD6FE] border-2 border-black flex items-center justify-center shadow-brutal-sm">
          <Briefcase className="w-4 h-4 text-black" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          Experience
        </h2>
      </div>

      {/* Experience Cards */}
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div
            key={exp.id || index}
            className="neo-card bg-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-base sm:text-lg text-black">
                  {exp.role}
                </h3>
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">•</span>
                <span className="text-sm font-semibold text-slate-700">
                  {exp.company}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
                {exp.description}
              </p>
            </div>

            {/* Date Pill */}
            <div className="self-start sm:self-center shrink-0">
              <span className="neo-pill bg-[#FDE68A] text-black px-3.5 py-1 text-xs font-bold rounded-full">
                {exp.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
