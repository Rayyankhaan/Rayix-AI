import { useState } from 'react';
import Layout from '../components/Layout';

const tutorials = [
  { emoji:'🚀', title:'Getting Started with ChatGPT', level:'Beginner', duration:'18 min', desc:'Learn the basics of prompting ChatGPT for productivity, writing, and coding tasks.', tags:['ChatGPT','Basics'], youtubeId:'JTxsNm9IdYU', channel:'Dave Nick' },
  { emoji:'🎨', title:'Mastering Midjourney Prompts', level:'Intermediate', duration:'20 min', desc:'Write better prompts in Midjourney to generate stunning AI art consistently.', tags:['Midjourney','Art'], youtubeId:'9WVZbitXbck', channel:'Kevin Stratvert' },
  { emoji:'👨‍💻', title:'Build Apps Faster with Cursor AI', level:'Intermediate', duration:'25 min', desc:'Use Cursor AI editor to build full-stack apps 10x faster with AI assistance.', tags:['Cursor','Coding'], youtubeId:'gqUQbjsYZLQ', channel:'Traversy Media' },
  { emoji:'🎙️', title:'Voice Cloning with ElevenLabs', level:'Beginner', duration:'12 min', desc:'Create realistic AI voices and clone your own voice with ElevenLabs in minutes.', tags:['ElevenLabs','Audio'], youtubeId:'2prWUSejDcM', channel:'The Bhavya Sha' },
  { emoji:'📝', title:'AI Content Strategy with Claude', level:'Intermediate', duration:'18 min', desc:'Use Claude to build a full content calendar and write SEO articles at scale.', tags:['Claude','Writing'], youtubeId:'eorc3jLBqIA', channel:'Zubair Trabzada' },
  { emoji:'🤖', title:'Build an AI Agent with AutoGPT', level:'Advanced', duration:'35 min', desc:'Set up and run AutoGPT to automate complex multi-step tasks autonomously.', tags:['AutoGPT','Agents'], youtubeId:'bJ2LLsssnzQ', channel:'Auto GPT' },
  { emoji:'🎬', title:'Text to Video with Runway AI', level:'Beginner', duration:'14 min', desc:'Create cinematic AI videos from text prompts using Runway Gen-3 Alpha.', tags:['Runway','Video'], youtubeId:'cZVg4cUpD04', channel:'Howfinity' },
  { emoji:'📊', title:'AI-Powered SEO with Surfer', level:'Intermediate', duration:'22 min', desc:'Optimize your blog posts for search engines using Surfer SEO + AI writing.', tags:['Surfer SEO','SEO'], youtubeId:'bGUsrXJEFFE', channel:'Dave Swift' },
  { emoji:'🔮', title:'Calling the Claude API', level:'Advanced', duration:'30 min', desc:'Integrate Claude into your app using the Anthropic API — with live code examples.', tags:['API','Developer'], youtubeId:'Ejr0VUucg3U', channel:'Leonardo Grigorio' },
  { emoji:'🦙', title:'Run Llama 3 Locally with Ollama', level:'Intermediate', duration:'15 min', desc:'Install and run Meta\'s Llama 3 completely offline on your Mac or Windows PC.', tags:['Llama','Local AI'], youtubeId:'h_GTxRFYETY', channel:'Matt Williams' },
  { emoji:'⚡', title:'LangChain Full Course for Beginners', level:'Advanced', duration:'45 min', desc:'Build LLM-powered apps with LangChain — chains, agents, RAG, and memory.', tags:['LangChain','Developer'], youtubeId:'lG7Uxts9SXs', channel:'freeCodeCamp' },
  { emoji:'🌊', title:'Stable Diffusion Complete Guide', level:'Intermediate', duration:'40 min', desc:'Master Stable Diffusion — install, prompt engineering, ControlNet, and LoRAs.', tags:['Stable Diffusion','Image'], youtubeId:'QdRP9pO89MY', channel:'Render Realm' },
];

const levelConfig = {
  Beginner:     { color:'#10b981', bg:'rgba(16,185,129,0.12)', border:'rgba(16,185,129,0.25)', dot:'🟢' },
  Intermediate: { color:'#3b82f6', bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.25)', dot:'🔵' },
  Advanced:     { color:'#a855f7', bg:'rgba(168,85,247,0.12)', border:'rgba(168,85,247,0.25)', dot:'🟣' },
};

function VideoModal({ tutorial, onClose }) {
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:16, background:'rgba(0,0,0,0.9)', backdropFilter:'blur(8px)' }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:'100%', maxWidth:780, background:'#1a1330', borderRadius:20, overflow:'hidden', border:'1px solid rgba(255,255,255,0.1)' }}>
        {/* Modal header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
          <div>
            <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:16, color:'#f0ecff', margin:0, marginBottom:4 }}>{tutorial.title}</h3>
            <p style={{ color:'#8b7fa8', fontSize:12, margin:0 }}>by {tutorial.channel} · ⏱ {tutorial.duration}</p>
          </div>
          <button onClick={onClose} style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', color:'#8b7fa8', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>

        {/* Video */}
        <div style={{ position:'relative', width:'100%', paddingTop:'56.25%' }}>
          <iframe style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
            src={`https://www.youtube.com/embed/${tutorial.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={tutorial.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen />
        </div>

        {/* Modal footer */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px', borderTop:'1px solid rgba(255,255,255,0.07)', background:'rgba(0,0,0,0.2)', flexWrap:'wrap', gap:10 }}>
          <div style={{ display:'flex', gap:6 }}>
            {tutorial.tags.map(tag => (
              <span key={tag} style={{ background:'rgba(255,255,255,0.06)', color:'#8b7fa8', fontSize:11, padding:'3px 8px', borderRadius:6 }}>#{tag}</span>
            ))}
          </div>
          <a href={`https://www.youtube.com/watch?v=${tutorial.youtubeId}`} target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', gap:6, background:'#dc2626', color:'#fff', textDecoration:'none', padding:'8px 16px', borderRadius:10, fontSize:12, fontWeight:700 }}>
            ▶ Open in YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TutorialsPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? tutorials : tutorials.filter(t => t.level === filter);

  return (
    <Layout title="AI Video Tutorials" description="Curated YouTube tutorials for every major AI tool — ChatGPT, Midjourney, Cursor, Claude, Stable Diffusion, LangChain and more.">
      {selected && <VideoModal tutorial={selected} onClose={() => setSelected(null)} />}

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0f0c29,#1a0840,#0f0c29)', padding:'56px 24px 40px', textAlign:'center', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(220,38,38,0.15)', border:'1px solid rgba(220,38,38,0.3)', color:'#fca5a5', borderRadius:100, padding:'5px 16px', fontSize:12, marginBottom:16 }}>
          📺 Curated YouTube Tutorials
        </div>
        <h1 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(28px,5vw,48px)', fontWeight:800, color:'#f0ecff', marginBottom:10, letterSpacing:'-.02em' }}>
          AI Video Tutorials
        </h1>
        <p style={{ color:'#8b7fa8', fontSize:16, maxWidth:480, margin:'0 auto 24px' }}>
          Handpicked YouTube tutorials for every major AI tool — beginner to advanced, all in one place.
        </p>

        {/* Stats */}
        <div style={{ display:'flex', justifyContent:'center', gap:32, flexWrap:'wrap' }}>
          {[['12+','Tutorials'],['3','Levels'],['Free','Always']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:24, background:'linear-gradient(135deg,#a78bfa,#06b6d4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{n}</div>
              <div style={{ color:'#8b7fa8', fontSize:12 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'32px 16px 80px' }}>

        {/* Filter pills */}
        <div style={{ display:'flex', justifyContent:'center', gap:10, marginBottom:32, flexWrap:'wrap' }}>
          {['All','Beginner','Intermediate','Advanced'].map(lvl => (
            <button key={lvl} onClick={() => setFilter(lvl)}
              style={{ padding:'8px 20px', borderRadius:100, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', transition:'all .2s', border:'none',
                background: filter===lvl ? 'linear-gradient(135deg,#7c3aed,#6366f1)' : 'rgba(255,255,255,0.05)',
                color: filter===lvl ? '#fff' : '#8b7fa8',
              }}>
              {lvl !== 'All' && levelConfig[lvl]?.dot + ' '}{lvl}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))', gap:20 }}>
          {filtered.map((t, i) => {
            const lc = levelConfig[t.level];
            return (
              <div key={i} onClick={() => setSelected(t)}
                style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, overflow:'hidden', cursor:'pointer', transition:'all .3s' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='rgba(124,58,237,0.3)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow='none'; }}>

                {/* Thumbnail */}
                <div style={{ position:'relative', overflow:'hidden' }}>
                  <img src={`https://img.youtube.com/vi/${t.youtubeId}/maxresdefault.jpg`} alt={t.title}
                    style={{ width:'100%', height:180, objectFit:'cover', display:'block', transition:'transform .5s' }}
                    onError={e=>{ e.target.src=`https://img.youtube.com/vi/${t.youtubeId}/hqdefault.jpg`; }}
                    onMouseEnter={e=>e.target.style.transform='scale(1.05)'}
                    onMouseLeave={e=>e.target.style.transform='scale(1)'} />

                  {/* Play overlay */}
                  <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center', opacity:0, transition:'opacity .3s' }}
                    onMouseEnter={e=>e.currentTarget.style.opacity=1}
                    onMouseLeave={e=>e.currentTarget.style.opacity=0}>
                    <div style={{ width:56, height:56, background:'#dc2626', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, boxShadow:'0 0 30px rgba(220,38,38,0.5)' }}>▶</div>
                  </div>

                  {/* Badges */}
                  <div style={{ position:'absolute', top:10, left:10, background:'#dc2626', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:6 }}>▶ YouTube</div>
                  <div style={{ position:'absolute', bottom:10, right:10, background:'rgba(0,0,0,0.8)', color:'#fff', fontSize:11, fontFamily:'monospace', padding:'3px 8px', borderRadius:6 }}>{t.duration}</div>
                </div>

                {/* Content */}
                <div style={{ padding:'16px 18px' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                    <span style={{ background:lc.bg, border:`1px solid ${lc.border}`, color:lc.color, fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:100 }}>
                      {lc.dot} {t.level}
                    </span>
                    <span style={{ color:'#8b7fa8', fontSize:11 }}>📺 {t.channel}</span>
                  </div>

                  <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:8 }}>
                    <span style={{ fontSize:22, flexShrink:0 }}>{t.emoji}</span>
                    <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:14, color:'#f0ecff', margin:0, lineHeight:1.4 }}>{t.title}</h3>
                  </div>

                  <p style={{ color:'#8b7fa8', fontSize:12, lineHeight:1.6, margin:'0 0 12px' }}>{t.desc}</p>

                  <div style={{ display:'flex', gap:5, marginBottom:14, flexWrap:'wrap' }}>
                    {t.tags.map(tag => (
                      <span key={tag} style={{ background:'rgba(255,255,255,0.05)', color:'#8b7fa8', fontSize:10, padding:'3px 8px', borderRadius:6 }}>#{tag}</span>
                    ))}
                  </div>

                  <button style={{ width:'100%', padding:'10px', borderRadius:12, border:'none', background:'rgba(220,38,38,0.15)', color:'#fca5a5', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}
                    onMouseEnter={e=>{ e.currentTarget.style.background='#dc2626'; e.currentTarget.style.color='#fff'; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background='rgba(220,38,38,0.15)'; e.currentTarget.style.color='#fca5a5'; }}>
                    ▶ Watch Tutorial
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop:52, background:'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(99,102,241,0.08))', border:'1px solid rgba(124,58,237,0.2)', borderRadius:20, padding:'36px 32px', textAlign:'center' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>📺</div>
          <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:20, color:'#f0ecff', marginBottom:8 }}>Want More AI Tutorials?</h3>
          <p style={{ color:'#8b7fa8', fontSize:14, marginBottom:24 }}>We curate the best AI tutorials every week. Browse all AI topics on YouTube.</p>
          <a href="https://www.youtube.com/results?search_query=ai+tools+tutorial+2026" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#dc2626', color:'#fff', textDecoration:'none', padding:'12px 28px', borderRadius:12, fontSize:14, fontWeight:700, transition:'all .2s' }}
            onMouseEnter={e=>e.currentTarget.style.background='#b91c1c'}
            onMouseLeave={e=>e.currentTarget.style.background='#dc2626'}>
            ▶ Browse More on YouTube →
          </a>
        </div>
      </div>
    </Layout>
  );
}
