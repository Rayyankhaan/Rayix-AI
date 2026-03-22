const BASE = 'https://rayix-ai.vercel.app';

const staticPages = [
  { url: '/',                            priority: '1.0', changefreq: 'daily'   },
  { url: '/ai-tools',                    priority: '0.9', changefreq: 'daily'   },
  { url: '/ai-models',                   priority: '0.9', changefreq: 'weekly'  },
  { url: '/prompt-maker',                priority: '0.9', changefreq: 'weekly'  },
  { url: '/free-tools',                  priority: '0.8', changefreq: 'weekly'  },
  { url: '/blog',                        priority: '0.8', changefreq: 'daily'   },
  { url: '/blog/best-ai-tools-2026',     priority: '0.8', changefreq: 'weekly'  },
  { url: '/blog/free-ai-tools-students', priority: '0.8', changefreq: 'weekly'  },
  { url: '/blog/ai-tools-developers',    priority: '0.8', changefreq: 'weekly'  },
  { url: '/tutorials',                   priority: '0.7', changefreq: 'weekly'  },
  { url: '/contact',                     priority: '0.5', changefreq: 'monthly' },
  { url: '/privacy',                     priority: '0.3', changefreq: 'monthly' },
  { url: '/terms',                       priority: '0.3', changefreq: 'monthly' },
];

export default function Sitemap() { return null; }

export async function getServerSideProps({ res }) {
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url>
    <loc>${BASE}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, s-maxage=3600');
  res.write(xml);
  res.end();

  return { props: {} };
}
