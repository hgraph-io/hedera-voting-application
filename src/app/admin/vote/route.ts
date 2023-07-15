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
const topicId = TopicId.fromString(process.env.TOPIC_ID!);
const operatorId = AccountId.fromString(process.env.ACCOUNT_ID!);
const operatorKey = PrivateKey.fromString(process.env.ACCOUNT_PRIVATE_KEY!);
const client = Client.forMainnet().setOperator(operatorId, operatorKey);
const submitKey = PrivateKey.fromString(process.env.SUBMIT_KEY!);

export async function POST(message: Vote) {
  // Submit topic id message
  let topicMessageTransaction = new TopicMessageSubmitTransaction()
    .setTopicId(topicId)
    .setMessage(JSON.stringify(message))
    .freezeWith(client);

  const receipt = await (
    await (await topicMessageTransaction.sign(submitKey)).execute(client)
  ).getReceipt(client);

  console.log(receipt);
  return receipt;
}

/*
 *
 */

const hg = new HgraphClient();
export async function GET() {
  return hg.query(TopicMessage);
}
