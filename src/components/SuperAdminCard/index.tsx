'use client';

import { useHashConnect } from '@/context';
import { Typography, Button, Grid } from '@/components';
import styles from './styles.module.scss';
import type { Database } from '@/types';
import setSubmissionStatus from './setSubmissionStatus';

type Submission = Database['public']['Tables']['submission']['Row'];

const NEXT_PUBLIC_HEDERA_SUPER_ADMINS = JSON.parse(
  process.env.NEXT_PUBLIC_HEDERA_SUPER_ADMINS!
);

export default function SuperAdminCard(submission: Submission) {
  const { accountId, client, initData } = useHashConnect();

  console.log(NEXT_PUBLIC_HEDERA_SUPER_ADMINS);
  console.log('xxxxxxxxxxxx');

  // if (
  //   !accountId ||
  //   !client ||
  //   !initData ||
  //   !NEXT_PUBLIC_HEDERA_SUPER_ADMINS?.includes(accountId)
  // )
  //   return null;

  async function updateStatus(status: string) {
    const signedMessageResponse = await client!.sign(
      initData!.topic,
      accountId!,
      JSON.stringify({ id: submission.id, accountId, status })
    );

    console.log(signedMessageResponse);


    const response = await setSubmissionStatus({
      signature: Buffer.from(signedMessageResponse.userSignature!).toString('hex'),
      message: signedMessageResponse.signedPayload as string,
    });

    console.log(response);
  }

  return (
    <>
      <Typography variant="h4" component="h3" gutterBottom>
        Super Admin Approval
      </Typography>
      <Grid container spacing={3} className={styles.cardContainer}>
        <Grid item xs={12}>
          Current Application Status:{' '}
          <div className={styles.statusLabel}>{submission.status}</div>
          <div className={styles.card}>
            <div className={styles.left}>
              <Button
                className={styles.cardButton}
                onClick={() => updateStatus('Approved')}
                variant={submission.status === 'Approved' ? 'contained' : 'outlined'}
              >
                Approve
              </Button>
            </div>

            <div className={styles.middle}>
              <Button
                className={styles.cardButton}
                onClick={() => updateStatus('Pending')}
                variant={submission.status === 'Pending' ? 'contained' : 'outlined'}
              >
                Pending
              </Button>
            </div>

            <div className={styles.right}>
              <div>
                <Button
                  className={styles.cardButton}
                  onClick={() => updateStatus('Pending')}
                  variant={submission.status === 'Not selected' ? 'contained' : 'outlined'}
                >
                  Not Selected
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
