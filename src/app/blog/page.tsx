import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfile, getPosts } from '@/lib/data';
import { ArrowLeft, ArrowRight, PenTool } from 'lucide-react';

export const revalidate = 60;

export default async function BlogIndexPage() {
  const [profile, posts] = await Promise.all([getProfile(), getPosts()]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar logoText={profile.nav_logo || `[${profile.name.toUpperCase()}]`} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-black mb-8 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#BBF7D0] border-2 border-black flex items-center justify-center shadow-brutal-sm">
            <PenTool className="w-4 h-4 text-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
            Articles & Notes
          </h1>
        </div>

        <p className="text-sm sm:text-base text-[#444] mb-10 max-w-xl">
          Thoughts on software engineering, distributed architecture, design systems, and building AI agents.
        </p>

        {/* Blog Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="neo-card bg-white rounded-2xl p-6 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-lg sm:text-xl font-extrabold text-black hover:underline underline-offset-4 decoration-2">
                    {post.title}
                  </h2>
                </Link>
                <span className="text-xs font-semibold text-slate-500 shrink-0">
                  {post.published_at} • {post.read_time}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#444] leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline"
              >
                <span>Read article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
