import { createClient } from '@supabase/supabase-js';
import { AdminCard, Typography, Container, BackButton } from '@/components';
import type { Database } from '@/types';
import styles from './styles.module.scss';

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_KEY)
  throw new Error('Missing Supabase URL or Service Key');
export default async function AdminResultsPage() {
  const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!);

  const { data: submissions } = await supabase.from('submission').select('*');

  return (
    <Container maxWidth="md" className={styles.resultsContainer}>
      <BackButton href="/admin/dashboard" />
      <Typography variant="h3">Voting Results</Typography>
      <Typography>
        Below are the results of the voting process. The top 27 submissions and 5 moderators
        will be selected to be panelists at the conference after voting has been closed.
      </Typography>

      {/*
      <div className={styles.approvedAppContainer}>
        {(submissions?.length || 0) > 0 && (
          <Typography variant="h4" gutterBottom>
            Approved Applications
          </Typography>
        )}
        {submissions?.map((submission: any, index: number) => (
          <AdminCard key={index} {...submission} />
					))}
      </div>
			*/}

      <div className={styles.openAppContainer}>
        {(submissions?.length || 0) > 0 && (
          <Typography variant="h6">Open Applications</Typography>
        )}
        {submissions?.map((submission: any, index: number) => (
          <AdminCard key={index} {...submission} />
        ))}
      </div>
    </Container>
  );
}
