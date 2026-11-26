import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { PenTool, ArrowRight } from 'lucide-react';

interface FromBlogProps {
  posts: BlogPost[];
  heading?: string;
}

export default function FromBlog({
  posts,
  heading = 'From my blog',
}: FromBlogProps) {
  return (
    <section id="blog" className="scroll-mt-24 py-10 border-t border-[#1C1917]/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#F5F2EB] border-[1.5px] border-[#292524] flex items-center justify-center">
          <PenTool className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1C1917] font-display">
          {heading}
        </h2>
      </div>

      {/* Blog Posts List */}
      {posts.length > 0 ? (
        <div className="divide-y divide-[#1C1917]/10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-center justify-between gap-4 py-4 sm:py-5 hover:bg-[#F5F2EB]/70 px-3 -mx-3 rounded-xl transition-colors"
            >
              <div className="space-y-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-[#1C1917] group-hover:underline underline-offset-4 decoration-[#C84B31] font-display">
                  {post.title}
                </h3>
                <p className="text-xs text-[#57534E]">
                  {post.published_at} • {post.read_time}
                </p>
              </div>

              <div className="shrink-0 w-9 h-9 rounded-lg border border-[#1C1917]/25 bg-white flex items-center justify-center group-hover:border-[#1C1917] group-hover:translate-x-0.5 transition-all">
                <ArrowRight className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#57534E] py-4">
          No published posts yet. Add and publish an article in Supabase to display it here.
        </p>
      )}

      {/* Read all posts link */}
      <div className="mt-5 pt-4 border-t border-[#1C1917]/10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#1C1917] hover:text-[#C84B31] transition-colors"
        >
          <span>Read all posts</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
