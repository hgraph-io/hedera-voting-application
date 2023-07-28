// @ts-nocheck
'use client';

import { useState, useEffect, useRef, useContext, createContext } from 'react';
import { TopicMessageSubmitTransaction } from '@hashgraph/sdk';
import HgraphClient from '@hgraph.io/sdk';
import { useHashConnect, useSnackbar } from '@/context';
import TopicMessage from './TopicMessage.gql';
import { SnackbarMessageSeverity } from '@/types';
import type { Vote } from '@/types';

const topicId = process.env.NEXT_PUBLIC_HEDERA_TOPIC_ID;
const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK;

if (!topicId || !network)
  throw new Error('Error: Missing environment variables for submitting vote to Hedera.');

type RatingContextType = {
  state: { [key: string]: any };
  submit: (string, number) => void;
};
const RatingContext = createContext<RatingContextType>({});

export function useRating() {
  return useContext(RatingContext);
}

export default function RatingProvider({ children }: { children: React.ReactNode }) {
  const hgraph = new HgraphClient();
  const { signer } = useHashConnect();
  const [state, setState] = useState({});
  const handleData = useRef(null);
  const { openSnackbar } = useSnackbar();

  const handleNewData = (topic_message) => {
    openSnackbar('new data from hgraph');
    const test = {};

    topic_message.forEach(({ message, payer_account_id }) => {
      const { id, rating } = JSON.parse(Buffer.from(message.substring(2), 'hex').toString());
      if (!test[id]) {
        test[id] = {
          total: 1,
          average: rating,
          ratings: {
            ['0.0.' + payer_account_id]: rating,
          },
        };
      } else {
        // overwrite rating if already exists to take into account most recent rating by admin
        test[id].ratings['0.0.' + payer_account_id] = rating;
        // calculate total
        test[id].total = Object.keys(test[id].ratings).length;
        // calculate average
        test[id].average =
          Object.values(test[id].ratings).reduce((a, b) => a + b) / test[id].total;
      }
    });

    setState(test);
  };

  handleData.current = handleNewData;

  async function submit(id: string, rating: number) {
    const payload: Vote = { id, rating }; // id is submissionId

    const topicMessageTransaction = await new TopicMessageSubmitTransaction()
      .setTopicId(topicId!)
      .setMessage(JSON.stringify(payload))
      .freezeWithSigner(signer);

    const response = await topicMessageTransaction.executeWithSigner(signer);
    openSnackbar(`submission result: ${blah}`, SnackbarMessageSeverity.Error);
  }

  // https://stackoverflow.com/questions/59442329/graphql-subscriptions-inside-a-useeffect-hook-doesnt-access-latest-state
  useEffect(() => {
    if (hgraph) {
      // TODO: this closes the subscription after 1 message is received
      const unsubscribe = hgraph.subscribe(
        {
          query: TopicMessage,
          variables: {
            topic_id: topicId!.split('.')[2],
          },
        },
        {
          //@ts-ignore
          next: ({ data: { topic_message } }) => {
            handleData.current(topic_message);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('complete');
          },
        }
      );
      return unsubscribe;
    }
  }, []);

  return <RatingContext.Provider value={{ state, submit }}>{children}</RatingContext.Provider>;
}
