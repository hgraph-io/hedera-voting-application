import React, { useState, useCallback, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  useMediaQuery,
  Theme,
  Hidden,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";
import logo from "../assets/Hlogo.png";
import { useUser } from "../contexts/UserContext";
import { supabase } from "../supabaseClient";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  const router = useRouter();
  const user = useUser();
  console.log("xxxxxxxxxxx");
  console.log(user);
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const handleDrawerToggle = () => {
    !isDesktop && setMobileOpen(!mobileOpen);
  };

  const handleLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      setSessionActive(false);
      user?.disconnectHashpack();
      user?.setConnected(false);
      user?.setType("user");
      user?.setAccountId("");
      router.push("/login");
    }
  }, [router, user]);

  // Checking for a valid user session
  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session && user?.connected) {
        handleLogout();
      } else {
        setSessionActive(true);
      }
    };
    checkSession();
  }, [handleLogout, user]);

  interface Route {
    label: string;
    path: string;
  }

  const routes: Route[] = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Admin", path: "/admin-dashboard" },
  ];

  const renderLink = ({ label, path }: Route) => (
    <Link
      href={path}
      onClick={!isDesktop ? handleDrawerToggle : () => {}}
      passHref
      key={path}
    >
      <div
        className={router.pathname === path ? styles.activeLink : styles.link}
      >
        {label}
      </div>
    </Link>
  );

  return (
    <div className={styles.root}>
      <AppBar className={styles.menuBar} position="static">
        <Toolbar
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" passHref>
            <img className={styles.logo} src={logo?.src} alt="Logo" />
          </Link>
          <div>
            {isDesktop ? (
              <div className={styles.links}>
                {routes.map(renderLink)}
                <div className={styles.desktopButtonContainer}>
                  {!user?.supabaseSession ? (
                    <>
                      <Link href="/register">
                        <Button
                          variant="outlined"
                          className={styles.signupButton}
                        >
                          Sign Up
                        </Button>
                      </Link>
                      <Link href="/login">
                        <Button
                          variant="contained"
                          className={styles.loginButton}
                        >
                          Login
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Button onClick={handleLogout} variant="contained">
                      Log Out {user.accountId}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <IconButton
                edge="start"
                className={styles.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Hidden lgUp implementation="css">
              <Drawer
                anchor={"right"}
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
                    <IconButton
                      edge="start"
                      className={styles.menuCloseButton}
                      color="inherit"
                      aria-label="menu"
                      onClick={handleDrawerToggle}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                  {routes.map(renderLink)}
                  <div className={styles.mobileButtonContainer}>
                    {!user?.connected ? (
                      <>
                        <Link href="/register">
                          <Button
                            onClick={handleDrawerToggle}
                            variant="outlined"
                          >
                            Sign Up
                          </Button>
                        </Link>
                        <Link href="/login">
                          <Button
                            variant="contained"
                            className={styles.loginButton}
                          >
                            Login
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        className={styles.loginButton}
                        onClick={handleLogout}
                      >
                        Log Out
                      </Button>
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
