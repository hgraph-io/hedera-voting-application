'use client';

import { useHashConnect } from '@/context';
import { Typography, Button, Grid } from '@/components';
import styles from './styles.module.scss';
import type { Database } from '@/types';
import submit from './submit';

type Submission = Database['public']['Tables']['submission']['Row'];

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_HEDERA_SUPER_ADMINS } = process.env;

export default function SuperAdminCard(submission: Submission) {
  const { accountId } = useHashConnect();
  const [currentStats, setCurrentStatus] = useState(submission.status);

	async function updateApplicationStatus(id: string, newStatus: string, walletId: string) {
  }

  if (!accountId || !NEXT_PUBLIC_HEDERA_SUPER_ADMINS?.includes(accountId)) return null;

  return (
    <Grid item xs={12}>
      <Typography variant="h4" component="h3" gutterBottom>
        Super Admin Approval
      </Typography>
      <Grid container spacing={3} className={styles.cardContainer}>
        <Grid item xs={12}>
          Current Application Status: <div className={styles.statusLabel}>{currentStats}</div>
          <div className={styles.card}>
            <div className={styles.left}>
              <Button
                className={styles.cardButton}
                onClick={() => updateApplicationStatus(submission.id, 'Approved')}
                variant={submission.status === 'Approved' ? 'contained' : 'outlined'}
              >
                Approve
              </Button>
            </div>

            <div className={styles.middle}>
              <Button
                className={styles.cardButton}
                onClick={() => updateApplicationStatus(submission.id, 'Pending')}
                variant={submission.status === 'Pending' ? 'contained' : 'outlined'}
              >
                Pending
              </Button>
            </div>

            <div className={styles.right}>
              <div>
                <Button
                  className={styles.cardButton}
                  onClick={() => updateApplicationStatus(submission.id, 'Not selected')}
                  variant={submission.status === 'Not selected' ? 'contained' : 'outlined'}
                >
                  Not Selected
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
