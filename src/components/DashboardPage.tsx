import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import CardComponent from '../components/Card';
import styles from './DashboardPage.module.scss';

const DashboardPage: React.FC = () => {
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
    <Container maxWidth="md" className={styles.dashboardContainer}>
      <Typography component="h1" variant="h3" align="left" color="textPrimary" gutterBottom>
        Dashboard
      </Typography>
      <Typography align="left" color="textSecondary" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus. 
      </Typography>
      <Button variant="outlined" color="primary" onClick={handleLogout}>
        Logout
      </Button>
      <br />
      <br />
      <Button variant="outlined" color="primary" onClick={() => router.replace('/application/create')}>
        Submit Application
      </Button>
      <br />
      <br />
      <div>
        <CardComponent title='Card 1' applicationId={1} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='view' />
        <CardComponent title='Card 1' applicationId={2} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={false} type='vote' />
        <CardComponent title='Card 1' applicationId={3} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='approved' />
        <CardComponent title='Card 1' applicationId={4} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='denied' />
        <CardComponent title='Card 1' applicationId={5} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='default' />
      </div>

    </Container>
  );
};

export default DashboardPage;
