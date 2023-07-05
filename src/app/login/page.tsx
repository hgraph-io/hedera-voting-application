'use client';

import { Auth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function SupabaseAuthUI() {
  const supabase = createClientComponentClient();
  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={[]}
      />
    </div>
  );
}
