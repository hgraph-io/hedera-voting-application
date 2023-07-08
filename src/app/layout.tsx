import './global.css';
import { Header, Footer } from '@/components';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
