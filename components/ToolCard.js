export default function ToolCard({ tool }) {
  return (
    <div style={{ background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:20, padding:20, display:'flex', flexDirection:'column', gap:14, transition:'all .3s', cursor:'pointer' }}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor='rgba(124,58,237,0.35)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; }}>

      <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
        <div style={{ width:44, height:44, borderRadius:12, background:tool.color+'22', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{tool.logo}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', marginBottom:4 }}>
            <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:14, color:'#f0ecff' }}>{tool.name}</span>
            {tool.featured && <span style={{ background:'#fef3c722', color:'#fbbf24', fontSize:10, fontWeight:700, padding:'2px 6px', borderRadius:6 }}>⭐ Top</span>}
          </div>
          <span style={{ background:'rgba(255,255,255,0.06)', color:'#8b7fa8', fontSize:11, padding:'2px 8px', borderRadius:6 }}>{tool.category}</span>
        </div>
      </div>

      <p style={{ color:'#8b7fa8', fontSize:13, lineHeight:1.6, margin:0 }}>{tool.description}</p>

      <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:11, color:'#8b7fa8' }}>
        <span>⭐ {tool.rating}</span>
        <span style={{ opacity:.3 }}>·</span>
        <span>{tool.users}</span>
        <span style={{ opacity:.3 }}>·</span>
        <span style={{ color: tool.free ? '#10b981' : '#f97316', fontWeight:600 }}>{tool.free ? '✓ Free' : '💳 Paid'}</span>
      </div>

      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
        {tool.tags?.slice(0,3).map(tag => (
          <span key={tag} style={{ background:'rgba(255,255,255,0.04)', color:'#8b7fa8', fontSize:10, padding:'3px 8px', borderRadius:6 }}>#{tag}</span>
        ))}
      </div>

      {/* rel="noopener noreferrer" on all external links */}
      <a href={tool.url} target="_blank" rel="noopener noreferrer"
        style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'10px', borderRadius:12, fontSize:13, fontWeight:600, textDecoration:'none', background:tool.color+'15', color:tool.color==='#000000'||tool.color==='#24292f'?'#9ca3af':tool.color, border:`1px solid ${tool.color}25`, transition:'all .2s' }}
        onClick={e=>e.stopPropagation()}
        onMouseEnter={e=>{ e.currentTarget.style.background=tool.color+'28'; }}
        onMouseLeave={e=>{ e.currentTarget.style.background=tool.color+'15'; }}>
        Visit {tool.name} →
      </a>
    </div>
  );
}
