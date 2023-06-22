import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import {useUser} from '../pages/_app'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from './LoginPage.module.scss';

import type { Database } from '@/lib/database.types'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter(); // get the router object
  const supabase = createClientComponentClient<Database>()

  // const user = userUser()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/dashboard`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      alert(response.data.message);
      router.push('/dashboard'); // navigate to the secure page
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container className={styles.loginPageContainer} maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          margin="normal"
          required
          fullWidth
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
