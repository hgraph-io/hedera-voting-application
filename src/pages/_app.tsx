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

//@ts-ignoe
const theme = createTheme({
  palette: {
    primary: {
      main: '#7048E8',
      contrastText: '#ffcc00',
    },
    secondary: {
      light: '#51CF66',
      main: '#7048E8',
      contrastText: '#ffcc00',
    },
    text: {
      primary: '#212429',
      secondary: '#495057',
    },
  },
  typography: {
    fontFamily: 'Styrene A Web, Arial',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          height: '32px',
          minWidth: '200px',
          borderRadius: '50px',
          border:'none',
          color: '#212429',
          background: '#F9F9F9',
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: 'linear-gradient(45deg, #21A056, #3EC878)',
          },
        },
        contained: {
          height: '32px',
          minWidth: '100px',
          borderRadius: '50px',
          border:'none',
          color: '#F9F9F9',
          background: '#8259EF',
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: 'linear-gradient(45deg, #21A056, #3EC878)',
          },
        },
        outlined: {
          height: '32px',
          minWidth: '200px',
          color: '#212429',
          border: '1px solid #212429',
          borderRadius: '50px',
          textTransform: 'capitalize',
          background: '#f9f9f9',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#7048E8',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f9f9f9',
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
