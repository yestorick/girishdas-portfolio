import { FavoriteItem } from '@/lib/types';
import { Sparkles, BookOpen, Music, Film, Wrench } from 'lucide-react';

interface MyFavouritesProps {
  favorites: FavoriteItem[];
}

const favColorMap: Record<string, string> = {
  peach: 'bg-[#F7ECE6]',
  blue: 'bg-[#EDF3F7]',
  purple: 'bg-[#F1EEF7]',
  mint: 'bg-[#EDF4EF]',
};

export default function MyFavourites({ favorites }: MyFavouritesProps) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'book':
        return <BookOpen className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />;
      case 'music':
        return <Music className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />;
      case 'film':
        return <Film className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />;
      case 'tool':
        return <Wrench className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />;
    }
  };

  return (
    <section id="favourites" className="scroll-mt-24 py-10 border-t border-[#1C1917]/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#F5F2EB] border-[1.5px] border-[#292524] flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1C1917] font-display">
          My favourites
        </h2>
      </div>

      {/* 4 Cards Grid: Calm editorial pastel washes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {favorites.map((fav, index) => {
          const bgClass = favColorMap[fav.color] || 'bg-[#F7ECE6]';

          return (
            <div
              key={fav.id || index}
              className={`neo-card ${bgClass} rounded-2xl p-5 flex flex-col justify-between min-w-0`}
            >
              <div>
                <div className="w-7 h-7 rounded-lg bg-white border border-[#292524]/40 flex items-center justify-center mb-3">
                  {getIcon(fav.icon)}
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#1C1917] font-display">
                  {fav.category}
                </h3>

                <div className="text-xs sm:text-sm mt-2 space-y-0.5">
                  <p className="font-semibold text-[#1C1917] leading-snug">{fav.title}</p>
                  <p className="text-xs text-[#57534E]">{fav.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
