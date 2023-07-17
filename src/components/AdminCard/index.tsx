'use client';

import { useRating, useHashConnect } from '@/context';
import { Rating, Button, Link, Grid } from '@/components';
import type { Database } from '@/types';
import styles from './styles.module.scss';

type Submission = Database['public']['Tables']['submission']['Row'];

export default function AdminCard({ id, name, moderator }: Submission) {
  const { accountId } = useHashConnect();
  const { state } = useRating();
  console.log(id);

  // console.log(state);
  const submissionRatings = state?.[id];
  // console.log(submissionRatings);
  console.log('yyyyyyyyyyyyyyy');
  // console.log(accountId);
  const currentAdminRating = accountId && submissionRatings?.ratings?.[accountId]
  console.log(currentAdminRating);

  return (
    <Grid container spacing={3}>
      <Grid item xs={9}>
        <Link
          href={`/admin/submission/${id}`}
          className={`${styles.cardContainer} {$styles.vote}`}
        >
          <div className={`${styles.card} ${styles.vote}`}>
            <div className={styles.left}>
              <div className={styles.bar}></div>
              <div className={styles.speakerLabel}>Name</div>
              <div className={styles.speaker}>{name}</div>
            </div>

            <div className={styles.middle}>
              <div className={styles.titleLabel}>Moderator</div>
              <div className={styles.title}>{moderator ? 'True' : 'False'}</div>
            </div>

            <div className={styles.right}>
              <div>
                <div className={styles.ratingLabel}>
                  Current Rating with {submissionRatings?.total || 0} votes
                </div>
                <Rating
                  className={styles.ratingContainer}
                  average={submissionRatings?.average || 0}
                  value={submissionRatings?.average || 0}
                  readOnly
                />
              </div>
            </div>
          </div>
        </Link>
      </Grid>
      <Grid
        container
        item
        xs={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {!currentAdminRating && (
          <div className={styles.buttonLabel}>You didn’t vote on this application yet</div>
        )}
        <Link href={`/admin/submission/${id}`} sx={{ width: '100%' }}>
          <Button className={styles.cardButton} variant="outlined">
            {currentAdminRating ? 'View' : 'Vote'}
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
