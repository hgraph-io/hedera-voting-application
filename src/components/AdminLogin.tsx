import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router'; // next/router instead of next/navigation
import { useUser } from '../contexts/UserContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './AdminLogin.module.scss';

const AdminLogin: React.FC = () => {
  const user = useUser();
  const router = useRouter();

  const handleSignIn = async () => {
    if (user) {
      await user.initWalletConnect(false);
    }
  };
  useEffect(() => {
    console.log(user);
    if (user && user.connected && user.type == 'admin') {
      console.log('redirect');
      router.push('/admin-dashboard');
    }
  }, [user]);

  return (
    <Container className={styles.adminLoginPageContainer} maxWidth="xs">
      <Typography component="h1" variant="h5">
        Admin Login
      </Typography>
      <form className={styles.formContent} noValidate autoComplete="off">
        {user && user.loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
            Login with Hashpack
          </Button>
        )}
        <Button variant="outlined" fullWidth onClick={() => router.push('/login')}>
          User Login
        </Button>
      </form>
    </Container>
  );
};

export default AdminLogin;
