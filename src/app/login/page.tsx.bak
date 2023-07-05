'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './styles.module.scss';
import { SnackbarMessageSeverity } from '@/types';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [method, setMethod] = useState('Email');

  const router = useRouter();
  const { openSnackbar } = useSnackbar();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      openSnackbar(error.message, SnackbarMessageSeverity.Error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <Container className={styles.loginPageContainer} maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
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
            <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
              Login
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
            Login with Hashpack
          </Button>
        )}
        <Button variant="outlined" fullWidth onClick={() => router.push('/admin-login')}>
          Admin Login
        </Button>
      </form>
    </Container>
  );
}
