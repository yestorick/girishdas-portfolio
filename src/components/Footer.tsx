import { SiteProfile } from '@/lib/types';
import { Mail, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

interface FooterProps {
  profile: SiteProfile;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#141416] text-white mt-16 pt-16 pb-12 border-t-4 border-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-6 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Let&apos;s build something together.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {profile.footer_tagline ||
              'Open for contract opportunities, high-growth engineering teams, and collaborative product builds.'}
          </p>

          {/* Email CTA Button */}
          <div className="pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="neo-btn inline-flex items-center gap-2.5 bg-[#E54830] text-white px-6 py-3 rounded-full text-sm font-bold shadow-brutal hover:bg-[#d03d27]"
            >
              <Mail className="w-4 h-4" />
              <span>{profile.email}</span>
            </a>
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center space-x-6">
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
            {profile.twitter_url && (
              <a
                href={profile.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>X / Twitter</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
            <a
              href="#now"
              className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
