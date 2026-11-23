import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { PenTool, ArrowRight } from 'lucide-react';

interface FromBlogProps {
  posts: BlogPost[];
}

export default function FromBlog({ posts }: FromBlogProps) {
  return (
    <section id="blog" className="py-10 border-t-2 border-black/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#BBF7D0] border-2 border-black flex items-center justify-center shadow-brutal-sm">
          <PenTool className="w-4 h-4 text-black" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          From my blog
        </h2>
      </div>

      {/* Blog Posts List */}
      <div className="divide-y-2 divide-black/10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-center justify-between py-4 sm:py-5 hover:bg-black/[0.02] px-2 rounded-xl transition-all"
          >
            <div className="space-y-1 pr-4">
              <h3 className="font-extrabold text-sm sm:text-base text-black group-hover:underline underline-offset-4 decoration-2">
                {post.title}
              </h3>
              <p className="text-xs text-[#555]">
                {post.published_at} • {post.read_time}
              </p>
            </div>

            <div className="shrink-0 p-2 rounded-lg border-2 border-black bg-white shadow-brutal-sm group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-black" />
            </div>
          </Link>
        ))}
      </div>

      {/* Read all posts link */}
      <div className="mt-6 pt-4 border-t border-black/5">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-black hover:underline underline-offset-4"
        >
          <span>Read all posts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
