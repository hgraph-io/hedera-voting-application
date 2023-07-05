import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Typography, Container, Button, Card } from '@/components';
import type { Database } from '@/types';
import styles from './styles.module.scss';

async function fetchApplications() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase.from('applications').select('*');

  if (error) throw new Error('Error loading applications');

  return data.map((application) => ({
    ...application,
    // type: application.votes.includes(user?.accountId) ? 'vote' : 'view',
    type: true ? 'vote' : 'view',
  }));
}

export default async function AdminDashboardPage() {
  const applications = await fetchApplications();

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
        {applications.map(
          (
            app: any //todo
          ) => (
            <Card
              key={app.id}
              id={app.id}
              moderator={app.moderator}
              applicationId={app.applicationId}
              rating={app.rating}
              speaker={app.name}
              isSelected={app.isSelected}
              type={app.type}
            />
          )
        )}
      </div>
    </Container>
  );
}
