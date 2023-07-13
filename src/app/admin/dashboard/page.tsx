import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types';
import { Typography, Container, Button, Card } from '@/components';
import styles from './styles.module.scss';

export default async function AdminDashboardPage() {
  // const supabase = createServerComponentClient<Database>({ cookies });
  // const supabase = createClient<Database>(
  //   // process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   'http://localhost:54321',
  //   process.env.SUPABASE_SERVICE_KEY!
  // );
  // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

  // const { data: submissions } = await supabase.from('submission').select('*');
  // console.log(submissions);
  const submissions = await (
    await fetch('http://localhost:54321/rest/v1/submission?select=*')
  ).json();

  return (
    <Container maxWidth="md" className={styles.adminDashboardContainer}>
      <div className={styles.header}>
        <Typography variant="h3">Admin Dashboard</Typography>
        <Typography component="p">
          Welcome to the Admin Panel of the Hedera Voting Application!
        </Typography>
        <Typography component="p" gutterBottom>
          This is your command center for managing all aspects of the voting process. Monitor
          voter registrations, oversee ballot details, and analyze real-time voting data.
        </Typography>
        <Button component="a" variant="outlined" href="/admin/results">
          View All
        </Button>
      </div>

      <Typography variant="h4">Applications</Typography>
      <Typography className={styles.descriptionParagraph} component="p">
        Below you can review, manage and select applications from individuals eager to share
        their insights at our upcoming conference.
      </Typography>

      <div>
        {/* // @ts-ignore */}
        {submissions?.map((submission) => (
          <Card key={submission.id} {...submission} />
        ))}
      </div>
    </Container>
  );
}
