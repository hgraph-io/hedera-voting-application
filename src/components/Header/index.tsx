'use client';

import { AppBar, Toolbar, Hidden } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <div className={styles.root}>
      <AppBar className={styles.menuBar} position="static">
        <Toolbar
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/">
            <Image className={styles.logo} src="/logo.png" width={100} height={30} alt="Logo" />
          </Link>
          <div>
            <Hidden lgDown implementation="css">
              <DesktopMenu />
            </Hidden>

            <Hidden lgUp implementation="css">
              <MobileMenu />
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
