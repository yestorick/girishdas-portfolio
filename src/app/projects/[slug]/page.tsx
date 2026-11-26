import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfile, getProjectBySlug, getProjects } from '@/lib/data';
import { ArrowLeft, TrendingUp, Calendar, User, Tag, Mail, ExternalLink } from 'lucide-react';
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

const colorMap: Record<string, string> = {
  yellow: 'bg-[#F9F3DF]',
  mint: 'bg-[#EDF4EF]',
  purple: 'bg-[#F1EEF7]',
};

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

  const headerBg = colorMap[project.color] || 'bg-[#F9F3DF]';
  const showExternal = project.live_url && !isSelfPortfolioUrl(project.live_url);

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5]">
      <Navbar logoText={profile.nav_logo || profile.name.toUpperCase()} />

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-12 focus:outline-none">
        {/* Breadcrumb Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Recent Work &amp; Case Studies</span>
        </Link>

        {/* Case Study Header Banner */}
        <div className={`neo-card-static ${headerBg} rounded-2xl p-6 sm:p-10 mb-8 text-[#1C1917]`}>
          <div className="flex items-center gap-2.5 flex-wrap text-xs font-semibold mb-4">
            {project.client && (
              <span className="bg-white border border-[#1C1917]/20 px-3 py-1 rounded-full">
                Client: {project.client}
              </span>
            )}
            {project.role && (
              <span className="bg-white border border-[#1C1917]/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <User className="w-3 h-3 text-[#57534E]" aria-hidden="true" />
                {project.role}
              </span>
            )}
            {project.duration && (
              <span className="bg-white border border-[#1C1917]/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#57534E]" aria-hidden="true" />
                {project.duration}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1C1917] font-display leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-[#44403C] leading-relaxed max-w-2xl">
            {project.description}
          </p>

          {showExternal && (
            <div className="mt-5">
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-1.5 bg-white hover:bg-[#F5F2EB] text-[#1C1917] px-4 py-2 rounded-full text-xs font-semibold"
              >
                <span>View live campaign</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          )}

          {/* Key Metric Highlights Bar */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#1C1917]/15 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#1C1917]/20 rounded-xl p-3.5 text-center"
                >
                  <div className="flex items-center justify-center gap-1.5 text-[#1E5631] font-bold text-base sm:text-lg">
                    <TrendingUp className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{metric}</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#78716C] uppercase tracking-wider block mt-0.5">
                    Verified Result
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tools & Channels Tags */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <span className="text-xs font-semibold text-[#57534E] uppercase tracking-wider inline-flex items-center gap-1.5 mr-1">
            <Tag className="w-3.5 h-3.5" aria-hidden="true" />
            Channels &amp; Tools:
          </span>
          {project.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="neo-pill bg-white text-[#292524] px-3 py-1 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Markdown Case Study Body */}
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
              table: ({ children }) => (
                <div
                  tabIndex={0}
                  role="region"
                  aria-label="Campaign metrics and results table"
                  className="overflow-x-auto my-6 border border-[#292524] rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C84B31]"
                >
                  <table className="w-full min-w-[460px] text-left text-xs sm:text-sm border-collapse">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[#FBF9F5] text-[#1C1917] font-bold border-b border-[#292524]">
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
            {project.content}
          </ReactMarkdown>
        </article>

        {/* CTA Callout: Discuss Strategy / Hire */}
        <div className="mt-10 neo-card-static bg-[#F7ECE6] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-lg text-center sm:text-left">
            <h2 className="font-extrabold text-lg sm:text-xl text-[#1C1917] font-display">
              Want similar growth results for your business?
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E]">
              Let&apos;s audit your paid media campaigns, optimize your landing pages, and scale your ROAS.
            </p>
          </div>

          <a
            href={`mailto:${profile.email}?subject=Growth Inquiry regarding ${encodeURIComponent(project.title)}`}
            className="neo-btn shrink-0 inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] text-white px-6 py-3 rounded-full text-sm font-semibold"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Book Growth Call</span>
          </a>
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
