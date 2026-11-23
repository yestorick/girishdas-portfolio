import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfile, getPostBySlug, getPosts } from '@/lib/data';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar logoText={profile.nav_logo || `[${profile.name.toUpperCase()}]`} />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-black mb-8 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </Link>

        {/* Post Header Card */}
        <div className="neo-card-static bg-[#BBF7D0] rounded-2xl p-6 sm:p-8 mb-8 text-black">
          <div className="flex items-center gap-4 text-xs font-semibold mb-3">
            <span className="inline-flex items-center gap-1.5 bg-white border border-black/30 px-2.5 py-0.5 rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              {post.published_at}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-black/30 px-2.5 py-0.5 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              {post.read_time}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-3 text-sm sm:text-base text-black/80 font-medium">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Post Markdown Body */}
        <article className="neo-card bg-white rounded-2xl p-6 sm:p-10 prose prose-slate max-w-none text-[#222] leading-relaxed">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-extrabold text-black mt-8 mb-4 border-b-2 border-black/10 pb-2">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-black mt-6 mb-3">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold text-black mt-4 mb-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm sm:text-base text-[#333] my-4 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1.5 my-4 text-sm sm:text-base text-[#333]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1.5 my-4 text-sm sm:text-base text-[#333]">
                  {children}
                </ol>
              ),
              code: ({ children }) => (
                <code className="bg-slate-100 text-black px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border border-black/10">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-[#141416] text-white p-4 rounded-xl overflow-x-auto text-xs sm:text-sm font-mono my-4 border-2 border-black">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-black bg-[#FAF8F5] p-3 rounded-r-lg italic my-4 text-sm text-[#333]">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Share / Back to portfolio */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/"
            className="neo-btn inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>

          <a
            href={`mailto:${profile.email}?subject=Question regarding: ${encodeURIComponent(post.title)}`}
            className="neo-btn inline-flex items-center gap-2 bg-[#FFC4B0] text-black px-5 py-2.5 rounded-full text-xs font-bold"
          >
            <span>Discuss this post</span>
          </a>
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
