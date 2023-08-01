'use client';

import { useRating, useHashConnect } from '@/context';
import { Rating, Button, Link, Grid } from '@/components';
import type { Database } from '@/types';
import styles from './styles.module.scss';

type Submission = Database['public']['Tables']['submission']['Row'];

export default function SuperAdminCard({ id, status }: Submission) {
  const { accountId } = useHashConnect();

  return (
    <Grid container spacing={3} className={`${styles.cardContainer}`}>
      <Grid item xs={12}>
        Current Application Status: {status}
        <div className={`${styles.card}`}>
          <div className={styles.left}>
            <Button className={styles.cardButton} variant="outlined">
              Approve
            </Button>
          </div>

          <div className={styles.middle}>
            <Button className={styles.cardButton} variant="outlined">
              Pending
            </Button>
          </div>

          <div className={styles.right}>
            <div>
              <Button className={styles.cardButton} variant="outlined">
                Not Selected
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
