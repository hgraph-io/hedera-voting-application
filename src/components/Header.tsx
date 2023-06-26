import React, { useCallback, useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, useMediaQuery, Theme, Hidden, Drawer, CircularProgress, Backdrop } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';  
import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import logo from '../assets/Hlogo.png';
import { useUser } from '../contexts/UserContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const router = useRouter();
  const user = useUser();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = useCallback(async () => {
    if (user?.disconnectHashpack) {
      user.disconnectHashpack();
    }
    router.push('/login');
  }, [router, user]);

  interface Route {
    label: string;
    path: string;
  }

  const routes: Route[] = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Admin', path: '/admin-dashboard' },
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
            <Link href="/" passHref>  
              <img className={styles.logo} src={logo?.src} alt="Logo" />
            </Link>
            <div>
              {isDesktop ? (
                <div className={styles.links}>
                  {routes.map(renderLink)}
                  <div className={styles.desktopButtonContainer}>
                    <Link href="/register">  
                      <Button variant="outlined" className={styles.signupButton} >
                        Sign Up
                      </Button>
                    </Link>
                    {user?.connected ? (
                      <Button onClick={handleLogout} variant="contained" >
                        Log Out {user.accountId}
                      </Button>
                    ) : (
                      <Link href="/login">  
                        <Button onClick={handleDrawerToggle} variant="contained" >
                          Login
                        </Button>
                      </Link>
                    )}
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
                        <Button onClick={handleDrawerToggle} variant="outlined">
                          Sign Up
                        </Button>
                      </Link>
                      {user?.connected ? (
                        <Button variant="contained" className={styles.loginButton} onClick={handleLogout}>
                          Log Out {user.accountId}
                        </Button>
                      ) : (
                        <Link href="/login">  
                          <Button variant="contained" className={styles.loginButton}>
                            Login
                          </Button>
                        </Link>
                      )}
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
