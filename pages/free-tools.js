import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const S = {
  input: { width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, padding:'10px 14px', color:'#f0ecff', fontSize:13, fontFamily:'inherit', outline:'none' },
  btn: { background:'linear-gradient(135deg,#7c3aed,#6366f1)', border:'none', borderRadius:10, padding:'10px 16px', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', transition:'opacity .2s' },
  btnSm: { background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'6px 12px', color:'#c4b5fd', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit' },
  card: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'12px 14px' },
  mono: { background:'#0d0a1f', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'14px 16px', fontFamily:'monospace', fontSize:13, color:'#10b981', wordBreak:'break-all', minHeight:48 },
  label: { fontSize:11, fontWeight:700, color:'#8b7fa8', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8, display:'block' },
  row: { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 },
};

// ─── Password Generator ───────────────────────────────────────────────────────
function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper:true, lower:true, numbers:true, symbols:true });
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const sets = { upper:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower:'abcdefghijklmnopqrstuvwxyz', numbers:'0123456789', symbols:'!@#$%^&*()_+-=[]{}|;:,.<>?' };
    let chars='', req='';
    Object.keys(sets).forEach(k => { if(opts[k]){ chars+=sets[k]; req+=sets[k][Math.floor(Math.random()*sets[k].length)]; }});
    if(!chars){ setPassword('Select at least one option'); return; }
    let pass=req;
    for(let i=req.length;i<length;i++) pass+=chars[Math.floor(Math.random()*chars.length)];
    setPassword(pass.split('').sort(()=>Math.random()-.5).join(''));
    setCopied(false);
  };

  useEffect(()=>{ generate(); },[]);

  const copy = () => { navigator.clipboard.writeText(password); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  const strength = Math.min(4, Math.floor(length/8) + Object.values(opts).filter(Boolean).length - 1);
  const strengthLabel = ['Weak','Fair','Good','Strong','Very Strong'][strength];
  const strengthColor = ['#ef4444','#f97316','#eab308','#22c55e','#10b981'][strength];

  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <div style={{...S.mono, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <span style={{flex:1}}>{password || 'Click Generate'}</span>
        <button onClick={copy} style={S.btnSm}>{copied?'✅ Copied':'📋 Copy'}</button>
      </div>

      {password && password!=='Select at least one option' && (
        <div>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
            <span style={{fontSize:12,color:'#8b7fa8'}}>Strength</span>
            <span style={{fontSize:12,fontWeight:700,color:strengthColor}}>{strengthLabel}</span>
          </div>
          <div style={{height:6,borderRadius:3,background:'rgba(255,255,255,0.08)',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${(strength+1)*20}%`,background:strengthColor,borderRadius:3,transition:'all .3s'}}/>
          </div>
        </div>
      )}

      <div>
        <label style={S.label}>Length: {length}</label>
        <input type="range" min={8} max={64} value={length} onChange={e=>setLength(+e.target.value)} style={{width:'100%',accentColor:'#7c3aed'}} />
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {Object.entries({upper:'Uppercase A-Z',lower:'Lowercase a-z',numbers:'Numbers 0-9',symbols:'Symbols !@#$'}).map(([k,label])=>(
          <label key={k} style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',padding:'8px 12px',borderRadius:8,background:opts[k]?'rgba(124,58,237,0.15)':'rgba(255,255,255,0.03)',border:`1px solid ${opts[k]?'rgba(124,58,237,0.4)':'rgba(255,255,255,0.08)'}`}}>
            <input type="checkbox" checked={opts[k]} onChange={e=>setOpts(o=>({...o,[k]:e.target.checked}))} style={{accentColor:'#7c3aed'}} />
            <span style={{fontSize:12,color:opts[k]?'#c4b5fd':'#8b7fa8'}}>{label}</span>
          </label>
        ))}
      </div>

      <button onClick={generate} style={{...S.btn,width:'100%',padding:12,fontSize:14}}>🔐 Generate Password</button>
    </div>
  );
}

// ─── Word Counter ─────────────────────────────────────────────────────────────
function WordCounter() {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g,'').length;
  const sentences = text.split(/[.!?]+/).filter(s=>s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(p=>p.trim()).length;
  const readTime = Math.max(1, Math.ceil(words/200));

  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Type or paste your text here..."
        rows={8} style={{...S.input, resize:'vertical', lineHeight:1.6}} />
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
        {[['Words',words],['Characters',chars],['No Spaces',charsNoSpace],['Sentences',sentences],['Paragraphs',paragraphs||1],['Read Time',`${readTime} min`]].map(([l,v])=>(
          <div key={l} style={{...S.card, textAlign:'center'}}>
            <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:22,color:'#a78bfa'}}>{v}</div>
            <div style={{fontSize:11,color:'#8b7fa8',marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
      {text && <button onClick={()=>setText('')} style={S.btnSm}>Clear text</button>}
    </div>
  );
}

// ─── Color Picker ─────────────────────────────────────────────────────────────
function ColorPicker() {
  const [color, setColor] = useState('#7c3aed');
  const [copied, setCopied] = useState('');

  const hexToRgb = h => { const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return {r,g,b}; };
  const hexToHsl = h => {
    let {r,g,b}=hexToRgb(h); r/=255;g/=255;b/=255;
    const max=Math.max(r,g,b),min=Math.min(r,g,b); let h2,s,l=(max+min)/2;
    if(max===min){h2=s=0;}else{const d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h2=(g-b)/d+(g<b?6:0);break;case g:h2=(b-r)/d+2;break;default:h2=(r-g)/d+4;}h2/=6;}
    return {h:Math.round(h2*360),s:Math.round(s*100),l:Math.round(l*100)};
  };

  const rgb=hexToRgb(color), hsl=hexToHsl(color);
  const values = [
    ['HEX', color.toUpperCase()],
    ['RGB', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`],
    ['HSL', `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`],
  ];

  const copy = (val) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(()=>setCopied(''),2000); };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      <div style={{display:'flex',gap:16,alignItems:'center'}}>
        <input type="color" value={color} onChange={e=>setColor(e.target.value)}
          style={{width:80,height:80,borderRadius:16,border:'none',cursor:'pointer',background:'none',padding:0}} />
        <div style={{flex:1}}>
          <div style={{width:'100%',height:80,borderRadius:16,background:color,border:'1px solid rgba(255,255,255,0.1)',marginBottom:8}}/>
          <input type="text" value={color} onChange={e=>{if(/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value))setColor(e.target.value);}}
            style={{...S.input,fontFamily:'monospace'}} maxLength={7} />
        </div>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {values.map(([label, val])=>(
          <div key={label} style={{...S.card,...S.row}}>
            <div>
              <div style={{fontSize:10,color:'#8b7fa8',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase'}}>{label}</div>
              <div style={{fontFamily:'monospace',fontSize:13,color:'#f0ecff',marginTop:2}}>{val}</div>
            </div>
            <button onClick={()=>copy(val)} style={S.btnSm}>{copied===val?'✅':'📋'}</button>
          </div>
        ))}
      </div>

      <div>
        <label style={S.label}>Shades</label>
        <div style={{display:'flex',gap:4,height:40,borderRadius:10,overflow:'hidden'}}>
          {[90,75,60,45,30,20,10].map(l=>(
            <div key={l} title={`L: ${l}%`} onClick={()=>{setColor(`hsl(${hsl.h},${hsl.s}%,${l}%)`);}} style={{flex:1,background:`hsl(${hsl.h},${hsl.s}%,${l}%)`,cursor:'pointer',transition:'transform .2s'}}
              onMouseEnter={e=>e.currentTarget.style.transform='scaleY(1.1)'}
              onMouseLeave={e=>e.currentTarget.style.transform='scaleY(1)'}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── JSON Formatter ───────────────────────────────────────────────────────────
function JsonFormatter() {
  const [input, setInput] = useState('{"name":"Rayix AI","tools":1000,"free":true}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input),null,2)); setError(''); }
    catch(e){ setError(e.message); setOutput(''); }
  };

  const minify = () => {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError(''); }
    catch(e){ setError(e.message); setOutput(''); }
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <div>
        <label style={S.label}>Input JSON</label>
        <textarea value={input} onChange={e=>setInput(e.target.value)} rows={5}
          style={{...S.input,fontFamily:'monospace',resize:'vertical'}} placeholder="Paste JSON here..." />
      </div>
      <div style={{display:'flex',gap:8}}>
        <button onClick={format} style={{...S.btn,flex:1}}>✨ Format / Prettify</button>
        <button onClick={minify} style={{...S.btnSm,flex:1}}>📦 Minify</button>
      </div>
      {error && <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:10,padding:'10px 14px',color:'#fca5a5',fontSize:13}}>❌ {error}</div>}
      {output && (
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <label style={{...S.label,margin:0}}>Output</label>
            <button onClick={copy} style={S.btnSm}>{copied?'✅ Copied':'📋 Copy'}</button>
          </div>
          <pre style={{...S.mono,maxHeight:300,overflow:'auto',whiteSpace:'pre-wrap',wordBreak:'break-word'}}>{output}</pre>
        </div>
      )}
    </div>
  );
}

// ─── Base64 Encoder ───────────────────────────────────────────────────────────
function Base64Tool() {
  const [input, setInput] = useState('Hello, Rayix AI!');
  const [mode, setMode] = useState('encode');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      if(mode==='encode') setOutput(btoa(unescape(encodeURIComponent(input))));
      else setOutput(decodeURIComponent(escape(atob(input))));
      setError('');
    } catch(e){ setError('Invalid input for '+mode); setOutput(''); }
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <div style={{display:'flex',gap:8}}>
        {['encode','decode'].map(m=>(
          <button key={m} onClick={()=>setMode(m)}
            style={{...m===mode?S.btn:S.btnSm, flex:1, textTransform:'capitalize'}}>
            {m==='encode'?'🔐 Encode':'🔓 Decode'}
          </button>
        ))}
      </div>
      <div>
        <label style={S.label}>Input</label>
        <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4}
          style={{...S.input,fontFamily:'monospace',resize:'vertical'}} />
      </div>
      <button onClick={convert} style={{...S.btn,width:'100%'}}>Convert</button>
      {error && <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:10,padding:'10px 14px',color:'#fca5a5',fontSize:13}}>❌ {error}</div>}
      {output && (
        <div>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
            <label style={{...S.label,margin:0}}>Output</label>
            <button onClick={copy} style={S.btnSm}>{copied?'✅ Copied':'📋 Copy'}</button>
          </div>
          <div style={{...S.mono,wordBreak:'break-all'}}>{output}</div>
        </div>
      )}
    </div>
  );
}

// ─── Markdown Previewer ───────────────────────────────────────────────────────
function MarkdownPreviewer() {
  const [md, setMd] = useState(`# Hello Rayix AI 🤖\n\nThis is **bold** and *italic* text.\n\n- Item one\n- Item two\n- Item three\n\n\`\`\`js\nconsole.log("Hello, World!");\n\`\`\`\n\n> A great quote about AI tools.`);

  const toHtml = (text) => text
    .replace(/```[\w]*\n([\s\S]*?)```/g,'<pre style="background:#0d0a1f;padding:12px;border-radius:8px;overflow:auto;font-size:12px;color:#10b981;border:1px solid rgba(255,255,255,0.08)"><code>$1</code></pre>')
    .replace(/^### (.+)$/gm,'<h3 style="color:#f0ecff;margin:12px 0 6px;font-size:16px">$1</h3>')
    .replace(/^## (.+)$/gm,'<h2 style="color:#f0ecff;margin:14px 0 8px;font-size:20px">$1</h2>')
    .replace(/^# (.+)$/gm,'<h1 style="color:#f0ecff;margin:0 0 10px;font-size:26px">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g,'<strong style="color:#c4b5fd">$1</strong>')
    .replace(/\*(.+?)\*/g,'<em style="color:#a78bfa">$1</em>')
    .replace(/`(.+?)`/g,'<code style="background:rgba(124,58,237,0.2);padding:2px 6px;border-radius:4px;font-size:12px;color:#c4b5fd">$1</code>')
    .replace(/^> (.+)$/gm,'<blockquote style="border-left:3px solid #7c3aed;padding:8px 14px;margin:8px 0;color:#8b7fa8;font-style:italic">$1</blockquote>')
    .replace(/^- (.+)$/gm,'<li style="color:#c4b5fd;margin:4px 0;margin-left:16px">$1</li>')
    .replace(/\n/g,'<br/>');

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,height:400}}>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <label style={S.label}>Markdown Input</label>
        <textarea value={md} onChange={e=>setMd(e.target.value)} style={{...S.input,flex:1,resize:'none',fontFamily:'monospace',lineHeight:1.6}} />
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <label style={S.label}>Preview</label>
        <div style={{flex:1,...S.card,overflow:'auto',lineHeight:1.7,color:'#c4b5fd',fontSize:14}} dangerouslySetInnerHTML={{__html:toHtml(md)}}/>
      </div>
    </div>
  );
}

// ─── Hash Generator ───────────────────────────────────────────────────────────
function HashGenerator() {
  const [input, setInput] = useState('Rayix AI');
  const [hashes, setHashes] = useState({});
  const [copied, setCopied] = useState('');

  const generate = async () => {
    const enc = new TextEncoder().encode(input);
    const results = {};
    for (const algo of ['SHA-1','SHA-256','SHA-384','SHA-512']) {
      const buf = await crypto.subtle.digest(algo, enc);
      results[algo] = Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
    }
    setHashes(results);
  };

  const copy = (val) => { navigator.clipboard.writeText(val); setCopied(val); setTimeout(()=>setCopied(''),2000); };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <div>
        <label style={S.label}>Input text</label>
        <input type="text" value={input} onChange={e=>setInput(e.target.value)} style={S.input} placeholder="Enter text to hash..." />
      </div>
      <button onClick={generate} style={{...S.btn,width:'100%'}}>🔒 Generate Hashes</button>
      {Object.entries(hashes).map(([algo,hash])=>(
        <div key={algo} style={S.card}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
            <span style={{fontSize:11,fontWeight:700,color:'#a78bfa',letterSpacing:'.06em'}}>{algo}</span>
            <button onClick={()=>copy(hash)} style={S.btnSm}>{copied===hash?'✅':'📋'}</button>
          </div>
          <div style={{fontFamily:'monospace',fontSize:11,color:'#8b7fa8',wordBreak:'break-all'}}>{hash}</div>
        </div>
      ))}
    </div>
  );
}

const tools = [
  { id:'password', emoji:'🔐', name:'Password Generator', color:'#7c3aed', desc:'Generate strong, secure passwords', component:PasswordGenerator },
  { id:'wordcount', emoji:'📝', name:'Word Counter', color:'#10b981', desc:'Count words, characters, reading time', component:WordCounter },
  { id:'color', emoji:'🎨', name:'Color Picker', color:'#ec4899', desc:'HEX, RGB, HSL color converter', component:ColorPicker },
  { id:'json', emoji:'📦', name:'JSON Formatter', color:'#f59e0b', desc:'Format and validate JSON instantly', component:JsonFormatter },
  { id:'base64', emoji:'🔄', name:'Base64 Encoder', color:'#3b82f6', desc:'Encode and decode Base64 strings', component:Base64Tool },
  { id:'markdown', emoji:'✍️', name:'Markdown Preview', color:'#8b5cf6', desc:'Live Markdown to HTML previewer', component:MarkdownPreviewer },
  { id:'hash', emoji:'#️⃣', name:'Hash Generator', color:'#059669', desc:'SHA-1, SHA-256, SHA-512 hashing', component:HashGenerator },
];

export default function FreeToolsPage() {
  const [activeTool, setActiveTool] = useState('password');
  const currentTool = tools.find(t => t.id === activeTool);
  const ToolComponent = currentTool?.component;

  return (
    <Layout title="Free Online Tools" description="Free browser-based tools for developers — password generator, word counter, JSON formatter, color picker, Base64, hash generator. No signup required.">

      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,#0f1a0f,#0a1a2e)', padding:'48px 24px 32px', borderBottom:'1px solid rgba(255,255,255,0.06)', textAlign:'center' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(16,185,129,0.12)', border:'1px solid rgba(16,185,129,0.25)', color:'#6ee7b7', borderRadius:100, padding:'5px 16px', fontSize:12, marginBottom:16 }}>
          🆓 100% Free · No Signup · No Ads · Works Offline
        </div>
        <h1 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(26px,5vw,44px)', fontWeight:800, color:'#f0ecff', marginBottom:10, letterSpacing:'-.02em' }}>
          Free Developer Tools
        </h1>
        <p style={{ color:'#8b7fa8', fontSize:15, maxWidth:480, margin:'0 auto' }}>
          7 browser-based utilities for developers — password generator, word counter, JSON formatter, color picker and more.
        </p>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'28px 16px 60px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:20 }}>

          {/* Sidebar */}
          <div>
            <div style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:8, position:'sticky', top:80 }}>
              {tools.map(({ id, emoji, name, color }) => (
                <button key={id} onClick={() => setActiveTool(id)}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:10, border:'none', cursor:'pointer', textAlign:'left', marginBottom:2, transition:'all .2s', fontFamily:'inherit',
                    background: activeTool===id ? color+'22' : 'transparent',
                    color: activeTool===id ? '#f0ecff' : '#8b7fa8',
                    borderLeft: `3px solid ${activeTool===id ? color : 'transparent'}`,
                  }}
                  onMouseEnter={e=>{ if(activeTool!==id) e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e=>{ if(activeTool!==id) e.currentTarget.style.background='transparent'; }}>
                  <span style={{ fontSize:18 }}>{emoji}</span>
                  <span style={{ fontSize:12, fontWeight:600 }}>{name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tool panel */}
          <div>
            {currentTool && (
              <div style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'24px 28px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:24, paddingBottom:20, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width:52, height:52, borderRadius:14, background:currentTool.color+'22', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>
                    {currentTool.emoji}
                  </div>
                  <div>
                    <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:18, color:'#f0ecff', margin:0, marginBottom:4 }}>{currentTool.name}</h2>
                    <p style={{ color:'#8b7fa8', fontSize:13, margin:0 }}>{currentTool.desc}</p>
                  </div>
                </div>
                <ToolComponent />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
