import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types';

import './global.css';
import { Header, Footer } from '@/components';
import { Providers } from './providers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <Providers>
          <Header session={session} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
