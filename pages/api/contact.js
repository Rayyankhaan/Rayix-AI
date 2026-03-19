const RATE_LIMIT = {};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limiting — 3 submissions per IP per hour
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  if (!RATE_LIMIT[ip]) RATE_LIMIT[ip] = [];
  RATE_LIMIT[ip] = RATE_LIMIT[ip].filter(t => now - t < 3600000);
  if (RATE_LIMIT[ip].length >= 3) {
    return res.status(429).json({ error: 'Too many submissions. Please wait an hour before trying again.' });
  }
  RATE_LIMIT[ip].push(now);

  const { name, email, subject, message, honeypot } = req.body;

  // Honeypot anti-spam check
  if (honeypot) return res.status(200).json({ success: true }); // silently ignore bots

  // Validation
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (message.length < 10) {
    return res.status(400).json({ error: 'Message is too short.' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message is too long (max 2000 characters).' });
  }

  try {
    // Use Formspree — replace YOUR_FORM_ID with your actual Formspree form ID
    // Sign up free at formspree.io, create a form, get the ID
    const FORMSPREE_ID = process.env.FORMSPREE_ID || 'YOUR_FORM_ID';

    if (FORMSPREE_ID === 'YOUR_FORM_ID') {
      // Dev mode — just log it
      console.log('Contact form submission:', { name, email, subject, message });
      return res.status(200).json({ success: true, dev: true });
    }

    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, subject, message, _subject: `[Rayix AI] ${subject}` }),
    });

    if (!response.ok) throw new Error('Formspree error');
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please email us directly.' });
  }
}
