import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const BASE_URL = 'https://rayix-ai.vercel.app';

export default function Layout({
  children,
  title = 'Rayix AI',
  description = 'Rayix AI — Discover 1000+ AI tools for developers, students, and businesses. Free AI prompt maker, foundation model database. Free forever.',
  keywords = 'AI tools, artificial intelligence tools, best AI tools 2026, free AI tools, AI tools directory, ChatGPT alternatives, AI image generators, AI coding tools, AI for students, AI for business',
  ogImage = '/og-image.png',
}) {
  const fullTitle = title === 'Rayix AI'
    ? 'Rayix AI — 1000+ AI Tools Directory | Free AI Tools 2026'
    : `${title} | Rayix AI`;

  const canonicalUrl = `${BASE_URL}`;

  return (
    <>
      <Head>
        {/* ─── Primary SEO ─────────────────────────────────────── */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Rayix AI" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* ─── Open Graph (Facebook, LinkedIn) ─────────────────── */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Rayix AI" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:image" content={`${BASE_URL}${ogImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* ─── Twitter Card ─────────────────────────────────────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rayixai" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${BASE_URL}${ogImage}`} />

        {/* ─── Structured Data — WebSite ────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Rayix AI",
              "description": "The most complete AI tools directory — 1000+ AI tools for developers, students, and businesses.",
              "url": BASE_URL,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${BASE_URL}/ai-tools?search={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Rayix AI",
                "url": BASE_URL,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${BASE_URL}/og-image.png`
                }
              }
            })
          }}
        />

        {/* ─── Structured Data — Organization ──────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Rayix AI",
              "url": BASE_URL,
              "description": "Rayix AI is the most complete AI tools directory with 1000+ tools across 36 categories.",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@rayix-ai.com",
                "contactType": "customer support"
              },
              "sameAs": [
                "https://twitter.com/rayixai"
              ]
            })
          }}
        />

        {/* ─── Favicon ──────────────────────────────────────────── */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
        <meta name="theme-color" content="#7c3aed" />
        <link rel="manifest" href="/manifest.json" />

        {/* ─── Fonts ────────────────────────────────────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background:'#0a0614', minHeight:'100vh', display:'flex', flexDirection:'column', color:'#f0ecff', fontFamily:"'DM Sans', sans-serif" }}>
        <Navbar />
        <main style={{ flex:1, paddingTop:64 }}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
