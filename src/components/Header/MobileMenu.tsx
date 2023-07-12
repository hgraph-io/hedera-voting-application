'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Session } from '@supabase/auth-helpers-nextjs';
import { VIEWS } from '@supabase/auth-ui-shared';
import { Hidden, IconButton, Button, Drawer, MenuIcon, CloseIcon } from '@/components';
import styles from './styles.module.scss';

export default function MobileMenu({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Hidden lgUp implementation="css">
      <IconButton
        edge="start"
        className={styles.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: styles.drawerPaper,
        }}
        variant="temporary"
      >
        <div className={styles.links}>
          <div className={styles.logoContainer}>
            <Link href="/">
              <Image className={styles.logo} src="/logo.png" alt="Logo" />
            </Link>
            <IconButton
              edge="start"
              className={styles.menuCloseButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <Link href="/">
            <div className={pathname === '/' ? styles.activeLink : styles.link}>Home</div>
          </Link>
          <Link href="/dashboard">
            <div
              className={pathname.startsWith('/dashboard') ? styles.activeLink : styles.link}
            >
              Dashboard
            </div>
          </Link>
          <Link href="/admin">
            <div className={pathname.startsWith('/admin') ? styles.activeLink : styles.link}>
              Admin
            </div>
          </Link>
          <div className={styles.mobileButtonContainer}>
            {session?.user && (
              <form action="/auth/signout" method="post">
                <Button variant="contained" className={styles.loginButton}>
                  Log Out
                </Button>
              </form>
            )}
            {!session?.user && (
              <>
                <Link href={`/login?v=${VIEWS.SIGN_UP}`}>
                  <Button variant="outlined">Sign Up</Button>
                </Link>
                <Link href={`/login?v=${VIEWS.SIGN_IN}`}>
                  <Button variant="contained" className={styles.loginButton}>
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </Hidden>
  );
}
