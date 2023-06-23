import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router' // next/router instead of next/navigation
import {useUser} from '../pages/_app'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import styles from './RegisterPage.module.scss';

import type { Database } from '@/lib/database.types'

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [method, setMethod] = useState('Email');

  const supabase = createClientComponentClient<Database>()

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
      router.push('/dashboard');
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  const router = useRouter(); // get the router object

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
    try {
      const response = await axios.post('/api/register', { email, password });
      alert(response.data.message);
      router.push('/secure'); // navigate to the secure page
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed');
    }
  };
  return (
    <Container className={styles.loginPageContainer} maxWidth="xs">
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form className={styles.formContent} noValidate autoComplete="off">
        <FormControl fullWidth>
          <InputLabel id="method-select-label">Method</InputLabel>
          <Select
            labelId="method-select-label"
            id="method-select"
            value={method}
            label="Method"
            onChange={(e) => setMethod(e.target.value)}
          >
            <MenuItem value={'Email'}>Email</MenuItem>
            <MenuItem value={'Hashpack'}>Hashpack</MenuItem>
          </Select>
        </FormControl>
        {method === 'Email' ? (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
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
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
              Login
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
            Sign Up with Hashpack
          </Button>
        )}
        <Button variant="outlined" fullWidth onClick={() => router.push('/admin-login')}>
          Admin Login
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
