import React, { useState } from 'react';
import { Checkbox, Button, Link } from '@mui/material';
import { Rating } from '@mui/lab';
import { useRouter } from 'next/router';
import styles from './Card.module.scss';

interface CardProps {
  type: 'view' | 'vote' | 'approved' | 'denied' | 'default';
  speaker: string;
  tags: string;
  isSelected: boolean;
  id: number;
  rating: {
    voteNum: number;
    currentRating: number;
  };
}

export const Card: React.FC<CardProps> = ({ type, id, speaker, tags, isSelected, rating }) => {
  const [selected, setSelected] = useState(isSelected);

  const renderRating = () => {
    // get data from Hedera
    // if (type === 'vote' || type === 'view') {
    //   return (
    //     <div>
    //       <div className={styles.ratingLabel}>Current Rating with {rating.voteNum} votes</div>
    //       <Rating className={styles.ratingContainer} name="rating" value={rating.currentRating} readOnly />
    //     </div>
    //   );
    // }
  };

  const renderButton = () => {
      return (
        <>
          <div className={styles.buttonLabel}>You didn’t vote on this application yet</div>
          <Link href={`/application/${id}`} >
            <Button className={styles.cardButton} variant="contained">
              {type}
            </Button>
          </Link>
        </>
      );
  };

  return (
    <div className={`${styles.cardContainer} ${styles[type]}`} onClick={() => {}}>
      <div className={`${styles.card} ${styles[type]}`} onClick={() => {}}>
        <div className={styles.left}>
          <div className={styles.bar}></div>
          <div className={styles.speakerLabel}>Speaker</div>
          <div className={styles.speaker}>{speaker}</div>
        </div>

        <div className={styles.middle}>
          <div className={styles.titleLabel}>Tags</div>
          <div className={styles.title}>{tags}</div>
        </div>

        <div className={styles.right}>
          {type !== 'vote' && type !== 'view' && (
            <>
              <Checkbox
                checked={selected}
                disabled={true}
                className={styles.checkBox}
                onChange={() => setSelected(!selected)}
              />
              {type}
            </>
          )}
          {renderRating()}
        </div>
      </div>

      {(type === 'vote' || type === 'view') && (
          <div className={styles.buttonContainer}>
            {renderButton()} 
          </div>
        )
      }
    </div>
  );
};

export default Card;
