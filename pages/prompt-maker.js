import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

const promptCategories = [
  { id:'image',label:'Image Prompt',icon:'🎨',color:'#7c3aed',bg:'from-purple-600 to-pink-600',desc:'Midjourney, DALL-E, Flux, Stable Diffusion',fields:[{key:'subject',label:'Subject / Main Idea',placeholder:'A futuristic city at sunset',type:'text',required:true},{key:'style',label:'Art Style',type:'select',options:['Photorealistic','Digital Art','Oil Painting','Watercolor','Anime / Manga','Cinematic','3D Render','Pencil Sketch','Cyberpunk','Studio Ghibli']},{key:'mood',label:'Mood',type:'select',options:['Epic','Serene','Mysterious','Dramatic','Cheerful','Dark','Ethereal','Romantic','Futuristic']},{key:'lighting',label:'Lighting',type:'select',options:['Golden hour','Neon lights','Studio lighting','Dramatic shadows','Moonlight','Sunrise','God rays','Bioluminescent']},{key:'quality',label:'Quality Tags',type:'multicheck',options:['8K ultra HD','Highly detailed','Masterpiece','Award winning','Sharp focus','Intricate details']},{key:'negative',label:'Negative Prompt',placeholder:'blurry, text, watermark',type:'text'}]},
  { id:'chatbot',label:'ChatGPT / Claude',icon:'💬',color:'#10a37f',bg:'from-emerald-600 to-teal-600',desc:'ChatGPT, Claude, Gemini, Grok',fields:[{key:'role',label:'AI Role',placeholder:'You are an expert marketing consultant...',type:'text',required:true},{key:'task',label:'Task',placeholder:'Help me write a product launch campaign',type:'text',required:true},{key:'context',label:'Context',placeholder:'My product is a SaaS tool for small teams...',type:'textarea'},{key:'tone',label:'Tone',type:'select',options:['Professional','Casual','Academic','Persuasive','Humorous','Direct']},{key:'format',label:'Output Format',type:'select',options:['Bullet points','Numbered list','Detailed essay','Table','Step-by-step','Short summary','JSON','Markdown']},{key:'constraint',label:'What to Avoid',placeholder:'Avoid jargon, no competitor mentions',type:'text'}]},
  { id:'writing',label:'Writing / Content',icon:'✍️',color:'#d97706',bg:'from-amber-600 to-orange-600',desc:'Jasper, Copy.ai, Writesonic',fields:[{key:'contentType',label:'Content Type',type:'select',options:['Blog post','Social media post','Email newsletter','Product description','Ad copy','YouTube script','LinkedIn post','Landing page copy'],required:true},{key:'topic',label:'Topic',placeholder:'10 tips to improve productivity with AI',type:'text',required:true},{key:'audience',label:'Target Audience',placeholder:'Startup founders, 25-40, tech-savvy',type:'text'},{key:'writingTone',label:'Tone',type:'select',options:['Informative','Persuasive','Conversational','Professional','Witty','Inspiring']},{key:'wordCount',label:'Word Count',type:'select',options:['~100 words','~300 words','~500 words','~800 words','~1200 words','~2000 words']},{key:'seo',label:'SEO Keywords',placeholder:'AI tools, best AI tools 2026',type:'text'}]},
  { id:'video',label:'Video Prompt',icon:'🎬',color:'#dc2626',bg:'from-red-600 to-orange-600',desc:'Sora, Runway, Kling, Luma',fields:[{key:'scene',label:'Scene Description',placeholder:'A drone flying over misty mountains at dawn',type:'text',required:true},{key:'cameraMotion',label:'Camera Movement',type:'select',options:['Static shot','Slow zoom in','Pan left','Dolly forward','Orbit shot','Drone aerial','Tracking shot','Time lapse']},{key:'duration',label:'Duration',type:'select',options:['5 seconds','10 seconds','15 seconds','30 seconds cinematic']},{key:'videoStyle',label:'Style',type:'select',options:['Photorealistic 4K','Cinematic film','Anime','3D animated','Documentary','Sci-fi']},{key:'sound',label:'Audio Cue',placeholder:'Epic orchestral music, birds chirping',type:'text'}]},
  { id:'coding',label:'Coding Prompt',icon:'👨‍💻',color:'#1d4ed8',bg:'from-blue-700 to-indigo-700',desc:'Cursor, Copilot, Bolt.new, v0',fields:[{key:'task',label:'What to Build',placeholder:'A React dashboard with sales charts',type:'text',required:true},{key:'language',label:'Stack',type:'select',options:['JavaScript / React','TypeScript / Next.js','Python / FastAPI','Node.js / Express','Vue.js','Flutter','Swift iOS','Go','Rust']},{key:'features',label:'Key Features',placeholder:'Auth, dark mode, responsive, real-time',type:'textarea'},{key:'styling',label:'Styling',type:'select',options:['Tailwind CSS','CSS Modules','Material UI','Shadcn/ui','Bootstrap']},{key:'database',label:'Backend',type:'select',options:['None','Supabase','Firebase','PostgreSQL + Prisma','MongoDB','REST API']},{key:'codeStyle',label:'Code Style',type:'select',options:['Clean production-ready','With comments','With unit tests','Minimal']}]},
  { id:'audio',label:'Voice / Music',icon:'🎵',color:'#ec4899',bg:'from-pink-600 to-rose-600',desc:'ElevenLabs, Suno, Udio',fields:[{key:'audioType',label:'Audio Type',type:'select',options:['Voice narration / TTS','Full song with lyrics','Instrumental background','Sound effect','Podcast intro','Ad jingle'],required:true},{key:'genre',label:'Genre',type:'select',options:['Pop','Hip-hop','EDM / Electronic','Lo-fi chill','Classical','Jazz','Rock','Ambient','Cinematic / Epic']},{key:'voiceType',label:'Voice Type',type:'select',options:['Deep male narrator','Warm female narrator','Young energetic','British accent','Calm & soothing']},{key:'mood2',label:'Mood',type:'select',options:['Happy & uplifting','Melancholic','Epic & powerful','Relaxing','Mysterious','Motivational']},{key:'lyrics',label:'Lyrics / Script',placeholder:'Paste your lyrics or script here...',type:'textarea'}]},
  { id:'business',label:'Business / Marketing',icon:'📊',color:'#0891b2',bg:'from-cyan-600 to-blue-600',desc:'HubSpot AI, Jasper, Copy.ai',fields:[{key:'bizTask',label:'Business Task',type:'select',options:['Marketing strategy','Sales email sequence','Social media strategy','Business plan','Competitor analysis','Customer persona','SWOT analysis','Pitch deck content'],required:true},{key:'industry',label:'Industry',placeholder:'SaaS, E-commerce, Healthcare',type:'text'},{key:'company',label:'Company / Product',placeholder:'Our app helps freelancers track invoices',type:'text'},{key:'goal',label:'Goal',type:'select',options:['Increase sales','Generate leads','Build brand awareness','Launch product','Reduce churn']},{key:'kpi',label:'Success Metrics',placeholder:'1000 signups, 20% conversion',type:'text'}]},
  { id:'app',label:'App / Product',icon:'📱',color:'#059669',bg:'from-emerald-600 to-green-600',desc:'Bolt.new, v0, Framer, Lovable',fields:[{key:'appIdea',label:'App Idea / Name',placeholder:'A habit tracker app called StreakAI',type:'text',required:true},{key:'appType',label:'App Type',type:'select',options:['Web App','Mobile App','Chrome Extension','SaaS Platform','Landing Page','E-commerce Store','Dashboard']},{key:'targetUser',label:'Target User',placeholder:'Busy professionals who want to build habits',type:'text'},{key:'coreFeatures',label:'Core Features',placeholder:'1. Daily habit check-in\n2. Streak tracking\n3. AI motivation messages',type:'textarea'},{key:'design',label:'Design Style',type:'select',options:['Clean & minimal','Dark mode','Colorful & playful','Corporate','Glass morphism']},{key:'techStack',label:'Tech Stack',type:'select',options:['Next.js + Tailwind','React + Firebase','Vue + Supabase','Flutter','React Native','No code preferred']}]},
];

function FieldRenderer({ field, value, onChange }) {
  const style = { width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'10px 14px', color:'#f0ecff', fontSize:13, fontFamily:'inherit', outline:'none' };
  if (field.type==='text') return <input type="text" placeholder={field.placeholder} value={value||''} onChange={e=>onChange(field.key,e.target.value)} style={style} />;
  if (field.type==='textarea') return <textarea placeholder={field.placeholder} value={value||''} onChange={e=>onChange(field.key,e.target.value)} rows={3} style={{...style,resize:'none'}} />;
  if (field.type==='select') return (<select value={value||''} onChange={e=>onChange(field.key,e.target.value)} style={{...style,cursor:'pointer'}}><option value="">— Select —</option>{field.options.map(o=><option key={o} value={o}>{o}</option>)}</select>);
  if (field.type==='multicheck') {
    const sel=value?value.split(', ').filter(Boolean):[];
    const toggle=opt=>{const n=sel.includes(opt)?sel.filter(s=>s!==opt):[...sel,opt];onChange(field.key,n.join(', '));};
    return (<div style={{display:'flex',flexWrap:'wrap',gap:8}}>{field.options.map(opt=>(<button key={opt} type="button" onClick={()=>toggle(opt)} style={{padding:'6px 12px',borderRadius:8,fontSize:12,fontWeight:600,border:`1.5px solid ${sel.includes(opt)?'#7c3aed':'rgba(255,255,255,0.1)'}`,background:sel.includes(opt)?'#7c3aed':'transparent',color:sel.includes(opt)?'#fff':'#8b7fa8',cursor:'pointer',fontFamily:'inherit'}}>{opt}</button>))}</div>);
  }
  return null;
}

function buildPrompt(cat, v) {
  switch(cat.id) {
    case 'image': { const p=[]; if(v.subject)p.push(v.subject); if(v.style)p.push(v.style+' style'); if(v.mood)p.push(v.mood+' mood'); if(v.lighting)p.push(v.lighting+' lighting'); if(v.quality)p.push(v.quality); let r=p.join(', '); if(v.negative)r+='\n\nNegative prompt: '+v.negative; return r; }
    case 'video': return [v.scene,v.cameraMotion&&'Camera: '+v.cameraMotion,v.videoStyle&&'Style: '+v.videoStyle,v.duration&&'Duration: '+v.duration,v.sound&&'Audio: '+v.sound].filter(Boolean).join('. ');
    case 'chatbot': return [(v.role&&v.role+'.\n\n'),(v.task&&'Task: '+v.task+'\n\n'),(v.context&&'Context: '+v.context+'\n\n'),(v.tone&&'Tone: '+v.tone+'. '),(v.format&&'Format: '+v.format+'. '),(v.constraint&&'\nAvoid: '+v.constraint)].filter(Boolean).join('').trim();
    case 'writing': return [(v.contentType&&'Write a '+v.contentType),(v.topic&&' about: "'+v.topic+'"\n\n'),(v.audience&&'Audience: '+v.audience+'\n'),(v.writingTone&&'Tone: '+v.writingTone+'\n'),(v.wordCount&&'Length: '+v.wordCount+'\n'),(v.seo&&'SEO keywords: '+v.seo)].filter(Boolean).join('').trim();
    case 'coding': return [v.task&&'Build: '+v.task+'\n',v.language&&'Stack: '+v.language+'\n',v.styling&&'Styling: '+v.styling+'\n',v.database&&'Backend: '+v.database+'\n',v.features&&'\nFeatures:\n'+v.features+'\n',v.codeStyle&&'Style: '+v.codeStyle].filter(Boolean).join('').trim();
    case 'audio': return [v.audioType&&'Create: '+v.audioType+'\n',v.genre&&'Genre: '+v.genre+'\n',v.voiceType&&'Voice: '+v.voiceType+'\n',v.mood2&&'Mood: '+v.mood2+'\n',v.lyrics&&'\nScript:\n'+v.lyrics].filter(Boolean).join('').trim();
    case 'business': return [v.bizTask&&'Task: '+v.bizTask+'\n',v.company&&'Company: '+v.company+'\n',v.industry&&'Industry: '+v.industry+'\n',v.goal&&'Goal: '+v.goal+'\n',v.kpi&&'KPIs: '+v.kpi].filter(Boolean).join('').trim();
    case 'app': return [v.appIdea&&'App: '+v.appIdea+'\n',v.appType&&'Type: '+v.appType+'\n',v.targetUser&&'User: '+v.targetUser+'\n',v.design&&'Design: '+v.design+'\n',v.techStack&&'Stack: '+v.techStack+'\n',v.coreFeatures&&'\nFeatures:\n'+v.coreFeatures].filter(Boolean).join('').trim();
    default: return '';
  }
}

export default function PromptMakerPage() {
  const [activeCat, setActiveCat] = useState('image');
  const [values, setValues] = useState({});
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const cat = promptCategories.find(c => c.id === activeCat);
  const setValue = (k, v) => { setValues(p=>({...p,[k]:v})); setGenerated(''); };

  const generate = () => {
    const prompt = buildPrompt(cat, values);
    if (!prompt.trim()) { alert('Please fill in the required fields.'); return; }
    setGenerated(prompt);
    setHistory(h=>[{id:Date.now(),category:cat.label,icon:cat.icon,prompt,createdAt:new Date().toLocaleTimeString()},...h].slice(0,20));
  };

  const copy = () => { navigator.clipboard.writeText(generated); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  return (
    <Layout title="AI Prompt Maker — Free" description="Generate perfect prompts for any AI tool — 8 categories, completely free">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', padding:'60px 24px 40px', textAlign:'center' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', borderRadius:100, padding:'5px 16px', fontSize:12, color:'#e0d7ff', marginBottom:20 }}>✨ Free AI Prompt Generator</div>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(32px,6vw,52px)', fontWeight:800, color:'#fff', marginBottom:12, letterSpacing:'-.02em' }}>AI Prompt Maker</h1>
        <p style={{ color:'#a78bfa', fontSize:16, maxWidth:480, margin:'0 auto' }}>Perfect prompts for any AI tool — 8 categories, completely free, no login needed.</p>
      </div>

      <div style={{ background:'#0a0614', minHeight:'60vh', padding:'32px 16px 60px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>

          {/* Category grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))', gap:10, marginBottom:32 }}>
            {promptCategories.map(c => (
              <button key={c.id} onClick={()=>{setActiveCat(c.id);setValues({});setGenerated('');}}
                style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'14px 8px', borderRadius:16, border:`2px solid ${activeCat===c.id?'transparent':'rgba(255,255,255,0.08)'}`, background:activeCat===c.id?`linear-gradient(135deg,${c.color},${c.color}99)`:'rgba(255,255,255,0.03)', color:activeCat===c.id?'#fff':'#8b7fa8', cursor:'pointer', transition:'all .2s', fontFamily:'inherit', transform:activeCat===c.id?'scale(1.05)':'none' }}>
                <span style={{ fontSize:24 }}>{c.icon}</span>
                <span style={{ fontSize:11, fontWeight:700, textAlign:'center', lineHeight:1.2 }}>{c.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:24 }}>

            {/* Form */}
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ background:`linear-gradient(135deg,${cat.color},${cat.color}88)`, borderRadius:16, padding:'16px 20px', display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize:28 }}>{cat.icon}</span>
                <div>
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:18, color:'#fff' }}>{cat.label}</div>
                  <div style={{ color:'rgba(255,255,255,0.7)', fontSize:12 }}>{cat.desc}</div>
                </div>
              </div>

              <div style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:24, display:'flex', flexDirection:'column', gap:18 }}>
                {cat.fields.map(field => (
                  <div key={field.key}>
                    <label style={{ display:'block', fontSize:12, fontWeight:700, color:'#8b7fa8', marginBottom:8, letterSpacing:'.04em', textTransform:'uppercase' }}>
                      {field.label}{field.required&&<span style={{color:'#f87171',marginLeft:4}}>*</span>}
                    </label>
                    <FieldRenderer field={field} value={values[field.key]} onChange={setValue} />
                  </div>
                ))}
                <div style={{ display:'flex', gap:10, paddingTop:8 }}>
                  <button onClick={generate}
                    style={{ flex:1, padding:'14px', borderRadius:12, border:'none', background:`linear-gradient(135deg,${cat.color},${cat.color}99)`, color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'all .2s' }}>
                    ✨ Generate Prompt
                  </button>
                  <button onClick={()=>{setValues({});setGenerated('');}}
                    style={{ padding:'14px 18px', borderRadius:12, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'#8b7fa8', fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Output */}
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:20, position:'sticky', top:80 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'#f0ecff', fontSize:14 }}>Output</span>
                  {generated && (
                    <button onClick={copy} style={{ padding:'6px 14px', borderRadius:8, border:'none', background:copied?'#10b98122':'rgba(255,255,255,0.08)', color:copied?'#10b981':'#8b7fa8', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                      {copied?'✅ Copied!':'📋 Copy'}
                    </button>
                  )}
                </div>
                {generated ? (
                  <div style={{ background:'#0d0a1f', borderRadius:10, padding:16, fontFamily:'monospace', fontSize:13, color:'#a78bfa', lineHeight:1.7, whiteSpace:'pre-wrap', wordBreak:'break-word', minHeight:150, maxHeight:400, overflowY:'auto' }}>
                    {generated}
                  </div>
                ) : (
                  <div style={{ background:'rgba(255,255,255,0.02)', border:'2px dashed rgba(255,255,255,0.08)', borderRadius:10, padding:40, textAlign:'center', minHeight:150, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8 }}>
                    <span style={{ fontSize:36 }}>{cat.icon}</span>
                    <p style={{ color:'#8b7fa8', fontSize:13 }}>Fill the fields → click Generate</p>
                  </div>
                )}
                {generated && <div style={{ textAlign:'center', color:'#8b7fa8', fontSize:11, marginTop:8 }}>{generated.length} characters</div>}
              </div>

              {/* History */}
              {history.length > 0 && (
                <div style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:16 }}>
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'#f0ecff', fontSize:13, marginBottom:12 }}>🕐 History</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8, maxHeight:240, overflowY:'auto' }}>
                    {history.map(item => (
                      <div key={item.id} onClick={()=>setGenerated(item.prompt)}
                        style={{ padding:10, background:'rgba(255,255,255,0.03)', borderRadius:10, cursor:'pointer', transition:'background .2s' }}
                        onMouseEnter={e=>e.currentTarget.style.background='rgba(124,58,237,0.1)'}
                        onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.03)'}>
                        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                          <span style={{ fontSize:14 }}>{item.icon}</span>
                          <span style={{ fontSize:11, fontWeight:600, color:'#a78bfa' }}>{item.category}</span>
                          <span style={{ fontSize:10, color:'#8b7fa8', marginLeft:'auto' }}>{item.createdAt}</span>
                        </div>
                        <p style={{ fontSize:11, color:'#8b7fa8', margin:0, fontFamily:'monospace', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{item.prompt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
