import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import CardComponent from '../components/Card';
import styles from './AdminResultsPage.module.scss';
import { useRouter } from 'next/router';

const AdminResultsPage: React.FC = () => {
  // TODO: fetch the actual data from an API
  const approvedApplications = [
    { title: 'Application 1', applicationId: 1, rating: { voteNum: 1, currentRating: 5 }, speaker: 'John Doe', isSelected: true, type: 'approved' },
    { title: 'Application 2', applicationId: 2, rating: { voteNum: 1, currentRating: 5 }, speaker: 'Jane Doe', isSelected: true, type: 'approved' },
  ];
  
  const openApplications = [
    { title: 'Application 3', applicationId: 3, rating: { voteNum: 1, currentRating: 4 }, speaker: 'John Doe', isSelected: false, type: 'default' },
    { title: 'Application 4', applicationId: 4, rating: { voteNum: 1, currentRating: 4 }, speaker: 'Jane Doe', isSelected: false, type: 'default' },
  ];

  const router = useRouter();
  const goBack = () => {
    router.back();
  }
  return (
    <Container maxWidth="md" className={styles.resultsContainer}>
      <Button variant="outlined" onClick={goBack} style={{ marginTop: "20px", marginLeft: "20px" }}>Go Back</Button>

      <Typography variant="h3">Voting Results</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
      </Typography>
      
      <Typography variant="h3">Approved Applications</Typography>
      {approvedApplications.map((app) => (
        <CardComponent 
          key={app.applicationId}
          title={app.title} 
          applicationId={app.applicationId} 
          rating={app.rating}
          speaker={app.speaker} 
          isSelected={app.isSelected} 
          type={app.type} 
        />
      ))}
      
      <Typography variant="h6">Open Applications</Typography>
      {openApplications.map((app) => (
        <CardComponent 
          key={app.applicationId}
          title={app.title} 
          applicationId={app.applicationId} 
          rating={app.rating}
          speaker={app.speaker} 
          isSelected={app.isSelected} 
          type={app.type} 
        />
      ))}
    </Container>
  );
};

export default AdminResultsPage;
