import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Girish Das — Full-Stack Engineer & Builder',
  description: 'Personal portfolio, engineering projects, experience, and writings of Girish Das.',
  authors: [{ name: 'Girish Das' }],
  metadataBase: new URL('https://girishdas.vercel.app'),
  openGraph: {
    title: 'Girish Das — Full-Stack Engineer & Builder',
    description: 'Personal portfolio, engineering projects, experience, and writings of Girish Das.',
    url: 'https://girishdas.vercel.app',
    siteName: 'Girish Das Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Girish Das — Full-Stack Engineer & Builder',
    description: 'Personal portfolio, engineering projects, experience, and writings of Girish Das.',
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
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#FAF8F5] text-[#0F0F10] antialiased selection:bg-[#FDE68A] selection:text-black">
        {children}
      </body>
    </html>
  );
}
