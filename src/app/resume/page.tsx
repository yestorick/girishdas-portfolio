import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrintResumeButton from '@/components/PrintResumeButton';
import { getProfile, getExperiences, getTechStack, getProjects } from '@/lib/data';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';

export const revalidate = 60;

export default async function ResumePage() {
  const [profile, experiences, techStack, projects] = await Promise.all([
    getProfile(),
    getExperiences(),
    getTechStack(),
    getProjects(),
  ]);

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5]">
      <div className="print:hidden">
        <Navbar logoText={profile.nav_logo || profile.name.toUpperCase()} />
      </div>

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 focus:outline-none">
        <div className="flex items-center justify-between gap-4 mb-6 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Portfolio</span>
          </Link>

          <PrintResumeButton />
        </div>

        <article className="neo-card-static bg-white rounded-2xl p-6 sm:p-10 space-y-8 print:border-0 print:shadow-none print:p-0">
          {/* Header */}
          <header className="pb-6 border-b border-[#1C1917]/15 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] font-display">
              {profile.name}
            </h1>
            <p className="text-sm font-semibold text-[#C84B31]">
              Performance Marketer &amp; Digital Growth Strategist
            </p>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              {profile.bio}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#57534E]">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                {profile.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                Bengaluru, India
              </span>
            </div>
          </header>

          {/* Experience */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1917] font-display">
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base text-[#1C1917]">
                      {exp.role} <span className="font-normal text-[#57534E]">• {exp.company}</span>
                    </h3>
                    <span className="text-xs font-semibold text-[#78716C] shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Case Studies */}
          <section className="space-y-4 pt-4 border-t border-[#1C1917]/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1917] font-display">
              Selected Results &amp; Case Studies
            </h2>
            <div className="space-y-3">
              {projects.map((p, idx) => (
                <div key={p.slug || idx} className="space-y-1">
                  <h3 className="font-bold text-sm text-[#1C1917]">{p.title}</h3>
                  <p className="text-xs text-[#57534E]">{p.description}</p>
                  {p.metrics && p.metrics.length > 0 && (
                    <p className="text-xs font-semibold text-[#1E5631]">
                      Outcomes: {p.metrics.join(' · ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Core Stack */}
          <section className="space-y-3 pt-4 border-t border-[#1C1917]/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1917] font-display">
              Growth &amp; Analytics Stack
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {techStack.map((group, idx) => (
                <div key={group.id || idx}>
                  <span className="font-bold text-[#1C1917]">{group.category}: </span>
                  <span className="text-[#57534E]">{group.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>

      <div className="print:hidden">
        <Footer profile={profile} />
      </div>
    </div>
  );
}
