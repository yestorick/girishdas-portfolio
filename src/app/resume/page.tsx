import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrintResumeButton from '@/components/PrintResumeButton';
import { getProfile, getExperiences, getTechStack, getProjects } from '@/lib/data';
import { ArrowLeft, Mail, MapPin, Phone, Globe } from 'lucide-react';

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
        <Navbar
          logoText={profile.nav_logo || profile.name}
          nickname={profile.nickname || 'Rick'}
        />
      </div>

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 focus:outline-none">
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

        <article className="neo-card-static bg-white rounded-2xl p-6 sm:p-10 space-y-7 print:border-0 print:shadow-none print:p-0">
          {/* Header */}
          <header className="pb-6 border-b border-[#1C1917]/15 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] font-display">
              {profile.name}
              {profile.nickname ? ` (${profile.nickname})` : ''}
            </h1>
            <p className="text-sm font-semibold text-[#C84B31]">
              Performance &amp; Digital Marketing Executive
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-[#57534E]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                Kolkata, India
              </span>
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
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                hellorick.vercel.app
              </span>
            </div>
            <p className="pt-2 text-xs sm:text-sm text-[#44403C] leading-relaxed">
              {profile.bio}
            </p>
          </header>

          {/* Experience */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] font-display">
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

          {/* Projects */}
          <section className="space-y-4 pt-4 border-t border-[#1C1917]/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] font-display">
              Projects
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

          {/* Skills */}
          <section className="space-y-3 pt-4 border-t border-[#1C1917]/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] font-display">
              Skills &amp; Tech Stack
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

          {/* Education and Learning */}
          <section className="space-y-2 pt-4 border-t border-[#1C1917]/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] font-display">
              Education &amp; Learning
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="font-bold text-sm text-[#1C1917]">
                B.Sc. (Honours), Chemistry{' '}
                <span className="font-normal text-[#57534E]">• Taki Government College, West Bengal</span>
              </h3>
              <span className="text-xs font-semibold text-[#78716C] shrink-0">
                Dropout (2nd year)
              </span>
            </div>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Dropped out to pursue a full-time career in digital marketing. Self-taught performance marketing and content strategy through YouTube and X (Twitter), applied on live campaigns.
            </p>
          </section>
        </article>
      </main>

      <div className="print:hidden">
        <Footer profile={profile} />
      </div>
    </div>
  );
}
