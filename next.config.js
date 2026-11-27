/** @type {import('next').NextConfig} */
const adminSecurityHeaders = [
  {
    key: 'X-Robots-Tag',
    value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
  },
  {
    key: 'Cache-Control',
    value: 'no-store, no-cache, must-revalidate, private',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'none'",
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
];

const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/admin': ['./supabase/*.sql'],
  },
  async headers() {
    return [
      {
        source: '/admin',
        headers: adminSecurityHeaders,
      },
      {
        source: '/admin/:path*',
        headers: adminSecurityHeaders,
      },
      {
        source: '/api/admin/:path*',
        headers: adminSecurityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
