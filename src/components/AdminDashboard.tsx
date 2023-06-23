import React from 'react';
import { Typography, Container, Button, Link } from '@mui/material';
import { useRouter } from 'next/router';
import CardComponent from '../components/Card';
import styles from './AdminDashboard.module.scss';

const AdminDashboardPage: React.FC = () => {
  const router = useRouter();

  const handleViewAll = () => {
    router.push('/admin-results');
  }

  return (
    <Container maxWidth="md" className={styles.adminDashboardContainer}>
      <div className={styles.header} >
        <Typography variant="h3">Admin Dashboard</Typography>
        <Typography component="p">
          Welcome to the Admin Panel of the Hedera Voting Application! 
        </Typography>
        <Typography component="p">
          This is your command center for managing all aspects of the voting process. Monitor voter registrations, oversee ballot details, and analyze real-time voting data.
        </Typography>
        <Button onClick={handleViewAll}>
          View All
        </Button>
      </div>
      
      <Typography variant="h4">Applications</Typography>
      <Typography className={styles.descriptionParagraph} component="p">
        Below you can review, manage and select applications from individuals eager to share their insights at our upcoming conference.
      </Typography>
      
      <div>
        <CardComponent title='Application 1' applicationId={1} rating={{voteNum:1,currentRating:5}} speaker='John Doe' isSelected={true} type='view' />
        <CardComponent title='Application 2' applicationId={2} rating={{voteNum:1,currentRating:3}} speaker='Jane Doe' isSelected={false} type='vote' />
        <CardComponent title='Application 3' applicationId={3} rating={{voteNum:1,currentRating:1}} speaker='John Doe' isSelected={true} type='view' />
        <CardComponent title='Application 4' applicationId={4} rating={{voteNum:1,currentRating:5}} speaker='Jane Doe' isSelected={false} type='vote' />
      </div>
    </Container>
  );
};

export default AdminDashboardPage;
