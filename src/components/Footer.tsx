import Link from 'next/link';
import { SiteProfile } from '@/lib/types';
import { Mail, Github, Linkedin, Twitter, ArrowUp, FileText } from 'lucide-react';

interface FooterProps {
  profile: SiteProfile;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 w-full bg-[#18181B] text-white mt-14 pt-16 pb-12 border-t-2 border-[#292524]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-5 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-display">
            Let&apos;s connect.
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            {profile.footer_tagline ||
              'Always open to connecting with hiring teams, marketers, and founders about performance marketing roles and digital projects.'}
          </p>

          {/* Highlighted Email CTA Button */}
          <div className="pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="neo-btn inline-flex items-center gap-2.5 bg-[#C84B31] hover:bg-[#B03E26] text-white px-6 py-3 rounded-full text-sm font-semibold"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>{profile.email}</span>
            </a>
          </div>
        </div>

        {/* Bottom Socials, Resume & Copyright */}
        <div className="mt-14 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-300">
          <div className="flex items-center flex-wrap gap-6">
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1.5 py-1"
              >
                <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            )}
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1.5 py-1"
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                <span>GitHub</span>
              </a>
            )}
            {profile.twitter_url && (
              <a
                href={profile.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1.5 py-1"
              >
                <Twitter className="w-3.5 h-3.5" aria-hidden="true" />
                <span>X / Twitter</span>
              </a>
            )}
            <Link
              href="/resume"
              className="hover:text-white transition-colors inline-flex items-center gap-1.5 py-1"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Résumé</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span>
              © {new Date().getFullYear()} {profile.name}
              {profile.nickname ? ` (${profile.nickname})` : ''}. All rights reserved.
            </span>
            <a
              href="#now"
              aria-label="Back to top"
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-stone-200 transition-colors"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
