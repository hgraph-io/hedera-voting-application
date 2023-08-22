import Link from 'next/link'
import { Container, Typography, Button } from '@/components'
import styles from './styles.module.scss'

export default function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <Container>
        <div className={styles.homePageHero}>
          <Typography
            variant="h1"
            className={styles.homePageTitle}
            align="left"
            color="contrastText"
          >
            Call For Speakers
          </Typography>
          <Typography
            variant="h5"
            align="left"
            color="contrastText"
            sx={{ 'padding-top': '5px' }}
            className={styles.homePageDescription}
          >
            Apply to become a panelist or moderator at Hedera’s Regenerative Finance Forum
            during COP 28
          </Typography>
          <Link href="/login">
            <Button
              variant="gradient"
              sx={{ 'margin-top': '10px' }}
              className={styles.heroButton}
            >
              Get started
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  )
}
