'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types';

export default async function submit(data: FormData) {
  'use server';
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log(user?.id);
  // console.log(data);
  const fields = {
    name: data.get('name'),
    organization: data.get('organization'),
    links: data.get('links'),
    topics: data.getAll('topics'),
    moderator: data.get('moderator'),
    user_id: user!.id,
  };
  const result = await supabase.from('submission').insert(fields);
  if (result.status === 201) redirect('/dashboard');
  //todo: handle error
}
