import Layout from '../../components/Layout';
import Link from 'next/link';

const tools = [
  { name:'ChatGPT', use:'Homework help, essays, explanations', free:true, logo:'💬' },
  { name:'Claude', use:'Research, long documents, analysis', free:true, logo:'🧠' },
  { name:'Wolfram Alpha', use:'Math, science, step-by-step solutions', free:true, logo:'🐺' },
  { name:'Photomath', use:'Scan and solve math problems', free:true, logo:'📸' },
  { name:'Grammarly', use:'Grammar, spelling, writing improvement', free:true, logo:'✅' },
  { name:'Quizlet AI', use:'Flashcards, study guides, practice tests', free:true, logo:'📋' },
  { name:'NotebookLM', use:'Summarize textbooks and research papers', free:true, logo:'📓' },
  { name:'Perplexity AI', use:'Research with cited sources', free:true, logo:'🔍' },
  { name:'Consensus', use:'Find scientific evidence for papers', free:true, logo:'🤝' },
  { name:'Jenni AI', use:'Academic writing with citations', free:true, logo:'📚' },
];

export default function FreeAIToolsStudents() {
  return (
    <Layout
      title="25 Best Free AI Tools for Students in 2026"
      description="The best free AI tools every student should know in 2026. AI tools for homework, research, writing, math, and studying — all free, no credit card needed."
      keywords="free AI tools for students, AI tools for studying, AI homework help, free ChatGPT for students, AI for students 2026, best AI tools education"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "25 Best Free AI Tools for Students in 2026",
        "description": "The best free AI tools every student should use in 2026.",
        "author": { "@type": "Organization", "name": "Rayix AI" },
        "publisher": { "@type": "Organization", "name": "Rayix AI", "url": "https://rayix-ai.vercel.app" },
        "datePublished": "2026-02-15",
        "dateModified": new Date().toISOString(),
      }) }} />

      <div style={{ background:'linear-gradient(135deg,#0f0c29,#1a0f3a)', padding:'56px 24px 40px', textAlign:'center', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(26px,5vw,44px)', fontWeight:800, color:'#f0ecff', marginBottom:12, letterSpacing:'-.02em' }}>
          25 Best Free AI Tools for Students in 2026
        </h1>
        <p style={{ color:'#8b7fa8', fontSize:15, maxWidth:520, margin:'0 auto' }}>
          Free AI tools that help you study smarter, write better, and ace your exams — no credit card needed.
        </p>
      </div>

      <div style={{ maxWidth:760, margin:'0 auto', padding:'48px 24px 80px' }}>
        <div style={{ background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:16, padding:'20px 24px', marginBottom:36 }}>
          <p style={{ color:'#6ee7b7', fontWeight:700, fontSize:15, margin:'0 0 8px' }}>✅ All tools in this list are 100% free</p>
          <p style={{ color:'#8b7fa8', fontSize:13, margin:0, lineHeight:1.7 }}>
            No credit card, no signup walls. These are the best free AI tools for students at any level — high school, college, or university.
          </p>
        </div>

        <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:20, color:'#f0ecff', marginBottom:20 }}>Top 10 Free AI Tools for Students</h2>

        <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
          {tools.map((t, i) => (
            <div key={i} style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'16px 20px', display:'flex', alignItems:'center', gap:14 }}>
              <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:16, color:'#7c3aed', minWidth:28, textAlign:'center' }}>#{i+1}</span>
              <span style={{ fontSize:24 }}>{t.logo}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, color:'#f0ecff', marginBottom:3 }}>{t.name}</div>
                <div style={{ color:'#8b7fa8', fontSize:12 }}>{t.use}</div>
              </div>
              <span style={{ color:'#10b981', fontSize:11, fontWeight:700, background:'rgba(16,185,129,0.1)', padding:'3px 8px', borderRadius:6, flexShrink:0 }}>FREE</span>
            </div>
          ))}
        </div>

        <div style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, padding:'28px', textAlign:'center' }}>
          <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:18, color:'#f0ecff', marginBottom:10 }}>Find More AI Tools for Students</h3>
          <p style={{ color:'#8b7fa8', fontSize:14, marginBottom:20 }}>Browse our full directory — filter by "Education" category to find more student tools.</p>
          <Link href="/ai-tools?category=Education" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#7c3aed,#6366f1)', color:'#fff', textDecoration:'none', padding:'11px 24px', borderRadius:10, fontSize:13, fontWeight:700 }}>
            Browse Education AI Tools →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
