import Link from 'next/link'
import { Container, Typography, Button } from '@/components'
import styles from './styles.module.scss'

export default function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <Container>
        <div className={styles.homePageHero}>
          <Typography variant="h1" align="left" color="contrastText">
            Call For Speakers
          </Typography>
          <Typography
            variant="h5"
            align="left"
            color="contrastText"
            className={styles.homePageDescription}
          >
            Apply to become a panelist or moderator
          </Typography>
          <Link href="/login">
            <Button variant="gradient" className={styles.heroButton}>
              Get started
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}
