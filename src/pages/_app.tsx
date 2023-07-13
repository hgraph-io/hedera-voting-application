//@ts-nocheck
import React, {useState, createContext, useEffect, useContext} from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme, CircularProgress, Backdrop } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import '../styles/globals.scss';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';

import { SnackbarProvider } from '../contexts/SnackbarContext';
import { UserProvider, useUser } from '../contexts/UserContext';

const colors = {
  blue: '#4263eb',
  purple: '#7048e8',
  darkPurple: '#6541d2',
  green: '#51cf66',
  darkGreen: '#21a056',
  yellow: '#eada0b',
  lime: '#b7f133',
  black: '#212429',
  white: '#f9f9f9',
  whiteText: '#FFFFFF',
  grey1: '#dde2e5',
  grey2: '#acb5bd',
  grey3: '#495057',
};

//@ts-ignoe
const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue,
      contrastText: colors.yellow,
    },
    secondary: {
      light: colors.green,
      main: colors.purple,
      contrastText: colors.yellow,
    },
    text: {
      primary: colors.black,
      secondary: colors.grey3,
    },
  },
  typography: {
    fontFamily: 'Styrene A Web, Arial',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white, // Set AppBar background to white
          color: colors.black, // Set text color to black
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            color: colors.white,
            background: colors.darkGreen,
            borderRadius: '50px',
            border: 'none',
            textTransform: 'capitalize',
            '&:hover': {
              background: colors.green,
            },
          },
        },
      ],
      styleOverrides: {
        text: {
          height: '32px',
          borderRadius: '50px',
          minWidth: '100px',
          border: 'none',
          color: colors.black,
          background: colors.white,
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: colors.purple,
          },
        },
        contained: {
          height: '32px',
          minWidth: '100px',
          borderRadius: '50px',
          border: 'none',
          color: colors.white,
          background: colors.darkPurple,
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: colors.purple,
          },
        },
        outlined: {
          height: '32px',
          color: colors.black,
          minWidth: '100px',
          border: `1px solid ${colors.black}`,
          borderRadius: '50px',
          textTransform: 'capitalize',
          '&:hover': {
            color: colors.whiteText,
            backgroundColor: colors.purple,
            border: `none`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '20px 0px 0px',
        },
      },
    },
  },
});


const LoadingBackdrop = () => {
  const user = useUser();
  return (
    <>
      {user && <Backdrop open={user.loading} style={{zIndex: 9999, color: '#fff'}}>
        Loading...
        <CircularProgress color="inherit" />
      </Backdrop>}
    </>
  );
};


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <UserProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <CssBaseline />
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
              <Header />
              <main style={{flex: '1 0 auto'}}>
                <Component {...pageProps} />
                <LoadingBackdrop />
              </main>
              <footer style={{flexShrink: 0}}>
                <Footer />
              </footer>
            </div>
          </SnackbarProvider>
        </ThemeProvider>
      </UserProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
