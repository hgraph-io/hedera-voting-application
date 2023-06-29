import React, { useState } from 'react';
import { Button, Link } from '@mui/material';
import { Rating } from '@mui/lab';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';  // path to UserContext
import styles from './VoteCard.module.scss'; // create a corresponding stylesheet

interface VoteCardProps {
  speaker: string;
  tags: string[];
  id: number;
  rating: {
    voteNum: number;
    currentRating: number;
  };
}

export const VoteCard: React.FC<VoteCardProps> = ({ id, speaker, tags, rating }) => {
  const [userVote, setUserVote] = useState<number | null>(0);
  const user = useUser();
  const { accountId, type: userType } = user || {};

  const renderRating = () => (
    <div>
      <div className={styles.ratingLabel}>Current Rating with {rating.voteNum} votes</div>
      <Rating
        className={styles.ratingContainer}
        name="rating"
        value={rating.currentRating}
        readOnly
        icon={<StarIcon style={{ color: '#07E78E', fontSize: 40 }} />}
        emptyIcon={<StarBorderIcon style={{ color: '#07E78E', fontSize: 40 }} />}
      />
    </div>
  );

  const handleVoteChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setUserVote(newValue);
  };

  const handleVoteSubmit = async () => {
    user?.setLoading(true)
    const voteData = {
      accountId,
      choice: userVote,
      ballotId: 'application-'+id
    };

    try {
      const res = await axios.post('/api/voting-submission', voteData);
      user?.setLoading(false)
    } catch (error) {
      console.error('Error submitting vote', error);
      user?.setLoading(false)
    }
  };

  return (
    <div className={`${styles.cardContainer}}`} onClick={() => {}}>
      <div className={`${styles.card} }`} onClick={() => {}}>
        <div className={styles.left}>
          <div className={styles.bar}></div>
          <div className={styles.speakerLabel}>Account Id</div>
          <div className={styles.speaker}>{user?.accountId}</div>
        </div>

        <div className={styles.middle}>
          <div className={styles.ratingLabel}>Your Vote</div>
          <Rating
            className={styles.ratingContainer}
            name="user-rating"
            value={userVote}
            onChange={handleVoteChange}
            icon={<StarIcon style={{ color: '#07E78E', fontSize: 40 }} />}
            emptyIcon={<StarBorderIcon style={{ color: '#07E78E', fontSize: 40 }} />}
          />
        </div>

        <div className={styles.right}>
            <div className={styles.buttonContainer}>
                <div className={styles.buttonLabel}>You didn’t vote on this application yet</div>
                <Button className={styles.cardButton} variant="contained" onClick={handleVoteSubmit}>
                    Submit Vote
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VoteCard;
