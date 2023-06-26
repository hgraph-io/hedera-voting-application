import React, { useState, useEffect } from 'react';
import { Typography, Container, Button } from '@mui/material';
import { useRouter } from 'next/router';
import CardComponent from '../components/Card';
import styles from './DashboardPage.module.scss';
import { supabase } from '../supabaseClient'; // import the client from the separate module

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    const fetchApplications = async () => {
      const { data: {user}} = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id);

      console.log(data)
      if (error) console.error('Error loading applications', error);
      else setApplications(data);
    };

    fetchApplications();
  }, []);

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
      {applications.length > 0 && <Typography variant="h4">Previous Applications</Typography>}
      <div className={styles.cardContainer}>
        {applications.map((application, index) => (
          <CardComponent 
            key={index}
            title={application.links[0]}
            applicationId={application.id} 
            rating={{voteNum:application.voteNum,currentRating:application.currentRating}} 
            speaker={application.name}
            isSelected={application.isSelected}
            type={application.type}
          />
        ))}
      </div>

    </Container>
  );
};

export default DashboardPage;
