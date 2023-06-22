import React, { useEffect, useState } from 'react';
import styles from './ApplicationPage.module.scss';
import { Typography, Button, Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useRouter } from 'next/router';

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

const ApplicationPage: React.FC<Props> = ({applicationData}) => {
  const [votes, setVotes] = useState<VoteData[]>([]);
  const [userVote, setUserVote] = useState<number>(4);
  const userId = 'userId'; // replace with actual logged in user id

  // Simulating an API call
  useEffect(() => {
    const fetchVotes = async () => {
      const response = {data:[]}//await axios.get('https://hgraph.io/backed'); // replace with actual API
      const votesData: VoteData[] = response.data; // adjust according to actual response structure
      setVotes(votesData);
      const userVoteData = votesData.find(vote => vote.accountId === userId);
      setUserVote(userVoteData ? userVoteData.vote : 1);
    }
    fetchVotes();
  }, [userId]);

  const router = useRouter();

  const goBack = () => {
    router.back();
  }


  return (
    <div className={styles.adminDashboard}>
      <Button variant="outlined" onClick={goBack} style={{ marginTop: "20px", marginLeft: "20px" }}>Go Back</Button>

      <Typography variant="h2">Application</Typography>
      {applicationData.map((data, index) => (
        <Container key={index} className={styles.applicationContainer}>
          <Typography variant="body1">Speaker Name</Typography>
          <Typography variant="h6">{data.name}</Typography>
          <br/>
          <Typography variant="body1">Related Topics:</Typography>
          <ul>
            {data.topics.map((topic, topicIndex) => (
              <li key={topicIndex}>{topic}</li>
            ))}
          </ul>
          <br/>
          <Typography variant="body1">Links:</Typography>
          <ul>
            {data.links.map((link, linkIndex) => (
              <li key={linkIndex}><a href={link}>{link}</a></li>
            ))}
          </ul>
          <br/>
          <Typography variant="h6">Your Vote: </Typography> 
          <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={styles.star} style={{ color: i < userVote ? 'gold' : 'grey' }} />
            ))}
          </div>
          <Typography variant="body1">{userVote}/5</Typography>
          <br/>
          <Typography variant="h6">Total Votes:</Typography>
          <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={styles.star} style={{ color: i < 4 ? 'gold' : 'grey' }} />
            ))}
          </div>
          <Typography variant="body2">4.21 out of 5</Typography>
          <br/>
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
        </Container>
      ))}
    </div>
  );
};

export default ApplicationPage;
