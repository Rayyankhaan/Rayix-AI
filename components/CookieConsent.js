import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('rayix_cookie_consent');
      if (!consent) setVisible(true);
    } catch {}
  }, []);

  const accept = () => {
    try { localStorage.setItem('rayix_cookie_consent', 'accepted'); } catch {}
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem('rayix_cookie_consent', 'declined'); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position:'fixed', bottom:20, left:20, right:20, zIndex:9999,
      maxWidth:520, margin:'0 auto',
      background:'#1a1330', border:'1px solid rgba(124,58,237,0.3)',
      borderRadius:16, padding:'20px 24px',
      boxShadow:'0 8px 40px rgba(0,0,0,0.5)',
      display:'flex', flexDirection:'column', gap:14,
    }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
        <span style={{ fontSize:24, flexShrink:0 }}>🍪</span>
        <div>
          <div style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:14, color:'#f0ecff', marginBottom:6 }}>
            We use cookies
          </div>
          <p style={{ color:'#8b7fa8', fontSize:12, lineHeight:1.6, margin:0 }}>
            We use cookies for analytics and advertising (Google AdSense). By accepting, you consent to our use of cookies as described in our{' '}
            <a href="/privacy" style={{ color:'#a78bfa', textDecoration:'underline' }}>Privacy Policy</a>.
            You can decline non-essential cookies.
          </p>
        </div>
      </div>
      <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
        <button onClick={decline}
          style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'8px 16px', color:'#8b7fa8', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
          Decline
        </button>
        <button onClick={accept}
          style={{ background:'linear-gradient(135deg,#7c3aed,#6366f1)', border:'none', borderRadius:8, padding:'8px 20px', color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
          Accept All
        </button>
      </div>
    </div>
  );
}
