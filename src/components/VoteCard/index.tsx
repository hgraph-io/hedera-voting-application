'use client';

import React, { useState } from 'react';
import { Button, Rating, StarBorderIcon } from '@/components';
import axios from 'axios';
import styles from './styles.module.scss';

interface VoteCardProps {
  id: number;
  // todo
  // are these optional?
  hederaMainnetUrl?: string;
  speaker?: string;
  tags?: string;
  rating: {
    voteNum: number;
    currentRating: number;
  };
  type: 'vote' | 'view';
  user: any; // hashpack user
}

export const VoteCard: React.FC<VoteCardProps> = ({
  id,
  rating,
  type,
  hederaMainnetUrl,
  user,
}) => {
  const [userVote, setUserVote] = useState<number | null>(0);
  const { accountId } = user || {};

  const handleVoteChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setUserVote(newValue);
  };

  const handleVoteSubmit = async () => {
    user?.setLoading(true);
    const voteData = {
      accountId,
      choice: userVote,
      ballotId: 'application-' + id,
    };

    try {
      const res = await axios.post('/api/voting-submission', voteData);
      user?.setLoading(false);
    } catch (error) {
      console.error('Error submitting vote', error);
      user?.setLoading(false);
    }
  };

  const RightComponent = () => {
    if (type === 'vote') {
      return (
        <div className={styles.buttonContainer}>
          <div className={styles.buttonLabel}>You didn’t vote on this application yet</div>
          <Button className={styles.cardButton} variant="contained" onClick={handleVoteSubmit}>
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
            onClick={() => window.open(hederaMainnetUrl, '_blank')}
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
            name="user-rating"
            value={rating.currentRating}
            onChange={handleVoteChange}
            icon={<StarBorderIcon style={{ color: '#07E78E', fontSize: 40 }} />}
            emptyIcon={<StarBorderIcon style={{ color: '#ebebeb', fontSize: 40 }} />}
          />
        </div>

        <div className={styles.right}>
          <RightComponent />
        </div>
      </div>
    </div>
  );
};

export default VoteCard;
