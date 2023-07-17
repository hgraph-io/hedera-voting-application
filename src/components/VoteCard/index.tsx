'use client';

import { useHashConnect } from '@/context';
import { Button, Rating, StarIcon, StarBorderIcon } from '@/components';
import styles from './styles.module.scss';

export default function VoteCard() {
  const { accountId } = useHashConnect();
  const type = 'vote';
  const RightComponent = () => {
    if (type === 'vote') {
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
    }

    if (type === 'view') {
      return (
        <div className={styles.buttonContainer}>
          <div className={styles.buttonLabel}>View your vote on the Hedera mainnet</div>
          <Button
            className={styles.cardButton}
            variant="contained"
            // NEXT_PUBLIC_HEDERA_TOPIC_ID='0.0.15412191'
            onClick={() => window.open(`https://hashscan.io/`, '_blank')}
          >
            View
          </Button>
        </div>
      );
    }

    return null;
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
          <div className={styles.ratingLabel}>Your Vote</div>
          <Rating
            className={styles.ratingContainer}
            icon={<StarIcon style={{ color: '#07E78E', fontSize: 40 }} />}
            emptyIcon={<StarBorderIcon style={{ color: '#ebebeb', fontSize: 40 }} />}
          />
        </div>

        <div className={styles.right}>
          <RightComponent />
        </div>
      </div>
    </div>
  );
}
