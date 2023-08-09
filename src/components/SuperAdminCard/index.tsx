'use client';

import { useRating, useHashConnect } from '@/context';
import { Rating, Button, Link, Grid } from '@/components';
import type { Database } from '@/types';
import { createClient } from '@supabase/supabase-js';
import styles from './styles.module.scss';
import { useState } from 'react';

type Submission = Database['public']['Tables']['submission']['Row'];

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default function SuperAdminCard(submission: Submission) {
  const { accountId } = useHashConnect();
  const [currentStats, setCurrentStatus] = useState(submission.status);

  console.log(submission);
  // TODO: Move this function to be secure usage
  // API route or server side rendering
  const updateApplicationStatus = async (id, newStatus) => {
    const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!);

    const { data, error } = await supabase
      .from('submission')
      .upsert({ ...submission, id: id, status: newStatus })
      .select();

    console.log(data);
    if (!error) {
      setCurrentStatus(data[0].status);
    }
  };

  return (
    <Grid container spacing={3} className={styles.cardContainer}>
      <Grid item xs={12}>
        Current Application Status: <div className={styles.statusLabel}>{currentStats}</div>
        <div className={styles.card}>
          <div className={styles.left}>
            <Button
              className={styles.cardButton}
              onClick={() => updateApplicationStatus(submission.id, 'Approved')}
              variant="outlined"
            >
              Approve
            </Button>
          </div>

          <div className={styles.middle}>
            <Button
              className={styles.cardButton}
              onClick={() => updateApplicationStatus(submission.id, 'Pending')}
              variant="outlined"
            >
              Pending
            </Button>
          </div>

          <div className={styles.right}>
            <div>
              <Button
                className={styles.cardButton}
                onClick={() => updateApplicationStatus(submission.id, 'Not selected')}
                variant="outlined"
              >
                Not Selected
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
