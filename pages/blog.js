import Layout from '../components/Layout';
import { blogPosts } from '../data/aiTools';
import Link from 'next/link';

// gradient per category
const gradients = {
  'Comparison': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'Guides':     'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'Tutorial':   'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'Deep Dive':  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'News':       'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
};

function getGradient(category) {
  return gradients[category] || 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)';
}

function PostImage({ post, height = 200, fontSize = '5rem' }) {
  return (
    <div style={{
      height,
      background: getGradient(post.category),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize,
      flexShrink: 0,
    }}>
      {post.image}
    </div>
  );
}

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <Layout title="Blog — Rayix AI" description="Latest AI news, guides, tutorials and comparisons">

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', borderRadius:100, padding:'6px 16px', fontSize:13, color:'#e0d7ff', marginBottom:20 }}>
          📰 AI News & Guides
        </div>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(32px,6vw,52px)', fontWeight:800, color:'#fff', marginBottom:12, letterSpacing:'-.02em' }}>
          The Rayix AI Blog
        </h1>
        <p style={{ color:'#a78bfa', fontSize:17, maxWidth:500, margin:'0 auto' }}>
          AI trends, tool comparisons, tutorials and deep dives — updated weekly.
        </p>
      </div>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 24px' }}>

        {/* Featured post */}
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', color:'#6366f1', textTransform:'uppercase', marginBottom:16 }}>Featured</div>
          <Link href="#" style={{ textDecoration:'none', display:'block' }}>
            <div style={{ background:'#fff', borderRadius:24, overflow:'hidden', border:'1px solid #e5e7eb', display:'grid', gridTemplateColumns:'1fr 1fr', transition:'box-shadow .3s,transform .3s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.12)'; e.currentTarget.style.transform='translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}>
              <div style={{ height:320, background: getGradient(featured.category), display:'flex', alignItems:'center', justifyContent:'center', fontSize:'7rem' }}>
                {featured.image}
              </div>
              <div style={{ padding:40, display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <div style={{ display:'flex', gap:8, marginBottom:16 }}>
                  <span style={{ background:'#eef2ff', color:'#4f46e5', fontSize:12, fontWeight:700, padding:'4px 12px', borderRadius:100 }}>✨ Featured</span>
                  <span style={{ background:'#f3f4f6', color:'#6b7280', fontSize:12, fontWeight:600, padding:'4px 12px', borderRadius:100 }}>{featured.category}</span>
                </div>
                <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:24, fontWeight:800, color:'#111827', marginBottom:12, lineHeight:1.3, letterSpacing:'-.01em' }}>
                  {featured.title}
                </h2>
                <p style={{ color:'#6b7280', fontSize:14, lineHeight:1.7, marginBottom:20 }}>{featured.excerpt}</p>
                <div style={{ display:'flex', alignItems:'center', gap:12, fontSize:13, color:'#9ca3af' }}>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>⏱ {featured.readTime} read</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* All posts grid */}
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', color:'#6366f1', textTransform:'uppercase', marginBottom:20 }}>All Articles</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))', gap:24 }}>
          {blogPosts.map(post => (
            <Link key={post.id} href="#" style={{ textDecoration:'none', display:'block' }}>
              <div style={{ background:'#fff', borderRadius:20, overflow:'hidden', border:'1px solid #e5e7eb', height:'100%', display:'flex', flexDirection:'column', transition:'box-shadow .3s,transform .3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.transform='translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}>

                {/* Image area */}
                <div style={{ height:180, background: getGradient(post.category), display:'flex', alignItems:'center', justifyContent:'center', fontSize:'4.5rem', flexShrink:0 }}>
                  {post.image}
                </div>

                {/* Content */}
                <div style={{ padding:20, flex:1, display:'flex', flexDirection:'column', gap:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ background:'#f3f4f6', color:'#6b7280', fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:100 }}>{post.category}</span>
                    <span style={{ color:'#9ca3af', fontSize:11 }}>⏱ {post.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:15, color:'#111827', lineHeight:1.4, margin:0 }}>
                    {post.title}
                  </h3>
                  <p style={{ color:'#6b7280', fontSize:13, lineHeight:1.6, margin:0, flex:1 }}>
                    {post.excerpt.slice(0, 100)}...
                  </p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:4 }}>
                    <span style={{ fontSize:12, color:'#9ca3af' }}>{post.date}</span>
                    <div style={{ display:'flex', gap:4 }}>
                      {(post.tags || []).slice(0, 2).map(tag => (
                        <span key={tag} style={{ background:'#eef2ff', color:'#6366f1', fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:6 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon banner */}
        <div style={{ marginTop:60, background:'linear-gradient(135deg,#eef2ff,#faf5ff)', border:'1px solid #e0e7ff', borderRadius:20, padding:40, textAlign:'center' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:12 }}>✍️</div>
          <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:20, color:'#1f2937', marginBottom:8 }}>More articles coming every week</h3>
          <p style={{ color:'#6b7280', fontSize:14 }}>We publish new AI guides, comparisons, and tutorials every week. Bookmark this page.</p>
        </div>

      </div>
    </Layout>
  );
}
