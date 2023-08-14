'use server';
import { createClient } from '@supabase/supabase-js';
import nacl from 'tweetnacl';
import { PublicKey } from '@hashgraph/sdk';
import HgraphClient, { stripShardRealm } from '@hgraph.io/sdk';
import AccountPublicKey from './AccountPublicKey.gql';
import type { Database } from '@/types';

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const NEXT_PUBLIC_HEDERA_SUPER_ADMINS = process.env.NEXT_PUBLIC_HEDERA_SUPER_ADMINS;

export default async function setSubmissionStatus({
  // signature,
  message,
}: {
  signature?: string;
  message: string;
}) {
  try {
    const { id, status, accountId } = JSON.parse(atob(message));
    if (!NEXT_PUBLIC_HEDERA_SUPER_ADMINS!.includes(accountId))
      throw new Error('not authorized');
    // if signature doesn't match public key of account id

    // const hgraph = new HgraphClient();
    // const hgraphResponse = await hgraph.query({
    //   query: AccountPublicKey,
    //   variables: { accountId: stripShardRealm(accountId) },
    // });

    // const hi = nacl.sign.open(sig, pub);

    //     const blah = nacl.sign.detached.verify(
    //       Buffer.from(message, 'hex'),
    //       Buffer.from(signature, 'hex'),
    //       Buffer.from(publicKey, 'hex')
    //     );

    const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!);
    const { data, error } = await supabase.from('submission').update({ status }).eq('ids', id);

    if (error) throw error;
    else return data;
  } catch (error) {
    //@ts-ignore
    return { error: error?.message || 'Unknown error' };
  }
}
