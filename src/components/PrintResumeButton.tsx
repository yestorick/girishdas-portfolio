'use client';

import { Printer } from 'lucide-react';

export default function PrintResumeButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="neo-btn inline-flex items-center gap-2 bg-[#C84B31] hover:bg-[#B03E26] text-white px-5 py-2 rounded-full text-xs sm:text-sm font-semibold print:hidden"
    >
      <Printer className="w-4 h-4" aria-hidden="true" />
      <span>Save as PDF / Print</span>
    </button>
  );
}
