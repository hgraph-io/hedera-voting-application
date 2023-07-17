'use client';

import { useParams } from 'next/navigation';
import { useHashConnect, useRating } from '@/context';
import { Button, Rating } from '@/components';
import styles from './styles.module.scss';

const network = process.env.NEXT_PUBLIC_HEDERA_NETWORK;
const topicId = process.env.NEXT_PUBLIC_HEDERA_TOPIC_ID;

if (!network || !topicId) throw new Error('Missing network or topic id env vars');

export default function VoteCard() {
  const { id } = useParams();
  const { accountId } = useHashConnect();
  const { state } = useRating();

  const currentAccountRating = accountId && state?.[id]?.ratings?.[accountId];
  console.log('xxxxxx');
  console.log(currentAccountRating);

  const RightComponent = () => {
    if (currentAccountRating)
      return (
        <div className={styles.buttonContainer}>
          <div className={styles.buttonLabel}>View your vote on the Hedera mainnet</div>
          <Button
            component="a"
            className={styles.cardButton}
            variant="contained"
            // TODO: link to actual transaction
            href={`https://hashscan.io/${network}/topic/${topicId}`}
            target="_blank"
          >
            View
          </Button>
        </div>
      );
    else
      return (
        <div className={styles.buttonContainer}>
          <div className={styles.buttonLabel}>You didn’t vote on this application yet</div>
          <Button
            className={styles.cardButton}
            variant="contained"
            onClick={() => alert('where should this go')}
          >
            Submit Vote
          </Button>
        </div>
      );
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.bar}></div>
          <div className={styles.speakerLabel}>Account Id</div>
          <div className={styles.speaker}>{accountId}</div>
        </div>

        <div className={styles.middle}>
          <Rating className={styles.ratingContainer} readOnly={currentAccountRating} />
        </div>
      </div>
      <div className={styles.right}>
        <RightComponent />
      </div>
    </div>
  );
}
