import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfile, getPostBySlug, getPosts } from '@/lib/data';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const revalidate = 60;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
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
        nickname={profile.nickname || 'Rick'}
      />

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-12 focus:outline-none">
        {/* Back Link */}
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

        {/* Post Markdown Body */}
        <article className="neo-card-static bg-white rounded-2xl p-6 sm:p-10 text-[#1C1917] leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1917] mt-6 first:mt-0 mb-4 border-b border-[#1C1917]/10 pb-2 font-display">
                  {children}
                </h2>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1917] mt-7 mb-3 font-display">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base sm:text-lg font-bold text-[#1C1917] mt-5 mb-2 font-display">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm sm:text-base text-[#44403C] my-4 leading-relaxed max-w-[65ch]">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1.5 my-4 text-sm sm:text-base text-[#44403C]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1.5 my-4 text-sm sm:text-base text-[#44403C]">
                  {children}
                </ol>
              ),
              code: ({ children }) => (
                <code className="bg-[#F5F2EB] text-[#1C1917] px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border border-[#1C1917]/10">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-[#18181B] text-stone-100 p-4 rounded-xl overflow-x-auto text-xs sm:text-sm font-mono my-4 border border-[#292524]">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#C84B31] bg-[#FBF9F5] p-3.5 rounded-r-lg italic my-4 text-sm text-[#44403C]">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
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
