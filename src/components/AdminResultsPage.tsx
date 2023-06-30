//@ts-nocheck
import React, {useEffect, useState} from 'react';
import { Typography, Container, Button } from '@mui/material';
import CardComponent from '../components/Card';
import styles from './AdminResultsPage.module.scss';
import { useRouter } from 'next/router';
import { supabase } from '../supabaseClient'; 
import { useUser } from '../contexts/UserContext';

const AdminResultsPage: React.FC = () => {
  
const [approvedApplications, setApprovedApplications] = useState([]);
const [openApplications, setOpenApplications] = useState([]);
const user = useUser();

useEffect(() => {
  const fetchApplications = async () => {
    // Set loading to true
    user?.setLoading(true);
    
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('type', { ascending: false });

    if (error) {
      console.error('Error loading applications', error);
    } else if (data) {
      const approvedApps = [];
      const openApps = [];

      data.forEach(application => {
        if (application.type === 'approved') {
          approvedApps.push(application);
        } else {
          application.type = application.votes.includes(user?.accountId) ? 'vote' :  'view'
          openApps.push(application);
        }
      });

      setApprovedApplications(approvedApps);
      setOpenApplications(openApps);
    }

    // Set loading to false
    user?.setLoading(false);
  };

  fetchApplications();
}, []);

  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <Container maxWidth="md" className={styles.resultsContainer}>
      <Button variant="outlined" onClick={goBack} className={styles.backButton}>Back</Button>

      <Typography variant="h3">Voting Results</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra sed justo
        vestibulum commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum purus.
      </Typography>
      
      {approvedApplications.length > 1 && <Typography variant="h4">Approved Applications</Typography>}
      {approvedApplications.map((app) => (
        <CardComponent
          key={app.applicationId}
          title={app.title}
          applicationId={app.applicationId}
          rating={app.rating}
          speaker={app.name} 
          isSelected={app.isSelected} 
          // todo
          //@ts-ignore
          type={app.type}
        />
      ))}
      
      {openApplications.length > 1 && <Typography variant="h6">Open Applications</Typography>}
      {openApplications.map((app) => (
        <CardComponent
          key={app.applicationId}
          title={app.title}
          applicationId={app.applicationId}
          rating={app.rating}
          speaker={app.name} 
          isSelected={app.isSelected} 
          // todo
          //@ts-ignore
          type={app.type}
        />
      ))}
    </Container>
  );
};

export default AdminResultsPage;
