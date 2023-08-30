'use server'

import { AccountId, PrivateKey, Client, TopicMessageSubmitTransaction } from '@hashgraph/sdk'

const NEXT_PUBLIC_HEDERA_VOTING_ADMINS = JSON.parse(process.env.NEXT_PUBLIC_HEDERA_VOTING_ADMINS!)
const NEXT_PUBLIC_HEDERA_TOPIC_ID = process.env.NEXT_PUBLIC_HEDERA_TOPIC_ID

export default async function verifyAndSignTransaction(_topicMessageTransaction: string) {
  // get transaction from bytes
  const topicMessageTransaction = TopicMessageSubmitTransaction.fromBytes(
    Buffer.from(_topicMessageTransaction, 'base64')
  ) as TopicMessageSubmitTransaction

  // get payerAccountId and topicId from transaction
  const payerAccountId = topicMessageTransaction.transactionId?.accountId?.toString()
  const topicId = topicMessageTransaction.topicId?.toString()

  // verify front end is authorized to vote on applications
  if (
    !payerAccountId ||
    !(NEXT_PUBLIC_HEDERA_TOPIC_ID === topicId) ||
    !NEXT_PUBLIC_HEDERA_VOTING_ADMINS!.includes(payerAccountId)
  )
    throw new Error('This account is not authorized to vote on applications')

  // sign transaction with submit key
  const network = process.env.HEDERA_NETWORK
  const accountPrivateKey = PrivateKey.fromString(process.env.HEDERA_ACCOUNT_PRIVATE_KEY!)
  const accountId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!)

  const client = Client[network === 'mainnet' ? 'forMainnet' : 'forTestnet']().setOperator(
    accountId,
    accountPrivateKey
  )

  return Buffer.from(
    (await topicMessageTransaction.signWithOperator(client)).toBytes()
  ).toString('base64')
}
