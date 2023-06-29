import React, { useEffect, useState } from 'react';
import styles from './ApplicationPage.module.scss';
import { Typography, Button, Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead, Grid, Chip, Link } from '@mui/material';
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

interface Votes {
  accountId: string;
  vote: number;
  ballotId: string;
  choice: string;
}

interface VoteData {
  accountId: string;
  vote: number;
}

interface Props {
  applicationData: ApplicationData[];
  votes: Votes[];
}

const ApplicationPage: React.FC<Props> = ({ applicationData, votes: votesData }) => {
    console.log('votesData', votesData)
  const [votes, setVotes] = useState<VoteData[]>([]);
  const [userVote, setUserVote] = useState<number>(4);
  const [userVoted, setUserVoted] = useState<boolean>(false);
  const [voteAverage, setVoteAverage] = useState<number>(1);

  const user = useUser(); // get the user data
  const { accountId, type, setLoading } = user || {};
  const applicationId = 'applicationId'; // replace with actual application id

  useEffect(() => {
    setVotes(votesData);
    const userVoteData = votesData.find((vote) => vote.accountId === accountId);
    console.log('userVoteData',userVoteData)
    setUserVote(userVoteData ? userVoteData.choice : 1);
    setUserVoted(userVoteData ? true : false);
  
    // Calculate the average
    let totalVotes = 0;
    let totalVotesCount = votesData.length;
    votesData.forEach((vote) => {
      totalVotes += vote.choice;
    });
    
    let averageVote = totalVotesCount ? totalVotes / totalVotesCount : 0;
    setVoteAverage(averageVote);
  }, [accountId, votesData]);

  const handleVote = async (vote: number) => {
    setUserVote(vote);
    setLoading(true);
    try {
      await axios.post('/api/voting-submission', { accountId, choice: vote, ballotId: applicationId });
    } catch (error) {
      console.error('Error submitting vote', error);
    }
    setLoading(false);
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
      {applicationData && applicationData.map((data, index) => (
        <Grid item xs={12} key={index}>
          <Container className={styles.applicationContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">Speaker Name</Typography>
                <Typography variant="h6">{data.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Relevant Topics:</Typography>
                <div className={styles.topicContainer}>
                  {data.topics.map((topic, topicIndex) => (
                    <Chip key={topicIndex} label={topic} color="primary" style={{backgroundColor: "black", color: "white", marginTop: '5px'}}/>
                  ))}
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Links:</Typography>
                <div className={styles.linksContainer}>
                  {data.links.map((link, linkIndex) => (
                    <Link key={linkIndex} href={link} variant="body2" target="_blank" rel="noopener noreferrer">
                      {link}
                    </Link>
                  ))}
                </div>
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
                    <StarIcon key={i} className={styles.star} style={{ color: i < voteAverage ? 'gold' : 'grey' }} />
                  ))}
                </div>
                <Typography variant="body2">{voteAverage} / 5</Typography>
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
                          <TableCell>{vote.choice}</TableCell>
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
