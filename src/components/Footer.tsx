import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Link,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import styles from './Footer.module.scss';
import logo from '../assets/Hlogo.png';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={styles.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={4} className={styles.logoContainer}>
            <Image src={logo?.src} alt="Logo" width={100} height={30} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            className={
              isMobile ? styles.linkContainerMobile : styles.linkContainer
            }
          >
            <Grid
              container
              spacing={2}
              justifyContent={isMobile ? 'center' : 'flex-end'}
            >
              <Grid item className={styles.linkItem}>
                <Link href="/privacy-policy" color="inherit">
                  Privacy Policy
                </Link>
              </Grid>
              <Grid item className={styles.linkItem}>
                <Link href="/terms" color="inherit">
                  Terms & Conditions
                </Link>
              </Grid>
              <Grid item className={styles.linkItem}>
                <Link href="/cookie-policy" color="inherit">
                  Cookie Policy
                </Link>
              </Grid>
              <Grid item className={styles.linkItem}>
                <Link href="/contact" color="inherit">
                  Contact
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
  );
};

export default Footer;
