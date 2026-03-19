import { useState } from 'react';
import Layout from '../components/Layout';

const S = {
  input: { width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'12px 16px', color:'#f0ecff', fontSize:14, fontFamily:'inherit', outline:'none', transition:'border-color .2s' },
  label: { display:'block', fontSize:12, fontWeight:700, color:'#8b7fa8', letterSpacing:'.05em', textTransform:'uppercase', marginBottom:8 },
};

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'', honeypot:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { icon:'📧', label:'General Inquiries', value:'Use the form →', href:'#form', desc:'We reply within 24 hours', color:'#6366f1' },
    { icon:'🚀', label:'Submit Your AI Tool', value:'Get listed for free', href:'#form', desc:'Send us your tool details', color:'#10b981' },
    { icon:'🤝', label:'Partnerships', value:'Sponsored listings', href:'#form', desc:'Reach 50K+ AI enthusiasts', color:'#f59e0b' },
  ];

  return (
    <Layout title="Contact Us" description="Contact Rayix AI — submit an AI tool, report an issue, or partner with us.">
      <div style={{ background:'linear-gradient(135deg,#0f0c29,#1a0f3a)', padding:'56px 24px 40px', textAlign:'center', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize:48, marginBottom:16 }}>✉️</div>
        <h1 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(28px,5vw,48px)', fontWeight:800, color:'#f0ecff', marginBottom:10, letterSpacing:'-.02em' }}>Get in Touch</h1>
        <p style={{ color:'#8b7fa8', fontSize:16, maxWidth:440, margin:'0 auto' }}>Questions, tool submissions, or partnerships — fill the form below.</p>
      </div>

      <div style={{ maxWidth:1000, margin:'0 auto', padding:'48px 24px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:28 }}>

          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:16, color:'#f0ecff', marginBottom:4 }}>Contact Info</h2>
            {cards.map(c => (
              <div key={c.label} style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'18px 20px', transition:'all .3s' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=c.color+'55'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.transform='none'; }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:c.color+'22', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:13, color:'#f0ecff', marginBottom:3 }}>{c.label}</div>
                    <div style={{ fontSize:12, color:c.color, fontWeight:600, marginBottom:3 }}>{c.value}</div>
                    <div style={{ fontSize:11, color:'#8b7fa8' }}>{c.desc}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.2)', borderRadius:16, padding:'16px 20px', marginTop:4 }}>
              <div style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:13, color:'#c4b5fd', marginBottom:6 }}>⏰ Response Time</div>
              <p style={{ color:'#8b7fa8', fontSize:12, lineHeight:1.6, margin:0 }}>
                We typically respond within <span style={{ color:'#f0ecff', fontWeight:600 }}>24–48 hours</span> on business days.
              </p>
            </div>
          </div>

          <div id="form" style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, padding:'32px' }}>
            {submitted ? (
              <div style={{ textAlign:'center', padding:'40px 20px' }}>
                <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
                <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:24, color:'#f0ecff', marginBottom:8 }}>Message Sent!</h3>
                <p style={{ color:'#8b7fa8', fontSize:14, marginBottom:24 }}>Thanks for reaching out. We'll reply within 24–48 hours.</p>
                <button onClick={()=>{ setSubmitted(false); setForm({name:'',email:'',subject:'',message:'',honeypot:''}); }}
                  style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, padding:'10px 24px', color:'#f0ecff', fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:20, color:'#f0ecff', marginBottom:24 }}>Send a Message</h2>
                {error && (
                  <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:10, padding:'12px 16px', color:'#fca5a5', fontSize:13, marginBottom:20 }}>
                    ❌ {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                  {/* Honeypot — hidden from humans, catches bots */}
                  <input type="text" name="honeypot" value={form.honeypot} onChange={e=>setForm(f=>({...f,honeypot:e.target.value}))}
                    style={{ display:'none' }} tabIndex={-1} autoComplete="off" />

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                    <div>
                      <label style={S.label}>Your Name *</label>
                      <input type="text" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your name" required style={S.input}
                        onFocus={e=>e.target.style.borderColor='rgba(124,58,237,0.5)'}
                        onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                    </div>
                    <div>
                      <label style={S.label}>Email Address *</label>
                      <input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="you@example.com" required style={S.input}
                        onFocus={e=>e.target.style.borderColor='rgba(124,58,237,0.5)'}
                        onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                    </div>
                  </div>
                  <div>
                    <label style={S.label}>Subject *</label>
                    <select value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} required style={{...S.input, cursor:'pointer'}}>
                      <option value="">Select a subject...</option>
                      {['General Question','Submit an AI Tool','Report Incorrect Info','Partnership / Sponsorship','Bug Report','Other'].map(s=>(
                        <option key={s} value={s} style={{ background:'#1a1330' }}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={S.label}>Message *</label>
                    <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Tell us how we can help..." rows={6} required
                      style={{...S.input, resize:'none', lineHeight:1.6}}
                      onFocus={e=>e.target.style.borderColor='rgba(124,58,237,0.5)'}
                      onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'} />
                    <div style={{ textAlign:'right', fontSize:11, color:'#8b7fa8', marginTop:4 }}>{form.message.length}/2000</div>
                  </div>
                  <div style={{ display:'flex', justifyContent:'flex-end' }}>
                    <button type="submit" disabled={loading}
                      style={{ background:'linear-gradient(135deg,#7c3aed,#6366f1)', border:'none', borderRadius:12, padding:'12px 28px', color:'#fff', fontSize:14, fontWeight:700, cursor:loading?'not-allowed':'pointer', fontFamily:'inherit', opacity:loading?.7:1 }}>
                      {loading ? '⏳ Sending...' : '📧 Send Message'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
