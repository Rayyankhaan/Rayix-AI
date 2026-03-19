import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';
import { aiTools } from '../data/aiTools';
import { faqs } from '../data/startup';

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], animId;
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    function init() {
      particles = Array.from({ length: 90 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 2 + .5, opacity: Math.random() * .5 + .2,
        color: Math.random() > .5 ? '124,58,237' : '99,102,241',
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(99,102,241,0.04)'; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) { ctx.strokeStyle = `rgba(124,58,237,${(.15*(1-d/120)).toFixed(3)})`; ctx.lineWidth=.5; ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke(); }
        }
      }
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`; ctx.fill();
      });
      const t = Date.now() / 4000;
      [[W*.25,H*.35,200,'124,58,237'],[W*.75,H*.6,160,'99,102,241'],[W*.1,H*.8,120,'6,182,212']].forEach(([ox,oy,or2,col]) => {
        const gx=ox+Math.sin(t)*40, gy=oy+Math.cos(t*.7)*25;
        const g=ctx.createRadialGradient(gx,gy,0,gx,gy,or2);
        g.addColorStop(0,`rgba(${col},0.07)`); g.addColorStop(1,`rgba(${col},0)`);
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(gx,gy,or2,0,Math.PI*2); ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    resize(); init(); draw();
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />;
}

function MarqueeRow({ tools, reverse = false }) {
  const doubled = [...tools, ...tools];
  return (
    <div style={{ overflow:'hidden', maskImage:'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)' }} aria-hidden="true">
      <div style={{ display:'flex', gap:16, width:'max-content', animation:`${reverse?'marqueeRev':'marquee'} 32s linear infinite` }}>
        {doubled.map((t, i) => (
          <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
            style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'14px 18px', display:'flex', alignItems:'center', gap:10, flexShrink:0, textDecoration:'none', transition:'all .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.borderColor='rgba(124,58,237,0.4)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';}}>
            <div style={{width:36,height:36,borderRadius:10,background:t.color+'22',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{t.logo}</div>
            <div>
              <div style={{color:'#f0ecff',fontSize:13,fontWeight:700,fontFamily:'Syne,sans-serif'}}>{t.name}</div>
              <div style={{color:'#8b7fa8',fontSize:11}}>{t.category}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ background:'#1a1330', border:`1px solid ${open?'rgba(124,58,237,0.4)':'rgba(255,255,255,0.06)'}`, borderRadius:16, padding:'20px 24px', cursor:'pointer', transition:'all .3s' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:16 }}>
        <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:15, color:'#f0ecff' }}>{q}</span>
        <span style={{ color:'#a78bfa', fontSize:20, transform:open?'rotate(45deg)':'none', transition:'transform .3s', flexShrink:0 }}>+</span>
      </div>
      {open && <p style={{ color:'#8b7fa8', fontSize:14, lineHeight:1.7, marginTop:12 }}>{a}</p>}
    </div>
  );
}

const features = [
  { icon:'🎨', title:'AI Prompt Maker', desc:'8 specialized builders — image, video, coding, audio & more. Generate perfect prompts in seconds.' },
  { icon:'🔍', title:'Smart Directory', desc:'Filter 1000+ tools by category, price, and rating. Find what you need instantly.' },
  { icon:'💰', title:'Find Free Alternatives', desc:'We track pricing so you always know what\'s free vs paid. Save hundreds per month.' },
  { icon:'⚡', title:'Always Updated', desc:'New AI tools added every week. Be first to discover what\'s next before everyone else.' },
  { icon:'🛠️', title:'Free Browser Tools', desc:'6 built-in utilities — word counter, JSON formatter, color picker, and more.' },
  { icon:'🧬', title:'AI Models Database', desc:'Every major foundation model — GPT-4o, Claude, Llama, FLUX, Sora, AlphaFold and more.' },
];

const faqData = [
  { q:'Is Rayix AI free?', a:'Yes — completely free. No signup, no login, no credit card. Browse all 656+ tools and use the prompt maker freely.' },
  { q:'What is the AI Prompt Maker?', a:'8 specialized prompt builders for Midjourney, Sora, Cursor, ElevenLabs, Jasper, and more — each with smart fields that build the perfect prompt.' },
  { q:'How often are tools added?', a:'New AI tools are added every week. We track 656+ tools across 34 categories and update pricing and ratings regularly.' },
  { q:'What is the AI Models section?', a:'A complete database of every major AI model — GPT-4o, Claude, Llama, FLUX, Sora, AlphaFold — with parameters, context length, papers, and links.' },
];

export default function HomePage() {
  const featuredTools = aiTools.filter(t => t.featured).slice(0, 8);
  const row1 = aiTools.filter(t => t.featured).slice(0, 8);
  const row2 = aiTools.filter(t => t.featured).slice(4, 12);


  return (
    <Layout
      title="Rayix AI — 1000+ AI Tools Directory"
      description="Discover and compare 1000+ AI tools for developers, students, and businesses. Best AI tools for image generation, coding, writing, video, audio — all free. No signup needed."
      keywords="AI tools directory, best AI tools 2026, free AI tools, AI tools for developers, AI tools for students, AI image generators, AI coding tools, ChatGPT alternatives, Midjourney alternatives, AI writing tools, artificial intelligence tools list"
    >
      <style>{`
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes marqueeRev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        .a1{animation:fadeUp .9s .05s ease both}
        .a2{animation:fadeUp .9s .15s ease both}
        .a3{animation:fadeUp .9s .25s ease both}
        .a4{animation:fadeUp .9s .35s ease both}
        .feat-card{transition:transform .3s,border-color .3s}
        .feat-card:hover{transform:translateY(-6px)!important;border-color:rgba(124,58,237,0.35)!important}
      `}</style>
      <div style={{ background:'#0a0614', color:'#f0ecff', fontFamily:"'DM Sans',sans-serif" }}>

        {/* HERO */}
        <section style={{ position:'relative', minHeight:580, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 24px 60px', overflow:'hidden' }}>
          <ParticleCanvas />
          <div style={{ position:'relative', zIndex:10 }}>
            <div className="a1" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', color:'#c4b5fd', borderRadius:100, padding:'6px 18px', fontSize:12, fontWeight:500, letterSpacing:'.04em', marginBottom:28 }}>
              ✦ 1000+ AI Tools · Free Forever
            </div>
            <h1 className="a2" style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(40px,8vw,80px)', fontWeight:800, lineHeight:1.05, letterSpacing:'-.03em', marginBottom:24 }}>
              The AI Tools<br />
              <span style={{ background:'linear-gradient(135deg,#a78bfa,#6366f1,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Universe</span>
            </h1>
            <p className="a3" style={{ fontSize:'clamp(16px,2vw,20px)', color:'#8b7fa8', maxWidth:520, lineHeight:1.7, margin:'0 auto 40px', fontWeight:300 }}>
              Discover and compare 1000+AI tools for image, video, code, audio and more — completely free, no signup needed
            </p>
            <div className="a4" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/ai-tools" style={{ background:'linear-gradient(135deg,#7c3aed,#6366f1)', color:'#fff', textDecoration:'none', padding:'15px 36px', borderRadius:14, fontSize:15, fontWeight:600, boxShadow:'0 0 40px rgba(99,102,241,0.4)', transition:'all .2s' }}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 0 60px rgba(99,102,241,0.6)';e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow='0 0 40px rgba(99,102,241,0.4)';e.currentTarget.style.transform='none';}}>
                Explore 1000+ Tools
              </Link>
              <Link href="/prompt-maker" style={{ background:'rgba(255,255,255,0.07)', color:'#f0ecff', textDecoration:'none', padding:'15px 36px', borderRadius:14, fontSize:15, fontWeight:600, border:'1px solid rgba(255,255,255,0.12)', transition:'all .2s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.12)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.07)'}>
                Try Prompt Maker →
              </Link>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', padding:'0 24px 60px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          {[['1000+','AI Tools Listed'],['34','Categories'],['40+','AI Models'],['Free','No Login Needed']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center', padding:'16px 36px', borderRight:'1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontFamily:'Syne,sans-serif', fontSize:32, fontWeight:800, background:'linear-gradient(135deg,#a78bfa,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{n}</div>
              <div style={{ fontSize:12, color:'#8b7fa8', marginTop:4, letterSpacing:'.04em' }}>{l}</div>
            </div>
          ))}
        </section>

        {/* MARQUEE */}
        <section style={{ padding:'60px 0', display:'flex', flexDirection:'column', gap:16, overflow:'hidden' }}>
          <MarqueeRow tools={row1} />
          <MarqueeRow tools={row2} reverse />
        </section>

        {/* FEATURES */}
        <section style={{ padding:'60px 40px 80px', maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ fontSize:11, letterSpacing:'.1em', color:'#8b7fa8', textTransform:'uppercase', marginBottom:12 }}>Why Rayix AI</div>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(28px,4vw,44px)', fontWeight:800, letterSpacing:'-.02em' }}>
              Everything to master{' '}
              <span style={{ background:'linear-gradient(135deg,#a78bfa,#6366f1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>AI tools</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
            {features.map((f,i) => (
              <div key={i} className="feat-card" style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.06)', borderRadius:20, padding:28, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(124,58,237,0.5),transparent)' }} />
                <div style={{ fontSize:30, marginBottom:14 }}>{f.icon}</div>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:16, marginBottom:8, color:'#f0ecff' }}>{f.title}</div>
                <div style={{ fontSize:13, color:'#8b7fa8', lineHeight:1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TOP TOOLS */}
        <section style={{ padding:'0 40px 80px', maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:28, fontWeight:800, letterSpacing:'-.02em' }}>Top AI Tools</h2>
            <Link href="/ai-tools" style={{ color:'#a78bfa', fontSize:14, textDecoration:'none', fontWeight:500 }}>View all 656+ →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
            {featuredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding:'0 40px 80px', maxWidth:700, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ fontSize:11, letterSpacing:'.1em', color:'#8b7fa8', textTransform:'uppercase', marginBottom:12 }}>FAQ</div>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(24px,4vw,36px)', fontWeight:800, letterSpacing:'-.02em' }}>Common questions</h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {faqData.map((f,i) => <FAQ key={i} q={f.q} a={f.a} />)}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section style={{ position:'relative', overflow:'hidden', textAlign:'center', padding:'80px 24px 100px', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%,rgba(124,58,237,0.12),transparent 70%)' }} />
          <div style={{ position:'relative', zIndex:10 }}>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(32px,5vw,52px)', fontWeight:800, letterSpacing:'-.03em', marginBottom:16 }}>
              Start exploring the{' '}
              <span style={{ background:'linear-gradient(135deg,#a78bfa,#6366f1,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>AI universe</span>
            </h2>
            <p style={{ color:'#8b7fa8', fontSize:18, marginBottom:40, fontWeight:300 }}>1000+ tools, 40+ AI models, prompt builder — all free.</p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/ai-tools" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#7c3aed,#6366f1)', color:'#fff', textDecoration:'none', padding:'16px 40px', borderRadius:16, fontSize:16, fontWeight:600, boxShadow:'0 0 60px rgba(99,102,241,0.45)', transition:'all .2s' }}>
                Browse AI Tools ✦
              </Link>
              <Link href="/ai-models" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.07)', color:'#f0ecff', textDecoration:'none', padding:'16px 40px', borderRadius:16, fontSize:16, fontWeight:600, border:'1px solid rgba(255,255,255,0.12)', transition:'all .2s' }}>
                🧬 Explore AI Models
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
