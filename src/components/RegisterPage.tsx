import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserContext';
import { useSnackbar } from '../contexts/SnackbarContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from './RegisterPage.module.scss';

import type { Database } from '@/lib/database.types';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [method, setMethod] = useState('Email');
  const { openSnackbar } = useSnackbar();
  const user = useUser();
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignUp = async () => {
    
    if (password !== confirmPassword) {
      return openSnackbar('Passwords do not match', 'error');
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/dashboard`,
        },
      });

      if (error) throw error;
      openSnackbar("Signup successful!", "success");
      router.push("/login");
    } catch (error) {
      openSnackbar(error.message, "error");
    }
  };

  const handleRegister = async () => {
    
    try {
      const response = await user?.initWalletConnect(false);
      console.log(response);
    } catch (error) {
      openSnackbar(error.response?.data?.error || 'Registration failed', 'error');
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
