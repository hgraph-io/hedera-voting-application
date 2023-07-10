import { Button } from '@mui/material';
import Link from 'next/link';
import styles from './styles.module.scss';

export default function DesktopMenu() {
  return (
    <div className={styles.links}>
      <Link href="/speaker">
        <div className={true ? styles.activeLink : styles.link}>Dashboard</div>
      </Link>
      <Link href="/committee">
        <div className={true ? styles.activeLink : styles.link}>Admin</div>
      </Link>
      <div className={styles.desktopButtonContainer}>
        <Link href="/speaker">Login</Link>
        <Button
          component="a"
          href="/speaker"
          variant="outlined"
          className={styles.signupButton}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
