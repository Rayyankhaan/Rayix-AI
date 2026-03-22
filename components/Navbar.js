import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/ai-tools', label: 'AI Tools' },
  { href: '/ai-models', label: '🧬 Models' },
  { href: '/prompt-maker', label: '✨ Prompts' },
  { href: '/free-tools', label: 'Free Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/tutorials', label: 'Tutorials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(10,6,20,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      transition: 'all .3s',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 24 }}>🤖</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#f0ecff' }}>Rayix AI</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navLinks.map(link => {
            const active = router.pathname === link.href;
            return (
              <Link key={link.href} href={link.href} style={{
                color: active ? '#a78bfa' : '#8b7fa8',
                fontSize: 13, fontWeight: 500, textDecoration: 'none',
                padding: '7px 13px', borderRadius: 10, transition: 'all .2s',
                background: active ? 'rgba(167,139,250,0.1)' : 'transparent',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f0ecff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = active ? '#a78bfa' : '#8b7fa8'; e.currentTarget.style.background = active ? 'rgba(167,139,250,0.1)' : 'transparent'; }}>
                {link.label}
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}
