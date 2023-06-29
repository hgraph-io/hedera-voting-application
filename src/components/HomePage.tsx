import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button } from '@mui/material';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  return (
    <Container className={styles.homePageContainer}>
      <div className={styles.homePageHero}>
        <Typography component="h1" variant="h2" align="left" color="contrastText" gutterBottom>
          Voting Platform
        </Typography>
        <Typography variant="h5" align="left" color="contrastText" paragraph>
          Here is a brief description of our application. You can put any text here that suits your needs.
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2rem' }}>
          <Link href="/login">
            <Button variant="contained" className={styles.heroButton}>
              Submit an Application
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
