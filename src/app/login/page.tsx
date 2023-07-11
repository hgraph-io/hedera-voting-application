'use client';

import { useSearchParams } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ThemeSupa, VIEWS } from '@supabase/auth-ui-shared';
import { Container } from '@/components';

export default function SupabaseAuthUI() {
  const supabase = createClientComponentClient();
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
