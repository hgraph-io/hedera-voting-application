'use server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
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
  console.log(fields);
  const test = await supabase.from('submission').insert(fields);
  console.log(test);
  // revalidatePath('/submission');
}
