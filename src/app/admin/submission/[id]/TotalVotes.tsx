'use client';

import { useParams } from 'next/navigation';
import { useRating } from '@/context';
import { Rating, Typography } from '@/components';
import styles from './styles.module.scss';

export default function TotalVotes() {
  const { id } = useParams();
  const { state } = useRating();
  const ratings = state?.[id];
  return (
    <>
      <div className={styles.titleRow}>
        <Typography variant="h4">Total Votes</Typography>{' '}
        <span>({ratings?.total || 0} votes)</span>
      </div>
      <Rating
        className={styles.ratingContainer}
        average={ratings?.average || 0}
        value={ratings?.average || 0}
        readOnly={true}
      />
    </>
  );
}
