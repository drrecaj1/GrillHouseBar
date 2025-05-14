import { SessionProvider } from 'next-auth/react'; // Import the SessionProvider
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
      <SessionProvider session={pageProps.session}> {/* Wrap the Component */}
        <Component {...pageProps} />
      </SessionProvider>
  );
}
