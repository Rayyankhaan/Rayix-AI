import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import CookieConsent from '../components/CookieConsent';
import { Analytics } from '@vercel/analytics/next';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <CookieConsent />
      <Analytics />
    </AuthProvider>
  );
}
