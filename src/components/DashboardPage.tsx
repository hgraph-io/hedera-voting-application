import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import CardComponent from '../components/Card';
import styles from './DashboardPage.module.scss';

const DashboardPage: React.FC = () => {
  const router = useRouter();

  return (
    <Container maxWidth="md" className={styles.dashboardContainer}>
      <div className={styles.header}>
        <Typography component="h1" variant="h3" align="left" color="textPrimary" gutterBottom>
          Dashboard
        </Typography>
        <Typography align="left" color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus. 
        </Typography>
        <Button className={styles.buttonContainer} variant="contained" onClick={() => router.replace('/application/create')}>
          Submit New Application
        </Button>
      </div>
      <Typography variant="h4">Previous Applications</Typography>
      <div className={styles.cardContainer}>
        <CardComponent title='Card 1' applicationId={3} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='approved' />
        <CardComponent title='Card 1' applicationId={4} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='denied' />
        <CardComponent title='Card 1' applicationId={5} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='default' />
      </div>

    </Container>
  );
};

export default DashboardPage;
