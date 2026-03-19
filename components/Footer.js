import Link from 'next/link';
import { useState } from 'react';

const links = {
  Product: [
    ['AI Tools Directory', '/ai-tools'],
    ['🧬 AI Models', '/ai-models'],
    ['✨ Prompt Maker', '/prompt-maker'],
    ['Free Utilities', '/free-tools'],
    ['Tutorials', '/tutorials'],
    ['Blog', '/blog'],
  ],
  Company: [
    ['Contact', '/contact'],
    ['Privacy Policy', '/privacy'],
    ['Terms of Service', '/terms'],
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Subscription failed');
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  return (
    <footer style={{ background:'#07040f', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:60, paddingBottom:32, marginTop:'auto' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:40, marginBottom:48 }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
              <span style={{ fontSize:24 }}>⚡</span>
              <span style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:18, color:'#f0ecff' }}>Rayix AI</span>
            </Link>
            <p style={{ color:'#8b7fa8', fontSize:13, lineHeight:1.7, marginBottom:16 }}>
              The most complete AI ecosystem directory. 1000+ tools across 36 categories — free forever.
            </p>
            <div style={{ display:'flex', gap:8 }}>
              {/* X link — update to real profile once registered */}
              <a href="https://x.com/rayixai" target="_blank" rel="noopener noreferrer"
                style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, textDecoration:'none', transition:'all .2s', color:'#8b7fa8' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(124,58,237,0.2)'; e.currentTarget.style.borderColor='rgba(124,58,237,0.4)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; }}>
                𝕏
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:12, color:'#f0ecff', marginBottom:16, letterSpacing:'.08em', textTransform:'uppercase' }}>{section}</h4>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10 }}>
                {items.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} style={{ color:'#8b7fa8', fontSize:13, textDecoration:'none', transition:'color .2s' }}
                      onMouseEnter={e=>e.currentTarget.style.color='#c4b5fd'}
                      onMouseLeave={e=>e.currentTarget.style.color='#8b7fa8'}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:12, color:'#f0ecff', marginBottom:16, letterSpacing:'.08em', textTransform:'uppercase' }}>Newsletter</h4>
            <p style={{ color:'#8b7fa8', fontSize:13, lineHeight:1.6, marginBottom:14 }}>Weekly AI discoveries. No spam, unsubscribe anytime.</p>
            {status === 'success' ? (
              <div style={{ background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.3)', borderRadius:12, padding:'12px 16px', color:'#10b981', fontSize:13, textAlign:'center' }}>
                🎉 Subscribed! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {/* Honeypot */}
                <input type="text" name="honeypot" style={{ display:'none' }} tabIndex={-1} autoComplete="off" />
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" required
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'10px 14px', color:'#f0ecff', fontSize:13, fontFamily:'inherit', outline:'none' }}
                  onFocus={e=>e.target.style.borderColor='rgba(124,58,237,0.5)'}
                  onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                {status === 'error' && <p style={{ color:'#fca5a5', fontSize:11, margin:0 }}>{errorMsg}</p>}
                <button type="submit" disabled={status==='loading'}
                  style={{ background:'linear-gradient(135deg,#7c3aed,#6366f1)', border:'none', borderRadius:10, padding:'10px', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', opacity:status==='loading'?.7:1 }}>
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe Free →'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:24, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <p style={{ color:'#4b5563', fontSize:12, margin:0 }}>
            © 2026 Rayix AI · Free forever
          </p>
          <div style={{ display:'flex', gap:20 }}>
            {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Contact', '/contact']].map(([l, h]) => (
              <Link key={h} href={h} style={{ color:'#4b5563', fontSize:12, textDecoration:'none' }}
                onMouseEnter={e=>e.currentTarget.style.color='#a78bfa'}
                onMouseLeave={e=>e.currentTarget.style.color='#4b5563'}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
