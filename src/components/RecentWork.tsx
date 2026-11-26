import Link from 'next/link';
import { Project } from '@/lib/types';
import { Star, ArrowRight, ExternalLink, TrendingUp } from 'lucide-react';

interface RecentWorkProps {
  projects: Project[];
}

const headerColorMap: Record<string, string> = {
  yellow: 'bg-[#F9F3DF]',
  mint: 'bg-[#EDF4EF]',
  purple: 'bg-[#F1EEF7]',
};

const isSelfPortfolioUrl = (url?: string) => {
  if (!url) return true;
  return (
    url === '#' ||
    url.includes('girishdas.vercel.app') ||
    url.includes('hellorick.vercel.app')
  );
};

export default function RecentWork({ projects }: RecentWorkProps) {
  return (
    <section id="work" className="scroll-mt-24 py-10 border-t border-[#1C1917]/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#F5F2EB] border-[1.5px] border-[#292524] flex items-center justify-center">
          <Star className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1C1917] font-display">
            Recent work & Case studies
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E]">
            Detailed campaign breakdowns covering strategy, CRO, and verified ROAS outcomes
          </p>
        </div>
      </div>

      {/* 3-Column Balanced Grid from md+ so laptop viewports avoid orphan rows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((project, index) => {
          const headerBg = headerColorMap[project.color] || 'bg-[#F9F3DF]';
          const showExternal = project.live_url && !isSelfPortfolioUrl(project.live_url);

          return (
            <article
              key={project.slug || project.id || index}
              className="neo-card bg-white rounded-2xl overflow-hidden flex flex-col justify-between group min-w-0"
            >
              <div className="flex flex-col flex-1">
                {/* Clean Banner Area (zero overlapping corner pills) */}
                <Link
                  href={`/projects/${project.slug}`}
                  className={`block h-32 sm:h-36 ${headerBg} border-b border-[#292524]/25 p-4 transition-colors`}
                >
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg border border-[#1C1917]/15"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center gap-1.5">
                      <span className="font-mono text-[11px] font-semibold text-[#57534E] tracking-wider uppercase px-2.5 py-0.5 bg-white/80 rounded-full border border-[#1C1917]/15">
                        Case Study
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-[#1C1917] font-display">
                        {project.client || 'Campaign Breakdown'}
                      </p>
                    </div>
                  )}
                </Link>

                {/* Card Content */}
                <div className="p-5 space-y-3 flex-1">
                  <Link href={`/projects/${project.slug}`} className="block">
                    <h3 className="font-bold text-base sm:text-lg text-[#1C1917] group-hover:underline underline-offset-4 decoration-[#C84B31] font-display leading-snug">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Single Quiet Metric Highlight Strip */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {project.metrics.slice(0, 2).map((metric, mIdx) => (
                        <span
                          key={mIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#E4F1E7]/75 border border-[#1E5631]/20 text-[#1E5631]"
                        >
                          <TrendingUp className="w-3 h-3 shrink-0" aria-hidden="true" />
                          <span>{metric}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Flat Quiet Tool Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="neo-pill bg-[#FBF9F5] text-[#57534E] px-2.5 py-0.5 text-[11px] font-medium rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Aligned Case Study Link */}
              <div className="px-5 py-3.5 border-t border-[#1C1917]/10 flex items-center justify-between bg-[#FCFBF8]">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1C1917] hover:text-[#C84B31] transition-colors"
                >
                  <span>Read case study</span>
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </Link>

                {showExternal && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
                    aria-label={`Open live project for ${project.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
