import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfile, getPosts } from '@/lib/data';
import { ArrowLeft, ArrowRight, PenTool } from 'lucide-react';

export const revalidate = 60;

export default async function BlogIndexPage() {
  const [profile, posts] = await Promise.all([getProfile(), getPosts()]);

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5]">
      <Navbar
        logoText={profile.nav_logo || profile.name}
        avatarUrl={profile.avatar_url}
        statusBadge={profile.status_badge}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-12 focus:outline-none">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#F5F2EB] border-[1.5px] border-[#292524] flex items-center justify-center">
            <PenTool className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917] font-display">
            Notes &amp; Articles
          </h1>
        </div>

        <p className="text-sm sm:text-base text-[#57534E] mb-10 max-w-xl">
          Personal notes on Google Ads, Meta Ads creatives, conversion tracking, and digital content strategy.
        </p>

        {/* Blog Posts */}
        <div className="space-y-5">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="neo-card bg-white rounded-2xl p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-lg sm:text-xl font-bold text-[#1C1917] hover:underline underline-offset-4 decoration-[#C84B31] font-display">
                    {post.title}
                  </h2>
                </Link>
                <span className="text-xs font-medium text-[#78716C] shrink-0">
                  {post.published_at} • {post.read_time}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1C1917] hover:text-[#C84B31] transition-colors"
              >
                <span>Read article</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
