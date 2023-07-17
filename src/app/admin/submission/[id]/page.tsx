import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

import {
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Chip,
  Link,
  VoteCard,
  StarBorderIcon,
  StarIcon,
} from '@/components';
import type { Database } from '@/types';
import Rating from './Rating';
import CurrentVotes from './CurrentVotes';
import styles from './styles.module.scss';

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_KEY)
  throw new Error('Missing Supabase URL or Service Key');

export default async function AdminDashboard({ params: { id } }: { params: { id: string } }) {
  const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_KEY!);
  const { data: submission } = await supabase
    .from('submission')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();

  if (!submission) notFound();
  const { name, organization, links, topics, moderator } = submission;

  return (
    <Grid container spacing={3} className={styles.adminDashboard}>
      <Grid item xs={12}>
        <Button
          component="a"
          href="/admin/dashboard"
          variant="outlined"
          className={styles.backButton}
        >
          Back
        </Button>
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

            {/*!userVoted ? (
                <Grid item xs={12}>
                  <VoteCard
                    id={data.id}
                    speaker={data.name}
                    tags={data.topics.join(', ')}
                    type="vote"
                    rating={{
                      voteNum: votes.length,
                      currentRating: votes.reduce((a, v) => a + v.vote, 0) / votes.length,
                    }}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h4">Your Vote</Typography>
                  <VoteCard
                    id={data.id}
                    type="view"
                    hederaMainnetUrl={voteLink}
                    rating={{
                      voteNum: votes.length,
                      currentRating: userVote,
                    }}
                  />
                </Grid>
								)*/}
            <Grid item xs={12}>
              <div className={styles.titleRow}>
                {/*<Typography variant="h4">Total Votes</Typography> ({votes.length} votes) */}
              </div>
              <Rating
                className={styles.ratingContainer}
                icon={<StarIcon style={{ color: '#07E78E', fontSize: 40 }} />}
                emptyIcon={<StarBorderIcon style={{ color: '#ebebeb', fontSize: 40 }} />}
              />
            </Grid>
            <CurrentVotes />
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
