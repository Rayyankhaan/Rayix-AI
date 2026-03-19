/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // CSP — allows Google Fonts, AdSense, Analytics, YouTube embeds
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://www.youtube.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://img.youtube.com https://i.ytimg.com https://*.google.com https://*.googleapis.com",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://formspree.io",
              "connect-src 'self' https://formspree.io https://www.google-analytics.com https://vitals.vercel-insights.com",
            ].join('; '),
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/tools', destination: '/ai-tools', permanent: true },
      { source: '/models', destination: '/ai-models', permanent: true },
      { source: '/prompts', destination: '/prompt-maker', permanent: true },
    ];
  },
};
module.exports = nextConfig;
