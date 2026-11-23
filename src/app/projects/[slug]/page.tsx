import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfile, getProjectBySlug, getProjects } from '@/lib/data';
import { ArrowLeft, ExternalLink, TrendingUp, Calendar, User, Tag, Mail } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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
  yellow: 'bg-[#FDE68A]',
  mint: 'bg-[#BBF7D0]',
  purple: 'bg-[#DDD6FE]',
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

  const headerBg = colorMap[project.color] || 'bg-[#FDE68A]';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar logoText={profile.nav_logo || `[${profile.name.toUpperCase()}]`} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-bold text-black mb-8 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Recent Work & Case Studies</span>
        </Link>

        {/* Case Study Header Banner */}
        <div className={`neo-card-static ${headerBg} rounded-2xl p-6 sm:p-10 mb-8 text-black`}>
          <div className="flex items-center gap-3 flex-wrap text-xs font-bold mb-3">
            {project.client && (
              <span className="bg-white border-1.5 border-black px-3 py-1 rounded-full shadow-brutal-sm">
                Client: {project.client}
              </span>
            )}
            {project.role && (
              <span className="bg-white border-1.5 border-black px-3 py-1 rounded-full shadow-brutal-sm flex items-center gap-1">
                <User className="w-3 h-3" />
                {project.role}
              </span>
            )}
            {project.duration && (
              <span className="bg-white border-1.5 border-black px-3 py-1 rounded-full shadow-brutal-sm flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.duration}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-black font-display leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-black/85 leading-relaxed font-medium max-w-2xl">
            {project.description}
          </p>

          {/* Key Metric Highlights Bar */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-black/20 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-black rounded-xl p-3.5 shadow-brutal-sm text-center"
                >
                  <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-extrabold text-base sm:text-lg">
                    <TrendingUp className="w-4 h-4" />
                    <span>{metric}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
                    Verified Result
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tools & Channels Tags */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <span className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            Channels & Tools:
          </span>
          {project.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="neo-pill bg-white text-black px-3 py-1 text-xs font-bold rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Markdown Case Study Body */}
        <article className="neo-card bg-white rounded-2xl p-6 sm:p-10 prose prose-slate max-w-none text-[#222] leading-relaxed">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-extrabold text-black mt-8 mb-4 border-b-2 border-black/10 pb-2 font-display">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-black mt-6 mb-3 font-display">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold text-black mt-4 mb-2 font-display">
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
              table: ({ children }) => (
                <div className="overflow-x-auto my-6 border-2 border-black rounded-xl shadow-brutal-sm">
                  <table className="w-full text-left text-xs sm:text-sm divide-y-2 divide-black">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[#FAF8F5] text-black font-extrabold">{children}</thead>
              ),
              tbody: ({ children }) => (
                <tbody className="divide-y divide-black/10 bg-white">{children}</tbody>
              ),
              tr: ({ children }) => <tr className="divide-x divide-black/10">{children}</tr>,
              th: ({ children }) => <th className="p-3 font-extrabold">{children}</th>,
              td: ({ children }) => <td className="p-3 text-[#333]">{children}</td>,
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
            {project.content}
          </ReactMarkdown>
        </article>

        {/* CTA Callout: Discuss Strategy / Hire */}
        <div className="mt-10 neo-card bg-[#FFC4B0] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-lg text-center sm:text-left">
            <h3 className="font-extrabold text-lg sm:text-xl text-black font-display">
              Want similar growth results for your business?
            </h3>
            <p className="text-xs sm:text-sm text-black/80 font-medium">
              Let&apos;s audit your paid media campaigns, optimize your landing pages, and scale your ROAS.
            </p>
          </div>

          <a
            href={`mailto:${profile.email}?subject=Growth Inquiry regarding ${encodeURIComponent(project.title)}`}
            className="neo-btn shrink-0 inline-flex items-center gap-2 bg-[#E54830] text-white px-6 py-3 rounded-full text-sm font-bold shadow-brutal hover:bg-[#d03d27]"
          >
            <Mail className="w-4 h-4" />
            <span>Book Growth Call</span>
          </a>
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
