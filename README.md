# 🤖 Rayix AI — AI Tools Directory

A modern, full-featured AI tools directory built with Next.js 14, React, and Tailwind CSS.

---

## 🚀 Features

- **1000+ AI Tools Listed** — ChatGPT, Claude, Midjourney, Sora, Cursor, ElevenLabs, and every major AI tool
- **Advanced Search & Filtering** — Search by name, description, or tag; filter by 34+ categories
- **AI Prompt Maker** — 8 specialized builders for image, video, coding, audio & more
- **AI Models Database** — Every major foundation model
- **6 Free Browser Tools** — Password Generator, QR Code Generator, Word Counter, and more
- **Blog & Tutorials** — AI news, comparisons, and step-by-step guides
- **Fully Responsive** — Mobile, tablet, and desktop
- **GDPR Compliant** — Cookie consent banner, privacy-first Analytics loading

---

## 📁 Project Structure

```
Rayix-AI/
├── components/
│   ├── Layout.js           # Page wrapper with SEO meta
│   ├── Navbar.js           # Responsive navigation
│   ├── Footer.js           # Footer with live newsletter form
│   ├── ToolCard.js         # Reusable AI tool card
│   └── CookieConsent.js    # GDPR cookie consent banner
├── data/
│   └── aiTools.js
├── pages/
│   ├── api/
│   │   ├── contact.js      # Contact form API (rate-limited, validated)
│   │   └── subscribe.js    # Newsletter subscription API (rate-limited)
│   └── ... (all pages)
├── .env.local.example      # Copy to .env.local and fill in values
└── next.config.js          # Security headers + CSP
```

---

## ⚙️ Setup

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your Formspree endpoints and GA ID
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `FORMSPREE_ENDPOINT` | Formspree URL for the contact form |
| `FORMSPREE_NEWSLETTER_ENDPOINT` | Formspree URL for newsletter |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID (optional) |

Get Formspree endpoints at [formspree.io](https://formspree.io) — free tier covers 50 submissions/month.

---

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add env vars from `.env.local.example` in the Vercel dashboard
4. Deploy

---

## 🔒 Security Features

| Feature | Status |
|---------|--------|
| Content Security Policy (CSP) | ✅ `next.config.js` |
| Contact form — real API backend | ✅ `pages/api/contact.js` |
| Rate limiting (5 submissions/hr/IP) | ✅ |
| Input sanitization & validation | ✅ |
| Newsletter rate limiting | ✅ |
| External links `rel="noopener noreferrer"` | ✅ |
| Personal email hidden from public UI | ✅ |
| GDPR cookie consent banner | ✅ `CookieConsent.js` |
| Analytics consent-gated | ✅ |

---

Built by Rayyan Khan

---

## 🏗️ Tech Stack

- **Framework**: Next.js 14
- **UI**: React 18
- **Styling**: Tailwind CSS 3
- **Icons**: Custom emoji-based
- **Fonts**: Sora (Google Fonts)
- **QR API**: QR Server (free)
- **URL API**: TinyURL (free)

---

Built by Rayyan Khan 
