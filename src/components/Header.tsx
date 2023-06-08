import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, useMediaQuery, Theme, Hidden, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';  
import styles from './Header.module.scss';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div className={styles.links}>
      <Link href="/">  
        <MenuItem onClick={handleClose}>Home</MenuItem>
      </Link>
      <Link href="/admin-dashboard">
        <MenuItem onClick={handleClose}>Admin Dashboard</MenuItem>
      </Link>
      <Link href="/dashboard">
        <MenuItem onClick={handleClose}>Dashboard</MenuItem>
      </Link>
      <Link href="/results">
        <MenuItem onClick={handleClose}>Results</MenuItem>
      </Link>
      <Link href="/application">
        <MenuItem onClick={handleClose}>Application</MenuItem>
      </Link>
      <Link href="/admin-login">
        <MenuItem onClick={handleClose}>Admin Login</MenuItem>
      </Link>
    </div>
  );

  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            {/* Add a placeholder for the logo */}
            <img src="logo-placeholder.png" alt="Logo" />
          </Typography>

          {isDesktop ? (
            <div>
              {drawer}
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
              {drawer}
            </Drawer>
          </Hidden>

        </Toolbar>
      </AppBar>
    </div>
  );
}
