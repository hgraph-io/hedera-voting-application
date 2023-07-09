import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types';
import { Typography, Container, Button, Card } from '@/components';
import styles from './styles.module.scss';

export default async function AdminDashboardPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: submissions } = await supabase.from('applications').select('*');
  console.log(submissions);

  return (
    <Container maxWidth="md" className={styles.adminDashboardContainer}>
      <div className={styles.header}>
        <Typography variant="h3">Committee Dashboard</Typography>
        <Typography component="p">
          Welcome to the Committee Panel of the Call for Papers!
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
