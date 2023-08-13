'use server';
import { createClient } from '@supabase/supabase-js';
import HgraphClient, { stripShardRealm } from '@hgraph.io/sdk';
import AccountPublicKey from './AccountPublicKey.gql';
import type { Database } from '@/types';

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const NEXT_PUBLIC_HEDERA_SUPER_ADMINS = process.env.NEXT_PUBLIC_HEDERA_SUPER_ADMINS;

export default async function setSubmissionStatus({
  signature,
  message,
}: {
  signature: string;
  message: string;
}) {
  let response = { error: 'not authorized' };

  const { id, status, accountId } = JSON.parse(message);
  console.log(id, status, accountId);

  try {
    // check if the user is a super admin
    if (!NEXT_PUBLIC_HEDERA_SUPER_ADMINS!.includes(accountId))
      throw new Error('not authorized');
    // get public key for the account
    console.log('xxxxxxxxxxxx');
    console.log(stripShardRealm(accountId));
    const hgraph = new HgraphClient();
    // TODO: unauthenticated
    console.log(AccountPublicKey);
    const hgraphResponse = await hgraph.query({
      query: AccountPublicKey,
      variables: { accountId: stripShardRealm(accountId) },
    });

    console.log('xxxxxxxxxxxx');
    console.log(hgraphResponse);

    throw new Error('testing');
    const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!);
    const { data, error } = await supabase.from('submission').update({ status }).eq('id', id);
    return response;
  } catch (e) {
    console.error(e);
  }
}
