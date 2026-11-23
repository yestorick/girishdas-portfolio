import { FavoriteItem } from '@/lib/types';
import { Sparkles, BookOpen, Music, Film, Wrench } from 'lucide-react';

interface MyFavouritesProps {
  favorites: FavoriteItem[];
}

const favColorMap: Record<string, string> = {
  peach: 'bg-[#FFC4B0]',
  blue: 'bg-[#BAE6FD]',
  purple: 'bg-[#DDD6FE]',
  mint: 'bg-[#BBF7D0]',
};

export default function MyFavourites({ favorites }: MyFavouritesProps) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'book':
        return <BookOpen className="w-4 h-4 text-black" />;
      case 'music':
        return <Music className="w-4 h-4 text-black" />;
      case 'film':
        return <Film className="w-4 h-4 text-black" />;
      case 'tool':
        return <Wrench className="w-4 h-4 text-black" />;
      default:
        return <Sparkles className="w-4 h-4 text-black" />;
    }
  };

  return (
    <section id="favourites" className="py-10 border-t-2 border-black/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#FDE68A] border-2 border-black flex items-center justify-center shadow-brutal-sm">
          <Sparkles className="w-4 h-4 text-black" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          My favourites
        </h2>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {favorites.map((fav, index) => {
          const bgClass = favColorMap[fav.color] || 'bg-[#FFC4B0]';

          return (
            <div
              key={fav.id || index}
              className={`neo-card ${bgClass} rounded-2xl p-5 flex flex-col justify-between`}
            >
              <div>
                <div className="w-7 h-7 rounded-lg bg-white border-2 border-black flex items-center justify-center mb-3 shadow-brutal-sm">
                  {getIcon(fav.icon)}
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-black mb-1">
                  {fav.category}
                </h3>

                <div className="text-xs sm:text-sm text-[#1A1A1C] mt-2">
                  <p className="font-bold leading-tight">{fav.title}</p>
                  <p className="text-xs text-[#333] mt-0.5">{fav.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
