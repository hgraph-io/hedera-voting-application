import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter(); // get the router object

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      alert(response.data.message);
      router.push('/secure'); // navigate to the secure page
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
