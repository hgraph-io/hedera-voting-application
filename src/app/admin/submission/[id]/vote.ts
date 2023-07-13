import {
  AccountId,
  PrivateKey,
  Client,
  TopicMessageSubmitTransaction,
  TopicId,
} from '@hashgraph/sdk';

import type { Vote } from '@/types';

const operatorId = AccountId.fromString(process.env.GLOBAL_TMLP_TOPIC_ACCOUNT_ID as string);
const operatorKey = PrivateKey.fromString(process.env.GLOBAL_TMLP_TOPIC_ACCOUNT_PK as string);
const client = Client.forMainnet().setOperator(operatorId, operatorKey);
const submitKey = PrivateKey.fromString(process.env.VOTING_SUBMIT_KEY as string);
const topicId = TopicId.fromString(process.env.VOTING_TOPIC_ID as string);

export default async function vote(message: Vote) {
	console.log('vote', message);
	return
  // // Submit topic id message
  // let topicMessageTransaction = new TopicMessageSubmitTransaction()
  //   .setTopicId(topicId)
  //   .setMessage(JSON.stringify(message))
  //   .freezeWith(client);

  // const receipt = await (
  //   await (await topicMessageTransaction.sign(submitKey)).execute(client)
  // ).getReceipt(client);

  // console.log(receipt);
  // return receipt;
}
