import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton,Button, useMediaQuery, Theme, Hidden, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';  
import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import logo from '../assets/Hlogo.png';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const router = useRouter();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  interface Route {
    label: string;
    path: string;
  }

  const routes: Route[] = [
    { label: 'Home', path: '/' },
    // { label: 'Admin Dashboard', path: '/admin-dashboard' },
    { label: 'Dashboard', path: '/dashboard' },
    // { label: 'Results', path: '/admin-results' },
    // { label: 'Application', path: '/application' },
    { label: 'Admin', path: '/admin-login' },
  ];

  const renderLink = ({ label, path }: Route) => (
    <Link href={path} onClick={!isDesktop ? handleDrawerToggle : ()=>{}} passHref key={path}>
      <div className={router.pathname === path ? styles.activeLink : styles.link}>{label}</div>
    </Link>
  );

  return (
    <div className={styles.root}>
      <AppBar className={styles.menuBar} position="static">
        <Toolbar style={{position:'relative',width:'100%', display:"flex", justifyContent:'space-between'}}>
            {/* Add a placeholder for the logo */}
            <Link href="/" passHref>  
              <img className={styles.logo} src={logo?.src} alt="Logo" />
            </Link>
            <div>
              {isDesktop ? (
                <div className={styles.links}>
                  {routes.map(renderLink)}
                  <div className={styles.desktopButtonContainer}>
                    <Link href="/register">  
                      <Button className={styles.signupButton} >
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/login">  
                      <Button className={styles.loginButton}>
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              )}

              <Hidden lgUp implementation="css">
                <Drawer
                  anchor={'right'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: styles.drawerPaper,
                  }}
                  variant="temporary"
                >
                  <div className={styles.links}>
                 
                    <div className={styles.logoContainer}>
                      <Link href="/" passHref>  
                        <img className={styles.logo} src={logo?.src} alt="Logo" />
                      </Link>
                      <IconButton edge="start" className={styles.menuCloseButton} color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                    {routes.map(renderLink)}
                    <div className={styles.mobileButtonContainer}>
                      <Link href="/register">  
                        <Button onClick={handleDrawerToggle} className={styles.signupButton} >
                          Sign Up
                        </Button>
                      </Link>
                      <Link href="/login">  
                        <Button onClick={handleDrawerToggle} className={styles.loginButton}>
                          Login
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Drawer>
              </Hidden>
            </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}
