import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrintResumeButton from '@/components/PrintResumeButton';
import {
  getProfile,
  getRightNow,
  getExperiences,
  getEducation,
  getTechStack,
  getProjects,
} from '@/lib/data';
import { ArrowLeft, Mail, MapPin, Phone, Globe, Linkedin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ResumePage() {
  const [profile, rightNow, experiences, educationList, techStack, projects] =
    await Promise.all([
      getProfile(),
      getRightNow(),
      getExperiences(),
      getEducation(),
      getTechStack(),
      getProjects(),
    ]);

  const displayLocation = profile.location || rightNow.based_in;
  const rawWebsite = profile.website_url || 'https://hellorick.vercel.app';
  const websiteHref = /^https?:\/\//i.test(rawWebsite)
    ? rawWebsite
    : `https://${rawWebsite}`;
  const websiteLabel = rawWebsite.replace(/^https?:\/\//i, '').replace(/\/$/, '');
  const linkedinLabel = (profile.linkedin_url || '')
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/$/, '');

  const aiCreativeProjects = projects.filter(
    (p) => p.category === 'ai-creative'
  );
  const displayResumeProjects =
    aiCreativeProjects.length > 0 ? aiCreativeProjects : projects;
  const resumeProjectsHeading =
    aiCreativeProjects.length > 0
      ? 'AI Creative Projects'
      : profile.projects_heading || 'Projects';

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5]">
      <div className="print:hidden">
        <Navbar
          logoText={profile.nav_logo || profile.name}
          avatarUrl={profile.avatar_url}
          statusBadge={profile.status_badge}
        />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 focus:outline-none"
      >
        <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>

          <PrintResumeButton />
        </div>

        <article className="neo-card-static bg-white rounded-2xl p-6 sm:p-10 space-y-6 print:border-0 print:shadow-none print:p-0">
          {/* Header */}
          <header className="pb-5 border-b border-[#1C1917]/15 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] font-display">
              {profile.name}
              {profile.nickname ? ` (${profile.nickname})` : ''}
            </h1>
            {profile.headline_highlight && (
              <p className="text-sm font-semibold text-[#C84B31]">
                {profile.headline_highlight}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-[#57534E]">
              {displayLocation && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  {displayLocation}
                </span>
              )}
              {profile.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  {profile.phone}
                </span>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-[#1C1917]"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                {profile.email}
              </a>
              {websiteLabel && (
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#1C1917]"
                >
                  <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                  {websiteLabel}
                </a>
              )}
              {profile.linkedin_url && linkedinLabel && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#1C1917]"
                >
                  <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                  {linkedinLabel}
                </a>
              )}
            </div>
          </header>

          {/* Summary */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] font-display">
              Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
              {profile.bio}
            </p>
          </section>

          {/* Experience */}
          <section className="space-y-4 pt-4 border-t border-[#1C1917]/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] font-display">
              {profile.experience_heading || 'Experience'}
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => {
                const bullets = exp.description
                  .split('\n')
                  .map((b) => b.replace(/^[•\-*]\s*/, '').trim())
                  .filter(Boolean);

                return (
                  <div key={exp.id || idx} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-[#1C1917]">
                          {exp.role}
                        </h3>
                        <p className="text-xs font-semibold text-[#A93B24]">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#78716C] shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    {bullets.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                        {bullets.map((line, bIdx) => (
                          <li key={bIdx}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* AI Creative Projects */}
          <section className="space-y-3 pt-4 border-t border-[#1C1917]/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] font-display">
              {resumeProjectsHeading}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-[#44403C]">
              {displayResumeProjects.map((p, idx) => (
                <li key={p.slug || idx} className="leading-relaxed">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="font-bold text-[#1C1917] hover:underline decoration-[#C84B31]"
                  >
                    {p.title}
                  </Link>
                  {p.tags && p.tags.length > 0 && (
                    <span className="text-[#57534E]">
                      {' '}
                      | {p.tags.join(', ')}.
                    </span>
                  )}{' '}
                  <span className="text-[#57534E]">{p.description}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Skills */}
          <section className="space-y-3 pt-4 border-t border-[#1C1917]/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] font-display">
              Skills
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              {techStack.map((group, idx) => (
                <div
                  key={group.id || idx}
                  className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-4"
                >
                  <span className="font-bold text-[#1C1917]">
                    {group.category}
                  </span>
                  <span className="text-[#57534E]">
                    {(group.skills || []).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Education and Learning */}
          {educationList.length > 0 && (
            <section className="space-y-3 pt-4 border-t border-[#1C1917]/10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] font-display">
                Education &amp; Learning
              </h2>
              <div className="space-y-4">
                {educationList.map((edu, idx) => (
                  <div key={edu.id || idx} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h3 className="font-bold text-sm text-[#1C1917]">
                          {edu.degree}
                        </h3>
                        <p className="text-xs font-medium text-[#57534E]">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#78716C] shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <div className="print:hidden">
        <Footer profile={profile} />
      </div>
    </div>
  );
}
