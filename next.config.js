/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      {
        // Apply security headers to all pages EXCEPT sitemap/robots
        source: '/((?!sitemap.xml|robots.txt).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://www.youtube.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://img.youtube.com https://i.ytimg.com https://*.google.com https://*.googleapis.com https://*.gstatic.com",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://formspree.io",
              "connect-src 'self' https://formspree.io https://www.google-analytics.com https://vitals.vercel-insights.com",
            ].join('; '),
          },
        ],
      },
      // Sitemap — no CSP, pure XML
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Content-Type', value: 'application/xml; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, s-maxage=3600' },
        ],
      },
      // Robots — plain text
      {
        source: '/robots.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain' },
          { key: 'Cache-Control', value: 'public, s-maxage=86400' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/tools',   destination: '/ai-tools',    permanent: true },
      { source: '/models',  destination: '/ai-models',   permanent: true },
      { source: '/prompts', destination: '/prompt-maker', permanent: true },
    ];
  },
};
module.exports = nextConfig;
