// This generates sitemap.xml at /sitemap.xml
import { aiTools } from '../data/aiTools';

const BASE = 'https://rayix-ai.vercel.app';

function generateSitemap() {
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/ai-tools', priority: '0.9', changefreq: 'daily' },
    { url: '/ai-models', priority: '0.9', changefreq: 'weekly' },
    { url: '/prompt-maker', priority: '0.9', changefreq: 'weekly' },
    { url: '/free-tools', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/tutorials', priority: '0.7', changefreq: 'weekly' },
    { url: '/contact', priority: '0.5', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.3', changefreq: 'monthly' },
    { url: '/terms', priority: '0.3', changefreq: 'monthly' },
  ];

  const toolPages = aiTools.map(tool => ({
    url: `/ai-tools?search=${encodeURIComponent(tool.name)}`,
    priority: tool.featured ? '0.8' : '0.6',
    changefreq: 'weekly',
  }));

  const allPages = [...staticPages, ...toolPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${BASE}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;
}

export default function SitemapXML() { return null; }

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(generateSitemap());
  res.end();
  return { props: {} };
}
