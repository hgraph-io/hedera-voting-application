'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Session } from '@supabase/auth-helpers-nextjs';
import { VIEWS } from '@supabase/auth-ui-shared';
import { Button } from '@mui/material';

import styles from './styles.module.scss';

//https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
export default function DesktopMenu({ session }: { session: Session | null }) {
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
        {session?.user && (
          <form action="/auth/signout" method="post">
            <Button variant="contained" type="submit">
              Sign Out
            </Button>
          </form>
        )}

        {!session?.user && (
          <>
            <Button
              component="a"
              href={`/login?v=${VIEWS.SIGN_UP}`}
              variant="outlined"
              className={styles.signupButton}
            >
              Login
            </Button>
            <Button
              component="a"
              href={`/login?v=${VIEWS.SIGN_UP}`}
              variant="contained"
              className={styles.signupButton}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
