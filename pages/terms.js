import Layout from '../components/Layout';

const sections = [
  { icon:'✅', title:'Acceptance of Terms', content:'By accessing and using Rayix AI ("the Site"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website. These terms apply to all visitors, users, and anyone who accesses or uses our services.' },
  { icon:'📋', title:'Description of Service', content:'Rayix AI is a directory and information website that lists, categorizes, and provides information about AI tools and free online utilities. We do not own or operate the third-party AI tools listed on our website. We provide information, descriptions, and links to these tools as a convenience to our users.' },
  { icon:'🔗', title:'Third-Party Tools and Links', content:'Rayix AI provides links to third-party AI tools and websites for informational purposes only. We do not endorse, guarantee, or take responsibility for any third-party tools, their accuracy, legality, or content. Your use of any third-party tool is subject to that tool\'s own terms and conditions.' },
  { icon:'📢', title:'Advertising', content:'We display advertisements through Google AdSense and may have sponsored listings. Sponsored content is clearly labeled. We do not control which ads are displayed but we do not allow deceptive or harmful advertising. Ad revenue helps us keep Rayix AI free for everyone.' },
  { icon:'🚫', title:'Prohibited Activities', content:'You agree not to scrape or harvest our content without permission, attempt unauthorized access to our systems, use our site to distribute spam or malicious content, reproduce our content for commercial use without written permission, or impersonate Rayix AI or its team members.' },
  { icon:'⚠️', title:'Disclaimer of Warranties', content:'Rayix AI is provided "as is" and "as available" without warranties of any kind. We do not warrant that the site will be error-free or uninterrupted. Tool information, ratings, and descriptions are for general informational purposes and may not always reflect the current state of listed tools.' },
  { icon:'💡', title:'Intellectual Property', content:'All original content on Rayix AI, including text, logos, and the compilation thereof, is the property of Rayix AI and protected by applicable intellectual property laws. The names and logos of third-party AI tools belong to their respective owners.' },
  { icon:'🔄', title:'Changes to Terms', content:'We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes by updating the "Last Updated" date. Your continued use of Rayix AI after any changes constitutes your acceptance of the new terms.' },
  { icon:'📍', title:'Governing Law', content:'These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of Rayix AI shall be resolved through good faith negotiation before pursuing any legal remedy.' },
  { icon:'✉️', title:'Contact', content:'For questions about these Terms of Service, please contact us at hello@rayix-ai.com. We will respond to all inquiries within 48 hours.' },
];

export default function TermsPage() {
  return (
    <Layout title="Terms of Service" description="Rayix AI Terms of Service — rules and guidelines for using our platform.">

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0f0c29,#1a0f3a)', padding:'56px 24px 40px', textAlign:'center', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize:48, marginBottom:16 }}>📜</div>
        <h1 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(28px,5vw,44px)', fontWeight:800, color:'#f0ecff', marginBottom:10, letterSpacing:'-.02em' }}>Terms of Service</h1>
        <p style={{ color:'#8b7fa8', fontSize:15, maxWidth:440, margin:'0 auto 12px' }}>
          Please read these terms carefully before using Rayix AI.
        </p>
        <span style={{ background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', color:'#a78bfa', borderRadius:100, padding:'4px 14px', fontSize:12 }}>
          Last updated: March 2026
        </span>
      </div>

      <div style={{ maxWidth:760, margin:'0 auto', padding:'48px 24px 80px' }}>

        {/* Quick summary */}
        <div style={{ background:'rgba(99,102,241,0.08)', border:'1px solid rgba(99,102,241,0.2)', borderRadius:16, padding:'20px 24px', marginBottom:40, display:'flex', gap:14 }}>
          <span style={{ fontSize:24, flexShrink:0 }}>💡</span>
          <div>
            <div style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:15, color:'#a5b4fc', marginBottom:6 }}>The short version</div>
            <p style={{ color:'#8b7fa8', fontSize:13, lineHeight:1.7, margin:0 }}>
              Use Rayix AI fairly, don't abuse it, respect third-party tool owners, and understand that tool listings are for information only — we don't own or operate any of the tools listed.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'24px 0' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                <span style={{ fontSize:22 }}>{s.icon}</span>
                <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:16, color:'#f0ecff', margin:0 }}>{s.title}</h2>
              </div>
              <p style={{ color:'#8b7fa8', fontSize:14, lineHeight:1.8, margin:0, paddingLeft:36 }}>{s.content}</p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{ marginTop:40, background:'#1a1330', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'24px 28px', textAlign:'center' }}>
          <div style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:16, color:'#f0ecff', marginBottom:8 }}>Questions about these terms?</div>
          <p style={{ color:'#8b7fa8', fontSize:13, marginBottom:16 }}>We're happy to clarify anything in plain English.</p>
          <a href="/contact" style={{ display:'inline-block', background:'linear-gradient(135deg,#7c3aed,#6366f1)', color:'#fff', textDecoration:'none', padding:'10px 24px', borderRadius:10, fontSize:13, fontWeight:600 }}>
            📧 Contact Us
          </a>
        </div>
      </div>
    </Layout>
  );
}
