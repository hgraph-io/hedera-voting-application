'use client';

import { Auth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ThemeSupa, VIEWS } from '@supabase/auth-ui-shared';
import { Container } from '@/components';

export default function SupabaseAuthUI() {
  const supabase = createClientComponentClient();
  return (
    <Container style={{ maxWidth: 600, margin: 'auto' }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        // theme="dark"
        providers={[]}
        view={VIEWS.SIGN_UP}
      />
    </Container>
  );
}
