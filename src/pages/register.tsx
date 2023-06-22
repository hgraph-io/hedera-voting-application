import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form noValidate autoComplete="off">
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
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
