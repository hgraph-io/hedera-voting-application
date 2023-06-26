import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router' // next/router instead of next/navigation
import {useUser} from '../contexts/UserContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from './AdminLogin.module.scss';

import type { Database } from '@/lib/database.types'

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useUser()
  const router = useRouter();
  const supabase = createClientComponentClient<Database>()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/dashboard`,
      },
    })
  }

  const handleSignIn = async () => {
    const res = await user?.initWalletConnect(false)
    console.log(res)
  
  }

  return (
    <Container className={styles.adminLoginPageContainer} maxWidth="xs">
      <Typography component="h1" variant="h5">
       Admin Login
      </Typography>
      <form className={styles.formContent} noValidate autoComplete="off">
       
          <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
            Login with Hashpack
          </Button>
        <Button variant="outlined" fullWidth onClick={() => router.push('/login')}>
          User Login
        </Button>
      </form>
    </Container>
  );
};

export default AdminLogin;
