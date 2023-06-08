import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Header from '../components/Header';  // update this with the actual path

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />  {/* Here is your header */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
