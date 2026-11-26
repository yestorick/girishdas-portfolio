import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarkdownContent from '@/components/MarkdownContent';
import { getProfile, getPostBySlug } from '@/lib/data';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const [profile, post] = await Promise.all([
    getProfile(),
    getPostBySlug(resolvedParams.slug),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5]">
      <Navbar
        logoText={profile.nav_logo || profile.name}
        avatarUrl={profile.avatar_url}
        statusBadge={profile.status_badge}
      />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-12 focus:outline-none"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to All Articles</span>
        </Link>

        {/* Post Header Card (Calm Mist Sage) */}
        <div className="neo-card-static bg-[#EDF4EF] rounded-2xl p-6 sm:p-8 mb-8 text-[#1C1917]">
          <div className="flex items-center gap-3 flex-wrap text-xs font-semibold mb-3">
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#1C1917]/20 px-3 py-0.5 rounded-full">
              <Calendar className="w-3.5 h-3.5 text-[#57534E]" aria-hidden="true" />
              {post.published_at}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#1C1917]/20 px-3 py-0.5 rounded-full">
              <Clock className="w-3.5 h-3.5 text-[#57534E]" aria-hidden="true" />
              {post.read_time}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1C1917] leading-tight font-display">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-3 text-sm sm:text-base text-[#44403C]">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Optional Cover Image */}
        {post.cover_image && (
          <figure className="mb-8">
            <img
              src={post.cover_image}
              alt={`${post.title} cover image`}
              fetchPriority="high"
              loading="eager"
              className="w-full aspect-video object-cover rounded-xl border border-[#1C1917]/15 bg-[#F5F2EB]"
            />
          </figure>
        )}

        {/* Post Markdown Body */}
        <article className="neo-card-static bg-white rounded-2xl p-6 sm:p-10 text-[#1C1917] leading-relaxed">
          <MarkdownContent
            content={post.content}
            imageAltFallback="Article illustration"
            tableAriaLabel="Article data table"
          />
        </article>

        {/* Bottom links */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="neo-btn inline-flex items-center gap-2 bg-white hover:bg-[#F5F2EB] text-[#1C1917] px-5 py-2.5 rounded-full text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>

          <a
            href={`mailto:${profile.email}?subject=Question regarding: ${encodeURIComponent(post.title)}`}
            className="neo-btn inline-flex items-center gap-2 bg-[#F7ECE6] hover:bg-[#F0DFD5] text-[#1C1917] px-5 py-2.5 rounded-full text-xs font-semibold"
          >
            <span>Discuss with me</span>
          </a>
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
