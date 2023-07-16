'use client';

import { useState, useEffect } from 'react';
import { Client, TopicMessageSubmitTransaction } from '@hashgraph/sdk';
import { useHashConnect } from '@/context';
import { Rating } from '@/components';
import type { Vote } from '@/types';
import HgraphClient from '@hgraph.io/sdk';
import TopicMessage from '@/app/admin/vote/TopicMessage.gql';

const hgraph = new HgraphClient();

const topicId = process.env.NEXT_PUBLIC_HEDERA_TOPIC_ID;
const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK;

if (!topicId || !network)
  throw new Error('Error: Missing environment variables for submitting vote to Hedera.');

export default function StarRating(props: {
  className: string;
  icon: React.ReactNode;
  emptyIcon: React.ReactNode;
  defaultValue?: number;
  submissionId: string; //submission id
}) {
  const [rating, setRating] = useState(props.defaultValue ?? 0);
  const { signer } = useHashConnect();
  const { submissionId, ...rest } = props;

  useEffect(() => {
    hgraph.subscribe(
      {
        query: TopicMessage,
        variables: {
          topicId: topicId!.split('.')[2],
        },
      },
      {
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          console.log('complete');
        },
      }
    );
  }, []);

  async function vote(value: number | null) {
    if (!value) throw new Error('Error: No value provided for vote.');

    const payload: Vote = {
      id: submissionId,
      rating: value,
    };
    console.log(payload);

    const topicMessageTransaction = await new TopicMessageSubmitTransaction()
      .setTopicId(topicId!)
      .setMessage(JSON.stringify(payload))
      .freezeWithSigner(signer);

    topicMessageTransaction.executeWithSigner(signer);

    // signer.call(topicMessageTransaction);

    //https://github.com/Hashpack/hashconnect#providersigner
  }

  return <Rating {...rest} onChange={(_, rating) => vote(rating)} />;
}
