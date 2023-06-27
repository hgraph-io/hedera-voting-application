import React, { useEffect, useState } from 'react';
import styles from './ApplicationPage.module.scss';
import { Typography, Button, Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead, Grid, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserContext'; // import the useUser hook
import VoteCard from './VoteCard'; // import the VoteCard component

interface ApplicationData {
  name: string;
  organization: string;
  topics: string[];
  links: string[];
  moderator: boolean;
}

interface VoteData {
  accountId: string;
  vote: number;
}

interface Props {
  applicationData: ApplicationData[];
}

const ApplicationPage: React.FC<Props> = ({ applicationData }) => {
  console.log(applicationData)
  const [votes, setVotes] = useState<VoteData[]>([]);
  const [userVote, setUserVote] = useState<number>(4);
  const [userVoted, setUserVoted] = useState<boolean>(false);

  const user = useUser(); // get the user data
  const { accountId, type } = user || {};
  const applicationId = 'applicationId'; // replace with actual application id

  useEffect(() => {
    const fetchVotes = async () => {
      const response = { data: [] }; //await axios.get('https://hgraph.io/backed'); // replace with actual API
      const votesData: VoteData[] = response.data; // adjust according to actual response structure
      setVotes(votesData);
      const userVoteData = votesData.find((vote) => vote.accountId === accountId);
      setUserVote(userVoteData ? userVoteData.vote : 1);
      setUserVoted(userVoteData ? true : false);
    };
    fetchVotes();
  }, [accountId]);

  const handleVote = async (vote: number) => {
    setUserVote(vote);
    try {
      await axios.post('/api/voting-submission', { accountId, vote, applicationId });
    } catch (error) {
      console.error('Error submitting vote', error);
    }
  };

  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  // determine whether user can vote or not
  const canVote = type === 'admin' && !votes.find((vote) => vote.accountId === accountId);

  return (
    <Grid container spacing={3} className={styles.adminDashboard}>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={goBack} style={{ marginTop: "20px", marginLeft: "20px" }}>Go Back</Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2">Application</Typography>
      </Grid>
      {applicationData.map((data, index) => (
        <Grid item xs={12} key={index}>
          <Container className={styles.applicationContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">Speaker Name</Typography>
                <Typography variant="h6">{data.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Relevant Topics:</Typography>
                {data.topics.map((topic, topicIndex) => (
                  <Chip key={topicIndex} label={topic} color="primary" style={{backgroundColor: "black", color: "white", marginTop: '5px'}}/>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Links:</Typography>
                <ul>
                  {data.links.map((link, linkIndex) => (
                    <li key={linkIndex}><a href={link}>{link}</a></li>
                  ))}
                </ul>
              </Grid>

              {!userVoted ? (
                <Grid item xs={12}>
                  <VoteCard
                    id={data.id}
                    speaker={data.name}
                    tags={data.topics.join(', ')}
                    isSelected={votes.find((vote) => vote.accountId === accountId) ? true : false}
                    rating={{
                      voteNum: votes.length,
                      currentRating: votes.reduce((a, v) => a + v.vote, 0) / votes.length,
                    }}
                  />
                </Grid>
              ): 
              (
                <Grid item xs={12}>
                  <Typography variant="h6">Your Vote: </Typography> 
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={styles.star} style={{ color: i < userVote ? 'gold' : 'grey' }} />
                    ))}
                  </div>
                  <Typography variant="body1">{userVote}/5</Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="h6">Total Votes:</Typography>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={styles.star} style={{ color: i < 4 ? 'gold' : 'grey' }} />
                  ))}
                </div>
                <Typography variant="body2">4.21 out of 5</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Below you can see all of the current votes on this application:</Typography>
                <TableContainer component={Paper} className={styles.voteTable}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Account ID</TableCell>
                        <TableCell>Voted (1-5)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {votes.map((vote) => (
                        <TableRow key={vote.accountId}>
                          <TableCell>{vote.accountId}</TableCell>
                          <TableCell>{vote.vote}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      ))}
    </Grid>
  );
};

export default ApplicationPage;
