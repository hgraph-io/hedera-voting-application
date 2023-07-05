'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import SnackbarProvider from '@/contexts/SnackbarContext';
import theme from './_theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  );
}
