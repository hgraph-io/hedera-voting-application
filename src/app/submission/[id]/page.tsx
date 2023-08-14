import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types'
import SubmissionForm from '../SubmissionForm'

export default async function EditPage({ params: { id } }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: submission } = await supabase
    .from('submission')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single()

  if (!submission) notFound()

  return <SubmissionForm submission={submission} />
}
