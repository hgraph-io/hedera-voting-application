import React, { useEffect, useState } from 'react';
import { Typography, Container, Button } from '@mui/material';
import { useRouter } from 'next/router';
import CardComponent from '../components/Card';
import styles from './AdminDashboard.module.scss';
import { supabase } from '../supabaseClient';
import { useUser } from '../contexts/UserContext';

const AdminDashboardPage: React.FC = () => {
  const router = useRouter();
  const user = useUser();

  // todo
  const [applications, setApplications] = useState<any>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      // Set loading to true
      user?.setLoading(true);
      const { data, error } = await supabase.from('applications').select('*');
      console.log('applications', data);
      console.log('user', user);

      if (error) console.error('Error loading applications', error);
      else {
        const apps = data.map((application) => ({
          ...application,
          type: application.votes.includes(user?.accountId) ? 'vote' : 'view',
        }));
        setApplications(apps);
      }
      // Set loading to false
      user?.setLoading(false);
    };
    fetchApplications();
  }, []);

  const handleViewAll = () => {
    router.push('/admin-results');
  };

  return (
    <Container maxWidth="md" className={styles.adminDashboardContainer}>
      <div className={styles.header}>
        <Typography variant="h3">Admin Dashboard</Typography>
        <Typography component="p">
          Welcome to the Admin Panel of the Hedera Voting Application!
        </Typography>
        <Typography component="p">
          This is your command center for managing all aspects of the voting process. Monitor
          voter registrations, oversee ballot details, and analyze real-time voting data.
        </Typography>
        <Button onClick={handleViewAll}>View All</Button>
      </div>

      <Typography variant="h4">Applications</Typography>
      <Typography className={styles.descriptionParagraph} component="p">
        Below you can review, manage and select applications from individuals eager to share
        their insights at our upcoming conference.
      </Typography>

      <div>
        {applications.map(
          (
            app: any //todo
          ) => (
            <CardComponent
              key={app.id}
              id={app.id}
              moderator={app.moderator}
              applicationId={app.applicationId}
              rating={app.rating}
              speaker={app.name}
              isSelected={app.isSelected}
              type={app.type}
            />
          )
        )}
      </div>
    </Container>
  );
};

export default AdminDashboardPage;
