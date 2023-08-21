'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { Container, Grid, Typography, Link } from '@mui/material'
import styles from './styles.module.scss'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <footer style={{ flexShrink: 0 }}>
      <div className={styles.footer}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} sm={4} className={styles.logoContainer}>
              <Image src="/logo_updated.png" alt="Logo" width={100} height={30} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              className={isMobile ? styles.linkContainerMobile : styles.linkContainer}
            >
              <Grid container spacing={2} justifyContent={isMobile ? 'center' : 'flex-end'}>
                <Grid item className={styles.linkItem}>
                  <Link href="https://hedera.com/privacy" target="_blank" color="inherit">
                    Privacy Policy
                  </Link>
                </Grid>
                <Grid item className={styles.linkItem}>
                  <Link href="https://hedera.com/terms" target="_blank" color="inherit">
                    Terms & Conditions
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={styles.copyright}>
              <Typography>© {new Date().getFullYear()} Hedera</Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </footer>
  )
}
