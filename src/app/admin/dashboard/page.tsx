import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
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
  Rating,
  VoteCard,
  StarBorderIcon,
} from '@/components';
import type { Database } from '@/types';
import styles from './styles.module.scss';

//`https://explore.lworks.io/mainnet/topics/0.0.1350036/messages/${userVoteData.sequence_number}`
//
// https://github.com/vercel/next.js/issues/49373
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: submissions } = await supabase.from('submission').select('*');
  const router = useRouter();
  const voteAverage = 0;

  return (
    <Grid container spacing={3} className={styles.adminDashboard}>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => router.back()} className={styles.backButton}>
          Back
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography className={styles.title} textAlign="left" variant="h3">
          Application
        </Typography>
      </Grid>
      {submissions?.map((data, index) => (
        <Grid xs={12} key={index}>
          <Container className={styles.applicationContainer}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="body2">Speaker Name</Typography>
                <Typography variant="h6">{data.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Relevant Topics:</Typography>
                {/*
                <div className={styles.topicContainer}>
                  {data.topics.map((topic, topicIndex) => (
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
								*/}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Links:</Typography>
                {/*
                <div className={styles.linksContainer}>
                  {data.links.map((link, linkIndex) => (
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
									*/}
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
                <div className={styles.rating}>
                  <Rating
                    className={styles.ratingContainer}
                    name="user-rating"
                    value={voteAverage}
                    icon={<StarBorderIcon style={{ color: '#07E78E', fontSize: 40 }} />}
                    emptyIcon={<StarBorderIcon style={{ color: '#ebebeb', fontSize: 40 }} />}
                  />
                </div>
                <Typography variant="body2">{voteAverage} out of 5</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Below you can see all of the current votes on this application:
                </Typography>
                <TableContainer component={Paper} className={styles.voteTable}>
                  <Table>
                    {/*
                    <TableBody>
                      {votes.map((vote) => (
                        <TableRow key={vote.accountId}>
                          <TableCell>Account: {vote.accountId}</TableCell>
                          <TableCell>Vote: {vote.choice}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
										*/}
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      ))}
    </Grid>
  );
}
