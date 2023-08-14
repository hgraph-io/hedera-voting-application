'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types'

export default async function submit(data: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const fields = {
    id: data.get('id')?.toString() || undefined,
    user_id: user!.id,
    name: String(data.get('name')),
    organization: String(data.get('organization')),
    profile: String(data.get('profile')),
    links: String(data.get('links')).split(','),
    topics: data.getAll('topics') as string[],
    moderator: Boolean(data.get('moderator')),
    panelist: Boolean(data.get('panelist')),
  }
  const result = await supabase.from('submission').upsert(fields)
  if (result.status === 201) redirect('/dashboard')
  else throw new Error(result?.error?.message || 'Unknown error')
}
