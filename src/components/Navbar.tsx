'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  logoText?: string;
  avatarUrl?: string;
  statusBadge?: string;
}

export default function Navbar({
  logoText = 'Girish Das',
  avatarUrl = '',
  statusBadge = 'Open to opportunities',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayName = logoText.replace(/^\[|\]$/g, '').trim() || 'Girish Das';

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
        {/* Left Header: Round Profile Picture + "Open to opportunities" Pill */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity"
          aria-label={`${displayName} — ${statusBadge}`}
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
                GD
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E4F1E7] border border-[#292524]/40 text-[#1E5631] whitespace-nowrap">
            <span
              className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0"
              aria-hidden="true"
            />
            <span>{statusBadge || 'Open to opportunities'}</span>
          </span>
        </Link>

        {/* Desktop Semantic Navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[#57534E] hover:text-[#1C1917] transition-colors py-1.5 hover:underline underline-offset-4 decoration-[#1C1917]/40"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-[#1C1917]/30 bg-white text-[#1C1917] hover:bg-[#F5F2EB] transition-colors shrink-0"
        >
          {isOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile Primary"
          className="md:hidden border-t border-[#1C1917]/10 bg-[#FBF9F5] px-4 py-4 shadow-sm"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium text-[#1C1917] py-2.5 px-2 rounded-lg hover:bg-[#F5F2EB] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-3 mt-2 border-t border-[#1C1917]/10">
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block text-center neo-btn bg-[#C84B31] text-white py-2.5 rounded-full text-sm font-semibold"
            >
              Contact me
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
