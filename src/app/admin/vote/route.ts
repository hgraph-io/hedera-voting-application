import { NextResponse } from 'next/server';
import {
  AccountId,
  PrivateKey,
  Client,
  TopicMessageSubmitTransaction,
  TopicId,
} from '@hashgraph/sdk';
import HgraphClient from '@hgraph.io/sdk';
import TopicMessage from './TopicMessage.gql';

import type { Vote } from '@/types';

/*
 * Submit a new vote  #TODO: this could be done directly through hashpack
 */

const { HEDERA_TOPIC_ID, HEDERA_ACCOUNT_ID, HEDERA_ACCOUNT_PRIVATE_KEY, HEDERA_NETWORK } =
  process.env;

if (!HEDERA_TOPIC_ID || !HEDERA_ACCOUNT_ID || !HEDERA_ACCOUNT_PRIVATE_KEY || !HEDERA_NETWORK)
  throw new Error('All required .env variables are not set');

const topicId = TopicId.fromString(HEDERA_TOPIC_ID);
// const operatorId = AccountId.fromString(HEDERA_ACCOUNT_ID);
// const operatorKey = PrivateKey.fromString(HEDERA_ACCOUNT_PRIVATE_KEY);
// const client = Client[HEDERA_NETWORK === 'mainnet' ? 'forMainnet' : 'forTestnet']().setOperator(
//   operatorId,
//   operatorKey
// );

const submitKey = PrivateKey.fromString(HEDERA_ACCOUNT_PRIVATE_KEY);

export async function POST(request: Request) {
  const json = await request.json();
  console.log(json);
  // Submit topic id message
  let topicMessageTransaction = await new TopicMessageSubmitTransaction()
    .setTopicId(topicId)
    .setMessage(JSON.stringify(json))
    .sign(submitKey);

  const bytes = topicMessageTransaction.freeze().toBytes();

  console.log(bytes);

  return NextResponse.json({ bytes });

  // const receipt = await (
  //   await (await topicMessageTransaction.sign(submitKey)).execute(client)
  // ).getReceipt(client);

  // console.log(receipt);
  // // return NextResponse.json({ receipt: JSON.stringify(receipt) });
  // return NextResponse.json({ receipt });
}

/*
 *
 */

const hg = new HgraphClient();
export async function GET() {
  return hg.query(TopicMessage);
}
