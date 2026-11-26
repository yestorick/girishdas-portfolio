'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  logoText?: string;
  avatarUrl?: string;
  statusBadge?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'GD';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Navbar({
  logoText = 'Girish Das',
  avatarUrl = '',
  statusBadge = 'Open to opportunities',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayName = logoText.replace(/^\[|\]$/g, '').trim() || 'Girish Das';
  const initials = getInitials(displayName);
  const cleanStatus = statusBadge.trim();

  const navLinks = [
    { label: 'Now', href: '/#now' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Projects', href: '/#work' },
    { label: 'Stack', href: '/#stack' },
    { label: 'Blog', href: '/#blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#1C1917]/10">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left Header: Round Profile Picture + Availability Pill */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity"
          aria-label={cleanStatus ? `${displayName} — ${cleanStatus}` : displayName}
        >
          <div className="w-9 h-9 rounded-full border-[1.5px] border-[#292524] bg-[#F5F2EB] overflow-hidden shrink-0 flex items-center justify-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-display font-bold text-xs text-[#1C1917] tracking-tight">
                {initials}
              </span>
            )}
          </div>

          {cleanStatus && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4F1E7] border border-[#292524]/40 text-[#1E5631] whitespace-nowrap">
              <span
                className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"
                aria-hidden="true"
              />
              <span>{cleanStatus}</span>
            </span>
          )}
        </Link>

        {/* Single Responsive Nav Landmark */}
        <nav aria-label="Main navigation" className="flex items-center">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#57534E] hover:text-[#1C1917] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C84B31] hover:after:w-full after:transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-[#292524]/40 bg-white hover:bg-[#F5F2EB] transition-colors text-[#1C1917]"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-t border-[#1C1917]/10 bg-[#FBF9F5] px-4 py-4 space-y-2 shadow-sm"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2.5 px-3 text-sm font-semibold text-[#1C1917] hover:bg-[#F5F2EB] rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
