import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button } from '@mui/material';
import styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
  return (
    <Container className={styles.homePageContainer}>
      <div className={styles.homePageHero}>
        <Typography component="h1" variant="h2" align="left" color="contrastText" gutterBottom>
          Call For Papers
        </Typography>
        <Typography variant="h5" align="left" color="contrastText" paragraph>
        This website provides a platform for the submission of papers and uses the Hedera network for a decentralized, transparent, and secure voting process to approve the papers.
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '2rem',
          }}
        >
          <Link href="/application/create">
            <Button className={styles.heroButton}>
              Submit an Application
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
