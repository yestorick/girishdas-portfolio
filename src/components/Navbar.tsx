'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  logoText?: string;
}

export default function Navbar({ logoText = '[GIRISH DAS]' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Now', href: '#now' },
    { label: 'Experience', href: '#experience' },
    { label: 'Stack', href: '#stack' },
    { label: 'Work', href: '#work' },
    { label: 'Favourites', href: '#favourites' },
    { label: 'Blog', href: '#blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b-2 border-black/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="font-mono font-bold tracking-wider text-base sm:text-lg hover:opacity-80 transition-opacity"
        >
          {logoText}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#333336] hover:text-black transition-colors hover:underline underline-offset-4 decoration-2 decoration-black"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="neo-btn bg-[#FFC4B0] text-black px-3.5 py-1.5 rounded-full text-xs font-semibold"
          >
            Get in touch
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg border-2 border-black bg-white shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b-2 border-black bg-[#FAF8F5] px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-[#222] py-2 border-b border-black/10"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block text-center neo-btn bg-[#E54830] text-white py-2 rounded-full text-sm font-bold shadow-brutal"
          >
            Say hello
          </a>
        </div>
      )}
    </header>
  );
}
