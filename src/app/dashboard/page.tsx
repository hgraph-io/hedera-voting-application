import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, Typography, Container, Button } from '@/components';
import type { Database } from '@/types';
import styles from './styles.module.scss';

export default async function DashboardPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: submissions } = await supabase
    .from('submission')
    .select('*')
    .eq('user_id', session!.user.id);

  console.log(submissions);

  return (
    <Container maxWidth="md" className={styles.dashboardContainer}>
      <div className={styles.header}>
        <Typography component="h1" variant="h3" align="left" color="textPrimary" gutterBottom>
          Dashboard
        </Typography>
        <Typography align="left" color="textSecondary" gutterBottom>
          Welcome to the Hedera conference submission portal. Here, you can submit your papers
          and track your submission status.
        </Typography>
        <div className={styles.buttonContainer}>
          <Button component="a" href="/submission" variant="contained">
            Submit New Application
          </Button>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {submissions && !!submissions!.length && (
          <Typography variant="h4">Previous Applications</Typography>
        )}
        <div className={styles.cardContainer}>
          {/*// @ts-ignore */}
          {submissions?.map((submission, index) => {
            /*// @ts-ignore */
            return <Card key={index} {...submission} />;
          })}
        </div>
      </div>
    </Container>
  );
}
