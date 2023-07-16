'use client';
import { Rating } from '@/components';
import { TopicMessageSubmitTransaction } from '@hashgraph/sdk';
import type { Vote } from '@/types';

async function vote(submissionId: string, value: number | null) {
  if (!value) throw new Error('Error: No value provided for vote.');

  alert(value);
  const payload: Vote = {
    id: submissionId,
    rating: value,
  };

  const response = await fetch('/admin/vote', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Error submitting vote');

  const {
    bytes: { data },
  } = await response.json();
  const bytes = Buffer.from(data);
  const topicMessageTransaction = TopicMessageSubmitTransaction.fromBytes(bytes);
  console.log(topicMessageTransaction);
}

export default function StarRating(props: {
  className: string;
  icon: React.ReactNode;
  emptyIcon: React.ReactNode;
  value?: number;
  submissionId: string; //submission id
}) {
  const { submissionId, ...rest } = props;

  return <Rating {...rest} onChange={(_, rating) => vote(submissionId, rating)} />;
}
