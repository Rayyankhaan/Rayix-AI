const RATE_LIMIT = {};
const SUBSCRIBED = new Set();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
  const now = Date.now();
  if (!RATE_LIMIT[ip]) RATE_LIMIT[ip] = [];
  RATE_LIMIT[ip] = RATE_LIMIT[ip].filter(t => now - t < 3600000);
  if (RATE_LIMIT[ip].length >= 3) {
    return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  }
  RATE_LIMIT[ip].push(now);

  const { email, honeypot } = req.body;
  if (honeypot) return res.status(200).json({ success: true });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (SUBSCRIBED.has(email.toLowerCase())) {
    return res.status(200).json({ success: true, message: 'Already subscribed!' });
  }
  SUBSCRIBED.add(email.toLowerCase());

  // TODO: Connect to Mailchimp / ConvertKit / Resend
  // For now logs and confirms
  console.log('New subscriber:', email);
  return res.status(200).json({ success: true });
}
