import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import CookieConsent from '../components/CookieConsent';
import { Analytics } from '@vercel/analytics/react'; // ✅ ADD THIS

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <CookieConsent />
      <Analytics /> {/* ✅ ADD THIS */}
    </AuthProvider>
  );
}
