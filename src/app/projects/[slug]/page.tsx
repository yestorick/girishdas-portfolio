import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfile, getProjectBySlug, getProjects } from '@/lib/data';
import { ArrowLeft, Calendar, ExternalLink, ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const revalidate = 60;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

const isSelfPortfolioUrl = (url?: string) => {
  if (!url) return true;
  return (
    url === '#' ||
    url.includes('girishdas.vercel.app') ||
    url.includes('hellorick.vercel.app')
  );
};

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const [profile, project] = await Promise.all([
    getProfile(),
    getProjectBySlug(resolvedParams.slug),
  ]);

  if (!project) {
    notFound();
  }

  const completionDate = project.completion_date || project.duration || 'Completed';
  const madeByLabel = project.made_by || 'Made by me';
  const showExternal = project.live_url && !isSelfPortfolioUrl(project.live_url);

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
        {/* Simple Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to My projects</span>
        </Link>

        {/* Simple Clean Project Title & Meta (Zero Distracting Block Boxes) */}
        <header className="space-y-3 mb-7">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1C1917] font-display leading-tight">
            {project.title}
          </h1>

          {/* Completion Date, Made With Me Tag & Tools */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-[#57534E]">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#1C1917]">
              <Calendar className="w-3.5 h-3.5 text-[#57534E]" aria-hidden="true" />
              <span>{completionDate}</span>
            </span>

            <span aria-hidden="true" className="text-[#A8A29E]">•</span>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E4F1E7] border border-[#1E5631]/25 text-[#1E5631]">
              {madeByLabel}
            </span>

            {project.tags && project.tags.length > 0 && (
              <>
                <span aria-hidden="true" className="text-[#A8A29E]">•</span>
                <span className="text-xs text-[#57534E]">
                  {project.tags.join(' · ')}
                </span>
              </>
            )}

            {showExternal && (
              <>
                <span aria-hidden="true" className="text-[#A8A29E]">•</span>
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#A93B24] hover:underline"
                >
                  <span>Live link</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </>
            )}
          </div>

          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed pt-1">
            {project.description}
          </p>
        </header>

        {/* Clean Project Thumbnail */}
        <figure className="mb-8">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={`${project.title} thumbnail`}
              fetchPriority="high"
              loading="eager"
              className="w-full aspect-video object-cover rounded-xl border border-[#1C1917]/15 bg-[#F5F2EB]"
            />
          ) : (
            <div className="w-full aspect-[16/7] rounded-xl border border-[#1C1917]/15 bg-[#F5F2EB] flex flex-col items-center justify-center text-center px-6 gap-2">
              <ImageIcon className="w-6 h-6 text-[#78716C]" aria-hidden="true" />
              <p className="text-xs sm:text-sm font-semibold text-[#57534E]">
                Project Thumbnail ({project.client || project.title})
              </p>
              <p className="text-[11px] text-[#78716C]">
                Add your thumbnail image URL in Supabase <code>projects.image_url</code>
              </p>
            </div>
          )}
        </figure>

        {/* Clean Unboxed Write-Up: How I Completed This Project & Screenshots */}
        <article className="border-t border-[#1C1917]/10 pt-8 text-[#1C1917] leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mt-6 first:mt-0 mb-3 font-display">
                  {children}
                </h2>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1917] mt-8 mb-3 font-display">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base sm:text-lg font-bold text-[#1C1917] mt-6 mb-2 font-display">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-sm sm:text-base text-[#44403C] my-4 leading-relaxed max-w-[68ch]">
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
              img: ({ src, alt }) => (
                <span className="block my-6">
                  <img
                    src={src || ''}
                    alt={alt || 'Project screenshot'}
                    loading="lazy"
                    className="w-full h-auto rounded-xl border border-[#1C1917]/15 bg-white"
                  />
                  {alt && (
                    <span className="block mt-2 text-xs text-[#78716C] text-center">
                      {alt}
                    </span>
                  )}
                </span>
              ),
              table: ({ children }) => (
                <div
                  tabIndex={0}
                  role="region"
                  aria-label="Project results table"
                  className="overflow-x-auto my-6 border border-[#1C1917]/20 rounded-xl bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C84B31]"
                >
                  <table className="w-full min-w-[460px] text-left text-xs sm:text-sm border-collapse">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[#F5F2EB] text-[#1C1917] font-bold border-b border-[#1C1917]/15">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => (
                <tbody className="divide-y divide-[#1C1917]/10 bg-white">{children}</tbody>
              ),
              tr: ({ children }) => <tr className="divide-x divide-[#1C1917]/10">{children}</tr>,
              th: ({ children }) => (
                <th scope="col" className="px-4 py-3 font-bold whitespace-nowrap">
                  {children}
                </th>
              ),
              td: ({ children }) => <td className="px-4 py-3 text-[#44403C]">{children}</td>,
              code: ({ children }) => (
                <code className="bg-[#F5F2EB] text-[#1C1917] px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border border-[#1C1917]/10">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-[#18181B] text-stone-100 p-4 rounded-xl overflow-x-auto text-xs sm:text-sm font-mono my-4">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-[#C84B31] pl-4 italic my-4 text-sm text-[#44403C]">
                  {children}
                </blockquote>
              ),
            }}
          >
            {project.content}
          </ReactMarkdown>

          {/* Optional Additional Screenshots Gallery from Supabase `screenshots` array */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mt-10 pt-8 border-t border-[#1C1917]/10 space-y-5">
              <h2 className="text-lg font-bold text-[#1C1917] font-display">
                Screenshots
              </h2>
              <div className="space-y-5">
                {project.screenshots.map((shotUrl, sIdx) => (
                  <img
                    key={sIdx}
                    src={shotUrl}
                    alt={`${project.title} screenshot ${sIdx + 1}`}
                    loading="lazy"
                    className="w-full h-auto rounded-xl border border-[#1C1917]/15 bg-white"
                  />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Quiet Minimal Bottom Links */}
        <div className="mt-12 pt-6 border-t border-[#1C1917]/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>All projects</span>
          </Link>

          <a
            href={`mailto:${profile.email}?subject=Regarding: ${encodeURIComponent(project.title)}`}
            className="font-semibold text-[#A93B24] hover:underline"
          >
            Questions about this project? Email me →
          </a>
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
