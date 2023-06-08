import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import withAuth from '../components/withAuth';
import CardComponent from '../components/Card';

const SecurePage: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      router.replace('/'); // navigate to the home page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Welcome to the secure page
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Only logged in users should be able to see this!
      </Typography>
      <Button variant="outlined" color="primary" onClick={handleLogout}>
        Logout
      </Button>
      <br />
      <br />
      <div>
        <CardComponent title='Card 1' rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='view' />
        <CardComponent title='Card 1' rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={false} type='vote' />
        <CardComponent title='Card 1' rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='approved' />
        <CardComponent title='Card 1' rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='denied' />
        <CardComponent title='Card 1' rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='default' />
      </div>

    </Container>
  );
};

export default withAuth(SecurePage);
