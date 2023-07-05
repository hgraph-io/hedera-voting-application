import { Button } from '@mui/material';
import Link from 'next/link';

import styles from './styles.module.scss';

export default function DesktopMenu() {
  return (
    <div className={styles.links}>
      <Link href="/">
        <div className={true ? styles.activeLink : styles.link}>Home</div>
      </Link>
      <Link href="/dashboard">
        <div className={true ? styles.activeLink : styles.link}>Dashboard</div>
      </Link>
      <Link href="/admin">
        <div className={true ? styles.activeLink : styles.link}>Admin</div>
      </Link>
      <div className={styles.desktopButtonContainer}>
        <Link href="/register">
          <Button variant="outlined" className={styles.signupButton}>
            Sign Up
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="contained" className={styles.loginButton}>
            Login
          </Button>
        </Link>
        <Button onClick={() => alert('not implemented')} variant="contained">
          Log Out Hashpack
        </Button>
      </div>
    </div>
  );
}
