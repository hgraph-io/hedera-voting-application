'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useHashConnect, useRating } from '@/context';
import { Button, Rating, CircularProgress } from '@/components';
import styles from './styles.module.scss';

const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK;
const topicId = process.env.NEXT_PUBLIC_HEDERA_TOPIC_ID;

if (!network || !topicId) throw new Error('Missing network or topic id env vars');

export default function VoteCard() {
  const { id } = useParams();
  const { ratingState, submit } = useRating();
  const { accountId } = useHashConnect();
  const [rating, setRating] = useState(0);

  // Loading
  if (!ratingState || !accountId) return <CircularProgress />;

  const recordedRating = ratingState[id as string]?.ratings?.[accountId];

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.bar}></div>
          <div className={styles.speakerLabel}>Account Id</div>
          <div className={styles.speaker}>{accountId}</div>
        </div>

        <div className={styles.middle}>
          <Rating
            onChange={(_, value) => value && setRating(value)}
            className={styles.ratingContainer}
            readOnly={!!recordedRating}
            value={recordedRating || rating}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonLabel}>
            {recordedRating
              ? 'View your vote on the Hedera mainnet'
              : 'You didn’t vote on this application yet'}
          </div>
          <Button
            className={styles.cardButton}
            variant="contained"
            {...(recordedRating
              ? {
                  component: 'a',
                  href: `https://hashscan.io/${network}/topic/${topicId}`,
                  target: '_blank',
                  children: 'View',
                }
              : {
                  onClick: () => submit(id, rating),
                  children: 'Submit Vote',
                })}
          />
        </div>
      </div>
    </div>
  );
}
