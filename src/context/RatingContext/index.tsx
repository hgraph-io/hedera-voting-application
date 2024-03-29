// @ts-nocheck
'use client'

import { useState, useEffect, useContext, createContext } from 'react'
import { usePathname } from 'next/navigation'
import { Client, TopicMessageSubmitTransaction } from '@hashgraph/sdk'
import HgraphClient from '@hgraph.io/sdk'
import { useHashConnect, useSnackbar } from '@/context'
import { Container, CircularProgress } from '@/components'
import TopicMessage from './TopicMessage.gql'
import { SnackbarMessageSeverity } from '@/types'
import type { Vote } from '@/types'
import verifyAndSignMessage from './verifyAndSignTransaction'

const topicId = process.env.NEXT_PUBLIC_HEDERA_TOPIC_ID
const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK
const superAdmins = JSON.parse(process.env.NEXT_PUBLIC_HEDERA_SUPER_ADMINS)
const votingAdmins = JSON.parse(process.env.NEXT_PUBLIC_HEDERA_VOTING_ADMINS)

if (!topicId || !network || !superAdmins || !votingAdmins)
  throw new Error('Error: Missing environment variables for submitting vote to Hedera.')

type RatingContextType = {
  ratingState: { [key: string]: any }
  votingAdmins: [string]
  superAdmins: [string]
  submit: (string, number) => void
}
const RatingContext = createContext<RatingContextType>({})

export function useRating() {
  return useContext(RatingContext)
}

export default function RatingProvider({ children }: { children: React.ReactNode }) {
  const { signer, accountId } = useHashConnect()
  const [ratingState, setRatingState] = useState({})
  const { openSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  /*
   * Submit a vote to Hedera
   */
  async function submit(id: string, rating: number) {
    try {
      const payload: Vote = { id, rating } // id is submissionId

      // create and freeze transaction
      const _topicMessageTransaction = (
        await new TopicMessageSubmitTransaction()
          .setTopicId(topicId!)
          .setMessage(JSON.stringify(payload))
          .freezeWithSigner(signer)
      ).toBytes()

      // send to backend to sign
      const signedTransaction = await verifyAndSignMessage(
        Buffer.from(_topicMessageTransaction).toString('base64')
      )

      // get signed transaction from backend
      const topicMessageTransaction = TopicMessageSubmitTransaction.fromBytes(
        Buffer.from(signedTransaction, 'base64')
      )

      // submit signed transaction to Hedera
      const response = await topicMessageTransaction.executeWithSigner(signer)
      if (!response?.transactionId)
        throw new Error('There’s been an error submitting your vote. Please try again.')
      openSnackbar(`Success! Your vote has been submitted.`, SnackbarMessageSeverity.Success)
    } catch (e) {
      console.error(e)
      openSnackbar(e.message, SnackbarMessageSeverity.Error)
    }
  }

  useEffect(() => {
    if (pathname === '/admin') setLoading(false)
    if (accountId && votingAdmins.includes(accountId)) {
      /* Get ledger data from Hgraph */
      const hgraph = new HgraphClient()
      hgraph
        .query({
          query: TopicMessage,
          variables: {
            topic_id: topicId!.split('.')[2],
          },
        })
        .then(({ data: { topic_message } }) => {
          const newRatingState = {}
          topic_message.forEach(({ message, payer_account_id }) => {
            const { id, rating } = JSON.parse(
              Buffer.from(message.substring(2), 'hex').toString()
            )
            if (!newRatingState[id]) {
              newRatingState[id] = {
                total: 1,
                average: rating,
                ratings: {
                  ['0.0.' + payer_account_id]: rating,
                },
              }
            } else {
              // overwrite rating if already exists to take into account most recent rating by admin
              newRatingState[id].ratings['0.0.' + payer_account_id] = rating
              // calculate total
              newRatingState[id].total = Object.keys(newRatingState[id].ratings).length
              // calculate average
              newRatingState[id].average =
                Object.values(newRatingState[id].ratings).reduce((a, b) => a + b) /
                newRatingState[id].total
            }
          })
          setRatingState(newRatingState)
          setLoading(false)
        })
    }
  }, [accountId, pathname])

  if (loading)
    return (
      <Container
        sx={{
          display: 'flex',
          height: 'calc(100vh - 64px)', // quick estimate of appbar heigh
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    )

  return (
    <RatingContext.Provider value={{ ratingState, votingAdmins, superAdmins, submit }}>
      {children}
    </RatingContext.Provider>
  )
}
