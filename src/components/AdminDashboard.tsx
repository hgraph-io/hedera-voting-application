import React from 'react';
import { Typography, Container, Button, Link } from '@mui/material';
import { useRouter } from 'next/router';
import CardComponent from '../components/Card';
import styles from './DashboardPage.module.scss';

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const handleViewAll = () => {
    router.push('/admin-results');
  }

  return (
    <Container maxWidth="md" className={styles.dashboardContainer}>
      <Typography variant="h3">Admin Dashboard</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
      </Typography>
      <Button variant="outlined" onClick={handleViewAll}>
        View All
      </Button>
      
      <Typography variant="h3">Applications</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
      </Typography>
      
      <div>
        <CardComponent title='Application 1' applicationId={1} rating={{voteNum:1,currentRating:5}} speaker='John Doe' isSelected={true} type='view' />
        <CardComponent title='Application 2' applicationId={2} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={false} type='vote' />
        <CardComponent title='Application 3' applicationId={3} rating={{voteNum:1,currentRating:5}} speaker='John Doe' isSelected={true} type='approved' />
        <CardComponent title='Application 4' applicationId={4} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={true} type='denied' />
        <CardComponent title='Application 5' applicationId={5} rating={{voteNum:1,currentRating:5}} speaker='John Doe' isSelected={true} type='default' />
      </div>
    </Container>
  );
};

export default DashboardPage;
