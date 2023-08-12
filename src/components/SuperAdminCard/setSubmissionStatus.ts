'use server';
import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types';

const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY, NEXT_PUBLIC_HEDERA_SUPER_ADMINS } =
  process.env;

export default async function submit({
  signature,
  message,
}: {
  signature: string;
  message: string;
}) {
  const;
  return { signature };
  //TODO: verify by signed message
  if (!NEXT_PUBLIC_HEDERA_SUPER_ADMINS!.includes(superAdminAccountId))
    return { error: 'not authorized' };
  const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!);
  const { data, error } = await supabase.from('submission').update({ status }).eq('id', id);
}
