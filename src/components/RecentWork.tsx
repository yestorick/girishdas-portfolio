import { Project } from '@/lib/types';
import { Star, ArrowUpRight, Github, ExternalLink } from 'lucide-react';

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
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          Recent work
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const headerBg = headerColorMap[project.color] || 'bg-[#FDE68A]';

          return (
            <div
              key={project.id || index}
              className="neo-card bg-white rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Top Banner / Screenshot Mockup */}
                <div
                  className={`h-36 sm:h-40 ${headerBg} border-b-2 border-black flex flex-col items-center justify-center p-4 relative group`}
                >
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg border-2 border-black/40"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="font-mono text-xs font-bold text-black/70 tracking-wider">
                        [{project.title}]
                      </span>
                      <p className="text-[11px] font-medium text-black/60 mt-1">
                        Live Web Project
                      </p>
                    </div>
                  )}

                  {/* Corner link icon */}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 p-1.5 rounded-md bg-white border-1.5 border-black shadow-brutal-sm hover:scale-105 transition-transform"
                      title="Open Live Site"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-black" />
                    </a>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-extrabold text-lg text-black">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#444] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
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

              {/* Card Footer Links */}
              <div className="p-5 pt-0 border-t border-black/5 mt-3 flex items-center justify-between">
                {project.live_url ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black hover:underline underline-offset-2"
                  >
                    <span>View project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-slate-400">In Development</span>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:opacity-75 transition-opacity"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
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
