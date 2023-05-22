import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Welcome to our application!
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '2rem' }}>
        <Button variant="outlined" color="primary">
          <Link href="/login">
            Login
          </Link>
        </Button>
        <Button variant="outlined" color="primary">
          <Link href="/register">
            Register
          </Link>
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
