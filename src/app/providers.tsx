//@ts-nocheck

'use client';

import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from '../contexts/SnackbarContext';
import theme from './_theme';

export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  );
}
