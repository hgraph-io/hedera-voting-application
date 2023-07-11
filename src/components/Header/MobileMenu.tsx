'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Hidden, IconButton, Button, Drawer } from '@mui/material';
import { Close, Menu } from '@mui/icons-material';

import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.scss';

export default function MobileMenu() {
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
        <Menu />
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
              <Close />
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
            <Link href="/login?new">
              <Button variant="outlined">Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button variant="contained" className={styles.loginButton}>
                Login
              </Button>
            </Link>
            <Button variant="contained" className={styles.loginButton}>
              Log Out
            </Button>
          </div>
        </div>
      </Drawer>
    </Hidden>
  );
}
