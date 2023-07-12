'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { SnackbarProvider, EmotionCacheProvider } from '@/context';
import theme from '@/components/theme';

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
