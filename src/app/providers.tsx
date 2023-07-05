'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import SnackbarProvider from '@/contexts/SnackbarContext';
import EmotionCacheProvider from '@/contexts/EmotionCacheProvider';
import theme from './_theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>{children}</SnackbarProvider>
      </ThemeProvider>
    </EmotionCacheProvider>
  );
}
