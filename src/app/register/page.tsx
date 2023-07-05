'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@/components';
import { useSnackbar } from '@/context';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SnackbarMessageSeverity } from '@/types';
import styles from './styles.module.scss';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [method, setMethod] = useState('Email');
  const { openSnackbar } = useSnackbar();
  const user = {}; // hashpack user?
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      return openSnackbar('Passwords do not match', SnackbarMessageSeverity.Error);
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // emailRedirectTo: `${location.origin}/login`,
        },
      });

      if (error) throw error;
      openSnackbar('Signup successful!', SnackbarMessageSeverity.Success);
      router.push('/login');
    } catch (error) {
      // @ts-ignore
      openSnackbar(error.message, SnackbarMessageSeverity.Error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await user?.initWalletConnect(false);
      console.log(response);
    } catch (error) {
      // @ts-ignore
      openSnackbar(
        // @ts-ignore
        error.response?.data?.error || 'Registration failed',
        SnackbarMessageSeverity.Error
      );
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
              Sign Up
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
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
