import { useState, useMemo } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';
import { aiTools, categories } from '../data/aiTools';

const sortOptions = [
  { value:'featured', label:'⭐ Featured First' },
  { value:'rating', label:'★ Highest Rated' },
  { value:'name', label:'A-Z Name' },
  { value:'free', label:'✓ Free First' },
];

export default function AIToolsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [freeOnly, setFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const filtered = useMemo(() => {
    let tools = aiTools.filter(tool => {
      const q = search.toLowerCase();
      const matchSearch = !q || tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || tool.category.toLowerCase().includes(q) || tool.tags?.some(t => t.toLowerCase().includes(q));
      const matchCat = activeCategory === 'All' || tool.category === activeCategory;
      const matchFree = !freeOnly || tool.free;
      return matchSearch && matchCat && matchFree;
    });
    if (sortBy === 'rating') tools = [...tools].sort((a,b) => b.rating - a.rating);
    else if (sortBy === 'name') tools = [...tools].sort((a,b) => a.name.localeCompare(b.name));
    else if (sortBy === 'free') tools = [...tools].sort((a,b) => (b.free?1:0) - (a.free?1:0));
    else tools = [...tools].sort((a,b) => (b.featured?1:0) - (a.featured?1:0));
    return tools;
  }, [search, activeCategory, freeOnly, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const handleFilter = (cat) => { setActiveCategory(cat); setPage(1); };
  const handleSearch = (v) => { setSearch(v); setPage(1); };

  const inputStyle = { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'11px 16px', color:'#f0ecff', fontSize:14, fontFamily:'inherit', outline:'none', width:'100%' };

  return (
    <Layout title={`AI Tools Directory — ${aiTools.length}+ Tools`} description="Discover 1000+ AI tools for developers, students, businesses and creators. Free and paid AI tools across 36 categories.">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ background:'#0a0614', minHeight:'100vh', paddingTop:64 }}>

        {/* Hero */}
        <div style={{ background:'linear-gradient(135deg,#0f0c29,#1a0f3a)', padding:'48px 24px 32px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', color:'#c4b5fd', borderRadius:100, padding:'5px 16px', fontSize:12, marginBottom:16 }}>
              🔍 Complete AI Ecosystem
            </div>
            <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(28px,5vw,48px)', fontWeight:800, color:'#f0ecff', marginBottom:12, letterSpacing:'-.02em' }}>
              {aiTools.length}+ AI Tools Directory
            </h1>
            <p style={{ color:'#8b7fa8', fontSize:16, marginBottom:28 }}>
              Every AI tool for developers, students, businesses, and creators — across {categories.length - 1} categories.
            </p>

            {/* Search */}
            <div style={{ maxWidth:560, margin:'0 auto', position:'relative' }}>
              <input value={search} onChange={e=>handleSearch(e.target.value)} placeholder={`Search ${aiTools.length}+ AI tools...`} style={{ ...inputStyle, padding:'14px 20px', fontSize:15, borderRadius:14 }} />
              {search && <button onClick={()=>handleSearch('')} style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'#8b7fa8', cursor:'pointer', fontSize:18 }}>×</button>}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ background:'rgba(255,255,255,0.02)', borderBottom:'1px solid rgba(255,255,255,0.05)', padding:'12px 24px' }}>
          <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
              {[
                [`${aiTools.length}+`, 'Total tools'],
                [`${aiTools.filter(t=>t.free).length}+`, 'Free tools'],
                [`${categories.length-1}`, 'Categories'],
                [`${aiTools.filter(t=>t.featured).length}`, 'Top picks'],
              ].map(([n,l]) => (
                <div key={l} style={{ textAlign:'center' }}>
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:18, color:'#a78bfa' }}>{n}</span>
                  <span style={{ color:'#8b7fa8', fontSize:12, marginLeft:6 }}>{l}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', color:'#10b981', fontSize:13, fontWeight:600 }}>
                <input type="checkbox" checked={freeOnly} onChange={e=>{setFreeOnly(e.target.checked);setPage(1);}} style={{ accentColor:'#10b981' }} />
                Free only
              </label>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ ...inputStyle, width:'auto', padding:'7px 12px', fontSize:12 }}>
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'20px 16px' }}>

          {/* Category pills */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
            {categories.map(cat => (
              <button key={cat} onClick={()=>handleFilter(cat)}
                style={{ padding:'6px 14px', borderRadius:100, fontSize:12, fontWeight:600, border:'none', cursor:'pointer', fontFamily:'inherit', transition:'all .2s',
                  background: activeCategory===cat ? 'linear-gradient(135deg,#7c3aed,#6366f1)' : 'rgba(255,255,255,0.05)',
                  color: activeCategory===cat ? '#fff' : '#8b7fa8',
                }}>
                {cat}
                {cat !== 'All' && <span style={{ marginLeft:4, opacity:.6, fontSize:10 }}>
                  {aiTools.filter(t=>t.category===cat).length}
                </span>}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <div style={{ color:'#8b7fa8', fontSize:13 }}>
              {search || activeCategory !== 'All' || freeOnly
                ? <><span style={{ color:'#a78bfa', fontWeight:700 }}>{filtered.length}</span> results</>
                : <><span style={{ color:'#a78bfa', fontWeight:700 }}>{aiTools.length}</span> tools total</>
              }
              {search && <> for "<span style={{ color:'#f0ecff' }}>{search}</span>"</>}
            </div>
            {filtered.length === 0 && (
              <button onClick={()=>{setSearch('');setActiveCategory('All');setFreeOnly(false);}} style={{ background:'rgba(124,58,237,0.2)', color:'#a78bfa', border:'1px solid rgba(124,58,237,0.3)', borderRadius:8, padding:'5px 12px', fontSize:12, cursor:'pointer', fontFamily:'inherit' }}>
                Clear filters
              </button>
            )}
          </div>

          {/* Tools grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 20px', color:'#8b7fa8' }}>
              <div style={{ fontSize:'3rem', marginBottom:16 }}>🔍</div>
              <div style={{ fontSize:18, fontWeight:600, color:'#f0ecff', marginBottom:8 }}>No tools found</div>
              <div>Try a different search or category</div>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
              {paginated.map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:40, flexWrap:'wrap' }}>
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                style={{ padding:'8px 16px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color: page===1?'#4b5563':'#f0ecff', cursor:page===1?'not-allowed':'pointer', fontFamily:'inherit', fontSize:13 }}>
                ← Prev
              </button>
              {Array.from({length:Math.min(totalPages,7)},(_,i)=>{
                let pageNum;
                if(totalPages<=7) pageNum=i+1;
                else if(page<=4) pageNum=i+1;
                else if(page>=totalPages-3) pageNum=totalPages-6+i;
                else pageNum=page-3+i;
                return (
                  <button key={pageNum} onClick={()=>setPage(pageNum)}
                    style={{ width:36, height:36, borderRadius:8, border:'none', background:page===pageNum?'linear-gradient(135deg,#7c3aed,#6366f1)':'rgba(255,255,255,0.05)', color:page===pageNum?'#fff':'#8b7fa8', cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:page===pageNum?700:400 }}>
                    {pageNum}
                  </button>
                );
              })}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}
                style={{ padding:'8px 16px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', color:page===totalPages?'#4b5563':'#f0ecff', cursor:page===totalPages?'not-allowed':'pointer', fontFamily:'inherit', fontSize:13 }}>
                Next →
              </button>
              <span style={{ color:'#8b7fa8', fontSize:12, marginLeft:8 }}>Page {page} of {totalPages} · {filtered.length} tools</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
