import { TechStackGroup } from '@/lib/types';
import { Layers } from 'lucide-react';

interface TechStackProps {
  techStack: TechStackGroup[];
}

const colorMap: Record<string, string> = {
  blue: 'bg-[#EDF3F7]',
  mint: 'bg-[#EDF4EF]',
  yellow: 'bg-[#F9F3DF]',
  purple: 'bg-[#F1EEF7]',
};

export default function TechStack({ techStack }: TechStackProps) {
  return (
    <section id="stack" className="scroll-mt-24 py-10 border-t border-[#1C1917]/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#F5F2EB] border-[1.5px] border-[#292524] flex items-center justify-center">
          <Layers className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1C1917] font-display">
          Growth & Marketing Stack
        </h2>
      </div>

      {/* 4 Cards Grid: calm muted editorial tints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {techStack.map((group, index) => {
          const bgClass = colorMap[group.color] || 'bg-[#F5F2EB]';
          return (
            <div
              key={group.id || index}
              className={`neo-card ${bgClass} rounded-2xl p-5 flex flex-col justify-between min-w-0`}
            >
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#1C1917] mb-3.5 font-display">
                  {group.category}
                </h3>

                <ul className="flex flex-wrap gap-1.5" role="list">
                  {group.skills.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="neo-pill bg-white text-[#292524] px-2.5 py-1 text-xs font-medium rounded-md"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
