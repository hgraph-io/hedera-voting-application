import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import withAuth from '../components/withAuth';

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
    <Container maxWidth="sm">
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Welcome to the secure page
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Only logged in users should be able to see this!
      </Typography>
      <Button variant="outlined" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default withAuth(SecurePage);
