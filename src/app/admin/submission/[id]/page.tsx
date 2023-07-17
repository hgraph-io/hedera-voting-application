import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

import {
  Typography,
  BackButton,
  Container,
  Grid,
  Chip,
  Link,
  VoteCard,
  Rating,
} from '@/components';
import type { Database } from '@/types';
import CurrentVotes from './CurrentVotes';
import TotalVotes from './TotalVotes';
import styles from './styles.module.scss';

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_KEY)
  throw new Error('Missing Supabase URL or Service Key');

export default async function SubmissionPage({ params: { id } }: { params: { id: string } }) {
  const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!);
  const { data: submission } = await supabase
    .from('submission')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();

  if (!submission) notFound();
  const { name, organization, links, topics } = submission;

  return (
    <Grid maxWidth="md" container spacing={3} className={styles.adminDashboard}>
      <Grid item xs={12} spacing={0}>
        <BackButton href="/admin/dashboard" />
      </Grid>
      <Grid item xs={12}>
        <Typography className={styles.title} textAlign="left" variant="h3">
          Application
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Container className={styles.applicationContainer}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="body2">Speaker Name</Typography>
              <Typography variant="h6">{name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Organization</Typography>
              <Typography variant="h6">{organization}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">Relevant Topics:</Typography>
              <div className={styles.topicContainer}>
                {topics!.map((topic, topicIndex) => (
                  <Chip
                    key={topicIndex}
                    label={topic}
                    color="primary"
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      marginTop: '5px',
                      maxWidth: 'unset',
                    }}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Links:</Typography>
              <div className={styles.linksContainer}>
                {links!.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link}
                    variant="body2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h3">Your Vote</Typography>
              <VoteCard />
            </Grid>
            <Grid item xs={12}>
              <div className={styles.titleRow}>
                <Typography variant="h4">Total Votes</Typography> <TotalVotes />
              </div>
              <Rating className={styles.ratingContainer} readOnly />
            </Grid>
            <CurrentVotes />
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
