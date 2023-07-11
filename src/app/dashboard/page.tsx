import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Typography, Container, Button } from '@/components';
import Card from '@/components/Card';
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
        <Typography align="left" color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo
          vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo
          vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo
          vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
        </Typography>
        <Button
          component="a"
          href="/submission"
          className={styles.buttonContainer}
          variant="contained"
        >
          Submit New Application
        </Button>
      </div>
      <div className={styles.cardContainer}>
        {!!submissions!.length && <Typography variant="h4">Previous Applications</Typography>}
        <div className={styles.cardContainer}>
          {/*// @ts-ignore */}
          {submissions.map((submission, index) => (
            <Card key={index} {...submission} />
          ))}
        </div>
      </div>
    </Container>
  );
}
