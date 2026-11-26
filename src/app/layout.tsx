import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import { getProfile } from '@/lib/data';
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

function resolveSiteUrl(raw?: string): URL {
  const candidate = (raw || 'https://hellorick.vercel.app').trim();
  const normalized = /^https?:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;
  try {
    return new URL(normalized);
  } catch {
    return new URL('https://hellorick.vercel.app');
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const fullName = profile.nickname
    ? `${profile.name} (${profile.nickname})`
    : profile.name;
  const title = profile.headline_highlight
    ? `${fullName} — ${profile.headline_highlight}`
    : fullName;
  const description = profile.bio;
  const siteUrl = resolveSiteUrl(profile.website_url);

  return {
    title,
    description,
    authors: [{ name: profile.name }],
    metadataBase: siteUrl,
    openGraph: {
      title,
      description,
      url: siteUrl.toString(),
      siteName: fullName,
      locale: 'en_US',
      type: 'website',
      ...(profile.avatar_url ? { images: [{ url: profile.avatar_url }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

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
    <html
      lang="en"
      className={`scroll-smooth ${plusJakarta.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-[#FBF9F5] text-[#1C1917] font-sans antialiased selection:bg-[#F6E2A5] selection:text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}
