'use client';

import { useSearchParams } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { createClient } from '@supabase/supabase-js';
import { ThemeSupa, VIEWS } from '@supabase/auth-ui-shared';
import { Container } from '@/components';

export default function SupabaseAuthUI() {
  const supabase = createClientComponentClient();
  // https://github.com/supabase/auth-helpers/issues/569
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );

  const searchParams = useSearchParams();
  const view = VIEWS[searchParams.get('v')?.toUpperCase() || 'SIGN_IN'] || VIEWS.SIGN_IN;

  return (
    <Container style={{ maxWidth: 600, margin: 'auto' }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        // theme="dark"
        providers={[]}
        view={view}
        redirectTo="http://localhost:3000/auth/callback"
      />
    </Container>
  );
}
