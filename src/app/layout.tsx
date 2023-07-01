import 'global.scss';
import { CssBaseline } from '@mui/material';
import { Providers } from './providers';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Providers>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            <main style={{ flex: '1 0 auto' }}>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
