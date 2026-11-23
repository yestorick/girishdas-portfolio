import Link from 'next/link';
import { Project } from '@/lib/types';
import { Star, ArrowRight, ExternalLink, TrendingUp } from 'lucide-react';

interface RecentWorkProps {
  projects: Project[];
}

const headerColorMap: Record<string, string> = {
  yellow: 'bg-[#FDE68A]',
  mint: 'bg-[#BBF7D0]',
  purple: 'bg-[#DDD6FE]',
};

export default function RecentWork({ projects }: RecentWorkProps) {
  return (
    <section id="work" className="py-10 border-t-2 border-black/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#FFC4B0] border-2 border-black flex items-center justify-center shadow-brutal-sm">
          <Star className="w-4 h-4 text-black" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black font-display">
            Recent work & Case studies
          </h2>
          <p className="text-xs text-[#555] font-medium">
            In-depth breakdowns of paid acquisition campaigns, CRO experiments, and growth results
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const headerBg = headerColorMap[project.color] || 'bg-[#FDE68A]';

          return (
            <div
              key={project.slug || project.id || index}
              className="neo-card bg-white rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Top Banner / Screenshot Mockup (Links to Case Study) */}
                <Link
                  href={`/projects/${project.slug}`}
                  className={`block h-36 sm:h-40 ${headerBg} border-b-2 border-black p-4 relative group-hover:opacity-95 transition-opacity`}
                >
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg border-2 border-black/40"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-xs font-bold text-black/75 tracking-wider px-2 py-1 bg-white/70 rounded border border-black/20">
                        CASE STUDY
                      </span>
                      <p className="text-xs font-extrabold text-black mt-2 font-display">
                        {project.client || 'Growth Breakdown'}
                      </p>
                    </div>
                  )}

                  {/* Corner indicator */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white text-[10px] font-bold border-1.5 border-black shadow-brutal-sm">
                    Read Breakdown
                  </span>
                </Link>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="font-extrabold text-base sm:text-lg text-black group-hover:underline underline-offset-2 font-display leading-snug">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#444] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key Highlights / Metrics chips */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {project.metrics.slice(0, 2).map((metric, mIdx) => (
                        <span
                          key={mIdx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-[#FAF8F5] border border-black/25 text-emerald-800"
                        >
                          <TrendingUp className="w-3 h-3 text-emerald-600" />
                          <span>{metric}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech / Tool Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="neo-pill bg-slate-50 text-black px-2.5 py-0.5 text-xs font-medium rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: View Project Case Study */}
              <div className="p-5 pt-0 border-t border-black/5 mt-3 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black hover:underline underline-offset-2"
                >
                  <span>Read case study</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </Link>

                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-slate-500 hover:text-black hover:bg-slate-100 transition-colors"
                    title="Open Live Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
