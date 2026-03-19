import Layout from '../../components/Layout';
import Link from 'next/link';

const devTools = [
  { name:'GitHub Copilot', desc:'AI pair programmer built into VS Code, JetBrains, and GitHub', free:false, logo:'👾', best:'Code autocomplete' },
  { name:'Cursor', desc:'AI-first code editor — chat with your codebase, generate code from descriptions', free:true, logo:'🖱️', best:'Agentic coding' },
  { name:'Claude API', desc:'Best LLM for code generation, analysis, and long-context tasks', free:false, logo:'🧠', best:'Code generation' },
  { name:'Bolt.new', desc:'Describe your app and get a fully working full-stack app instantly', free:true, logo:'⚡', best:'App generation' },
  { name:'v0.dev', desc:'Generate React/Next.js UI components from text descriptions', free:true, logo:'▲', best:'UI generation' },
  { name:'Ollama', desc:'Run LLMs locally — Llama 3, Mistral, Phi-3 with no internet required', free:true, logo:'🦙', best:'Local AI' },
  { name:'LangChain', desc:'Build LLM-powered applications with chains, agents, and RAG', free:true, logo:'🔗', best:'LLM apps' },
  { name:'Groq', desc:'Fastest LLM inference API — run Llama at 500+ tokens/second free', free:true, logo:'⚡', best:'Fast inference' },
  { name:'Dify', desc:'Build AI chatbots and agents with a visual drag-and-drop interface', free:true, logo:'✨', best:'No-code AI apps' },
  { name:'Pinecone', desc:'Managed vector database for production RAG applications', free:true, logo:'🌲', best:'Vector search' },
];

export default function AIToolsDevelopers() {
  return (
    <Layout
      title="20 Best AI Tools for Developers & Programmers in 2026"
      description="The best AI tools for developers in 2026 — AI code assistants, LLM frameworks, local AI, vector databases, and API tools. Free and paid options."
      keywords="AI tools for developers, best AI coding tools 2026, AI code assistant, GitHub Copilot alternatives, AI programming tools, LangChain, Cursor AI, Ollama, free AI developer tools"
    >
      <div style={{ background:'linear-gradient(135deg,#0f0c29,#0a1a2e)', padding:'56px 24px 40px', textAlign:'center', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(26px,5vw,44px)', fontWeight:800, color:'#f0ecff', marginBottom:12, letterSpacing:'-.02em' }}>
          20 Best AI Tools for Developers in 2026
        </h1>
        <p style={{ color:'#8b7fa8', fontSize:15, maxWidth:520, margin:'0 auto' }}>
          AI coding assistants, LLM frameworks, local AI runners, and APIs — the complete developer toolkit.
        </p>
      </div>

      <div style={{ maxWidth:760, margin:'0 auto', padding:'48px 24px 80px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
          {devTools.map((t, i) => (
            <div key={i} style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'16px 20px', display:'flex', alignItems:'center', gap:14 }}>
              <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:16, color:'#6366f1', minWidth:28, textAlign:'center' }}>#{i+1}</span>
              <span style={{ fontSize:24 }}>{t.logo}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, color:'#f0ecff' }}>{t.name}</span>
                  <span style={{ background:'rgba(99,102,241,0.15)', color:'#a5b4fc', fontSize:10, padding:'2px 7px', borderRadius:6, fontWeight:600 }}>{t.best}</span>
                </div>
                <div style={{ color:'#8b7fa8', fontSize:12 }}>{t.desc}</div>
              </div>
              <span style={{ color: t.free?'#10b981':'#f97316', fontSize:11, fontWeight:700, flexShrink:0 }}>{t.free?'FREE':'PAID'}</span>
            </div>
          ))}
        </div>

        <div style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, padding:'28px', textAlign:'center' }}>
          <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:18, color:'#f0ecff', marginBottom:10 }}>Browse All Developer AI Tools</h3>
          <Link href="/ai-tools?category=Coding" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#1d4ed8,#6366f1)', color:'#fff', textDecoration:'none', padding:'11px 24px', borderRadius:10, fontSize:13, fontWeight:700 }}>
            Browse Coding AI Tools →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
