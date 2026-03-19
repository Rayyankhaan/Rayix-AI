import Layout from '../components/Layout';

const sections = [
  { title:'1. Information We Collect', icon:'📋', content:'We collect information you provide directly to us, such as when you subscribe to our newsletter or contact us. This may include your name and email address. We also automatically collect technical information when you visit, including your IP address, browser type, and pages viewed.' },
  { title:'2. How We Use Your Information', icon:'🎯', content:'We use the information we collect to operate and improve Rayix AI, send newsletters you have subscribed to, respond to your questions, and monitor usage patterns. We never sell your personal data to third parties.' },
  { title:'3. Cookies & Analytics', icon:'🍪', content:'Rayix AI uses cookies and analytics tools (such as Google Analytics) to understand how users interact with our site. You can instruct your browser to refuse all cookies. If you do not accept cookies, some portions of our site may not function properly.' },
  { title:'4. Google AdSense & Advertising', icon:'📢', content:'We may display Google AdSense advertisements on our site. Google uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google\'s Ads Settings. We do not control what ads are displayed.' },
  { title:'5. Third-Party Links', icon:'🔗', content:'Our website contains links to external AI tools and websites. We are not responsible for the privacy practices or content of those third-party sites. The AI tools listed on Rayix AI have their own separate privacy policies.' },
  { title:'6. Data Security', icon:'🔒', content:'We implement commercially reasonable security measures to protect your personal information. However, no internet transmission or electronic storage is 100% secure, and we cannot guarantee absolute security of your data.' },
  { title:'7. Children\'s Privacy', icon:'👶', content:'Rayix AI is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will delete such information.' },
  { title:'8. Changes to This Policy', icon:'🔄', content:'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page. Your continued use of Rayix AI after any changes constitutes your acceptance of the updated policy.' },
  { title:'9. Contact Us', icon:'✉️', content:'For privacy-related inquiries, contact our privacy team at privacy@rayix-ai.com (forwards to our team). We respond within 48 hours. For GDPR requests (data access, deletion, portability), include "GDPR Request" in the subject line.' },
];

export default function PrivacyPage() {
  return (
    <Layout title="Privacy Policy" description="Rayix AI Privacy Policy — how we collect, use, and protect your data.">

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0f0c29,#1a0f3a)', padding:'56px 24px 40px', textAlign:'center', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
        <h1 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(28px,5vw,44px)', fontWeight:800, color:'#f0ecff', marginBottom:10, letterSpacing:'-.02em' }}>Privacy Policy</h1>
        <p style={{ color:'#8b7fa8', fontSize:15, maxWidth:440, margin:'0 auto 12px' }}>
          We care about your privacy. Here's exactly how we handle your data.
        </p>
        <span style={{ background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.3)', color:'#a78bfa', borderRadius:100, padding:'4px 14px', fontSize:12 }}>
          Last updated: March 2026
        </span>
      </div>

      <div style={{ maxWidth:760, margin:'0 auto', padding:'48px 24px 80px' }}>

        {/* Quick summary */}
        <div style={{ background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:16, padding:'20px 24px', marginBottom:40, display:'flex', gap:14 }}>
          <span style={{ fontSize:24, flexShrink:0 }}>✅</span>
          <div>
            <div style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:15, color:'#6ee7b7', marginBottom:6 }}>The short version</div>
            <p style={{ color:'#8b7fa8', fontSize:13, lineHeight:1.7, margin:0 }}>
              We collect minimal data, never sell it, use Google Analytics and AdSense for traffic and revenue insights, and you can contact us anytime to have your data removed.
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
          <div style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:16, color:'#f0ecff', marginBottom:8 }}>Questions about your privacy?</div>
          <p style={{ color:'#8b7fa8', fontSize:13, marginBottom:16 }}>We're happy to answer any questions about how we handle your data.</p>
          <a href="mailto:privacy@rayix-ai.com" style={{ display:'inline-block', background:'linear-gradient(135deg,#7c3aed,#6366f1)', color:'#fff', textDecoration:'none', padding:'10px 24px', borderRadius:10, fontSize:13, fontWeight:600 }}>
            📧 Contact Us
          </a>
        </div>
      </div>
    </Layout>
  );
}
