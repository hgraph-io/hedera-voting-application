require('dotenv').config({ path: '.env.local' })

import { AccountId, PrivateKey, Client, TopicCreateTransaction, TopicId } from '@hashgraph/sdk'

if (
  !process.env.HEDERA_ACCOUNT_PRIVATE_KEY ||
  !process.env.HEDERA_NETWORK ||
  !process.env.HEDERA_ACCOUNT_ID
)
  throw new Error('One of the required env vars has not been set')

if (process.env.HEDERA_TOPIC_ID) throw new Error('Topic already created')

const network = process.env.HEDERA_NETWORK
const accountPrivateKey = PrivateKey.fromString(process.env.HEDERA_ACCOUNT_PRIVATE_KEY)
const accountId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID)

const client = Client[network === 'mainnet' ? 'forMainnet' : 'forTestnet']().setOperator(
  accountId,
  accountPrivateKey,
)

async function main() {
  const transactionId = await new TopicCreateTransaction()
    // make the topic private
    //.setSubmitKey(accountPrivateKey)
    .execute(client)
  const receipt = await transactionId.getReceipt(client)
  const topicId = receipt.topicId as TopicId

  console.log(`Created new topic ${topicId}`)
  process.exit()
}

main()
