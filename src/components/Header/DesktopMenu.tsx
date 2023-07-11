import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@mui/material';
import styles from './styles.module.scss';

export default function DesktopMenu() {
  const pathname = usePathname();
  return (
    <div className={styles.links}>
      <Link href="/">
        <div className={pathname === '/' ? styles.activeLink : styles.link}>Home</div>
      </Link>
      <Link href="/dashboard">
        <div className={pathname.startsWith('/dashboard') ? styles.activeLink : styles.link}>
          Dashboard
        </div>
      </Link>
      <Link href="/admin">
        <div className={pathname.startsWith('/admin') ? styles.activeLink : styles.link}>
          Admin
        </div>
      </Link>
      <div className={styles.desktopButtonContainer}>
        <Link href="/login">Login</Link>
        <Button
          component="a"
          href="/login?new"
          variant="outlined"
          className={styles.signupButton}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
