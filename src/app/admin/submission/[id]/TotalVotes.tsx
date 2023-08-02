'use client';

import { useParams } from 'next/navigation';
import { useRating } from '@/context';
import { Rating, Typography } from '@/components';
import styles from './styles.module.scss';

export default function TotalVotes() {
  const { id } = useParams();
  const { ratingState } = useRating();
  const ratings = ratingState?.[id];
  return (
    <>
      <div className={styles.titleRow}>
        <Typography variant="h4">Total Votes</Typography>{' '}
        <span>{ratings?.total ? '('+ratings?.total + ' votes)' : ''}</span>
      </div>
      <Rating
        className={styles.ratingContainer}
        average={ratings?.average || ''}
        value={ratings?.average || ''}
        readOnly={true}
      />
    </>
  );
}
