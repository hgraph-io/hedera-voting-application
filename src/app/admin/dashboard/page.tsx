import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types';
import { Typography, Container, Button, AdminCard } from '@/components';
import styles from './styles.module.scss';

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_KEY)
  throw new Error('Missing Supabase URL or Service Key');

export default async function AdminDashboardPage() {
  const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!);

  const { data: submissions } = await supabase.from('submission').select('*');

  return (
    <Container maxWidth="md" className={styles.adminDashboardContainer}>
      <div className={styles.header}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography component="p" gutterBottom>
          Welcome to the Admin Panel of the Hedera Voting Application!
        </Typography>
        <Typography component="p" gutterBottom>
          This is your command center for managing all aspects of the voting process. Monitor
          voter registrations, oversee ballot details, and analyze real-time voting data.
        </Typography>
        <Button component="a" variant="contained" href="/admin/results">
          View All
        </Button>
      </div>

      <Typography variant="h4" component="h2" gutterBottom>
        Submissions
      </Typography>
      <Typography className={styles.descriptionParagraph} component="p" gutterBottom>
        Below you can review, manage and select applications from individuals eager to share
        their insights at our upcoming conference.
      </Typography>

      <div>
        {submissions?.map(
          (
            submission: any // TODO:
          ) => (
            <AdminCard key={submission.id} {...submission} />
          )
        )}
      </div>
    </Container>
  );
}
