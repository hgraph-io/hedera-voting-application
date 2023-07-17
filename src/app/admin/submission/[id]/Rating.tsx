'use client';

import { useParams } from 'next/navigation'
import { useRating, useHashConnect } from '@/context';
import { Rating, Typography } from '@/components';
import styles from './styles.module.scss';

export default function StarRating(props: {
  className: string;
  icon: React.ReactNode;
  emptyIcon: React.ReactNode;
}) {
	const {id} = useParams();
  const { accountId } = useHashConnect();
  const { state, submit } = useRating();

  return (
    <div className={styles.rating}>
      <Rating
        value={(accountId && state[id]?.ratings?.[accountId]) || 0}
        onChange={(_: any, newRating: number | null) => submit(id, newRating)}
        {...props}
      />
      <Typography variant="body2">{state[id]?.average} out of 5</Typography>
    </div>
  );
}
