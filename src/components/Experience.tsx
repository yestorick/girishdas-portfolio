import Link from 'next/link';
import { Experience as ExperienceType } from '@/lib/types';
import { Briefcase, FileText } from 'lucide-react';

interface ExperienceProps {
  experiences: ExperienceType[];
  resumeUrl?: string;
  heading?: string;
}

export default function Experience({
  experiences,
  resumeUrl,
  heading = 'Experience',
}: ExperienceProps) {
  const hasExternalResume = Boolean(resumeUrl && resumeUrl !== '#');

  return (
    <section id="experience" className="scroll-mt-24 py-10 border-t border-[#1C1917]/10">
      {/* Section Header + Subtle Résumé Link */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5F2EB] border-[1.5px] border-[#292524] flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1C1917] font-display">
            {heading}
          </h2>
        </div>

        {hasExternalResume ? (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#57534E] hover:text-[#C84B31] transition-colors"
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Full résumé →</span>
          </a>
        ) : (
          <Link
            href="/resume"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#57534E] hover:text-[#C84B31] transition-colors"
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            <span>View full résumé →</span>
          </Link>
        )}
      </div>

      {/* Experience Cards */}
      <div className="space-y-3.5">
        {experiences.map((exp, index) => {
          const isCurrent = index === 0 || /now|present/i.test(exp.period);
          const lines = exp.description
            .split('\n')
            .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
            .filter(Boolean);

          return (
            <div
              key={exp.id || index}
              className="neo-card bg-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="max-w-2xl min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-[#1C1917] font-display leading-snug">
                  {exp.role}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#A93B24] mt-0.5">
                  {exp.company}
                </p>

                {lines.length > 1 ? (
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#57534E] leading-relaxed mt-2.5">
                    {lines.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mt-2">
                    {exp.description}
                  </p>
                )}
              </div>

              <div className="self-start sm:self-center shrink-0">
                <span
                  className={`inline-block px-3.5 py-1 text-xs font-semibold rounded-full border ${
                    isCurrent
                      ? 'bg-[#F6E2A5] text-[#1C1917] border-[#292524]'
                      : 'bg-[#FBF9F5] text-[#57534E] border-[#1C1917]/20'
                  }`}
                >
                  {exp.period}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
