import { TechStackGroup } from '@/lib/types';
import { Code2 } from 'lucide-react';

interface TechStackProps {
  techStack: TechStackGroup[];
}

const colorMap: Record<string, string> = {
  blue: 'bg-[#BAE6FD]',
  mint: 'bg-[#BBF7D0]',
  yellow: 'bg-[#FDE68A]',
  purple: 'bg-[#DDD6FE]',
};

export default function TechStack({ techStack }: TechStackProps) {
  return (
    <section id="stack" className="py-10 border-t-2 border-black/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#BAE6FD] border-2 border-black flex items-center justify-center shadow-brutal-sm">
          <Code2 className="w-4 h-4 text-black" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          Tech stack
        </h2>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {techStack.map((group, index) => {
          const bgClass = colorMap[group.color] || 'bg-[#BAE6FD]';
          return (
            <div
              key={group.id || index}
              className={`neo-card ${bgClass} rounded-2xl p-5 flex flex-col justify-between`}
            >
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-black mb-3">
                  {group.category}
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="neo-pill bg-white text-black px-2.5 py-1 text-xs font-semibold rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
