import Link from 'next/link';
import { Container, Typography, Button } from '@/components';
import styles from './styles.module.scss';

export default function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <Container>
        <div className={styles.homePageHero}>
          <Typography variant="h1" align="left" color="contrastText" gutterBottom>
            Call for Papers
          </Typography>
          <Typography variant="h5" align="left" color="contrastText" paragraph>
            Submit your application to the upcoming Hedera conference
          </Typography>
          <Link href="/login">
            <Button variant="contained" className={styles.heroButton}>
              Submit an Application
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
