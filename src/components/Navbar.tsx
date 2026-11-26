'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  logoText?: string;
}

export default function Navbar({ logoText = 'GIRISH DAS' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Strip surrounding brackets if present in older DB seed so logo reads calmly
  const cleanLogo = logoText.replace(/^\[|\]$/g, '').trim() || 'GIRISH DAS';

  const navLinks = [
    { label: 'Now', href: '/#now' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Stack', href: '/#stack' },
    { label: 'Work', href: '/#work' },
    { label: 'Favourites', href: '/#favourites' },
    { label: 'Blog', href: '/#blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#1C1917]/10">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo matching wireframe "[YOUR NAME]." with single subtle accent dot */}
        <Link
          href="/"
          className="font-display font-bold tracking-tight text-base sm:text-lg text-[#1C1917] hover:opacity-80 transition-opacity shrink-0"
        >
          <span>{cleanLogo}</span>
          <span className="text-[#C84B31]" aria-hidden="true">.</span>
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

        {/* Mobile Menu Trigger (Accessible >= 40x40 target) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-[#1C1917]/30 bg-white text-[#1C1917] hover:bg-[#F5F2EB] transition-colors"
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
              Say hello
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
