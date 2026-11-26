import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Girish Das (Rick) — Performance & Digital Marketing Executive',
  description: 'Personal website, paid media projects, digital marketing notes, and résumé of Girish Das (Rick).',
  authors: [{ name: 'Girish Das' }],
  metadataBase: new URL('https://hellorick.vercel.app'),
  openGraph: {
    title: 'Girish Das (Rick) — Performance & Digital Marketing Executive',
    description: 'Personal website, paid media projects, digital marketing notes, and résumé of Girish Das (Rick).',
    url: 'https://hellorick.vercel.app',
    siteName: 'Girish Das (Rick)',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Girish Das (Rick) — Performance & Digital Marketing Executive',
    description: 'Personal website, paid media projects, digital marketing notes, and résumé of Girish Das (Rick).',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#FBF9F5] text-[#1C1917] font-sans antialiased selection:bg-[#F6E2A5] selection:text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}
