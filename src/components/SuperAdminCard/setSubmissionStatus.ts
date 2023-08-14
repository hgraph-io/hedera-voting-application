'use server';
import { createClient } from '@supabase/supabase-js';
import nacl from 'tweetnacl';
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
  try {
    const { id, status, accountId } = JSON.parse(atob(message));
    if (!NEXT_PUBLIC_HEDERA_SUPER_ADMINS!.includes(accountId))
      throw new Error('Not authorized to set submission status');

    //check signature is valid for the message
    const hgraph = new HgraphClient();
    const hgraphResponse: any = await hgraph.query({
      query: AccountPublicKey,
      variables: { accountId: stripShardRealm(accountId) },
    });

    const publicKey = hgraphResponse?.data?.account?.public_key;
    //@ts-ignore
    if (!publicKey) throw new Error('Error retrieving public key for account');

    if (
      !nacl.sign.detached.verify(
        //https://github.com/Hashpack/hashconnect/issues/140 - add quotes because JSON.stringify in Hashpack adds them
        Buffer.from(`"${message}"`),
        Uint8Array.from(Buffer.from(signature, 'base64')),
        Buffer.from(publicKey, 'hex')
      )
    )
      throw new Error('Error verifying signature');

    const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!);
    const { error } = await supabase.from('submission').update({ status }).eq('id', id);

    if (error) throw error;
    else return { success: true };
  } catch (error) {
    //@ts-ignore
    return { error: error?.message || 'Unknown error' };
  }
}
