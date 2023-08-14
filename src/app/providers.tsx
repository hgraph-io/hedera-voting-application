'use client'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { SnackbarProvider, EmotionCacheProvider, HashConnectProvider } from '@/context'
import theme from '@/components/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <HashConnectProvider>{children}</HashConnectProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </EmotionCacheProvider>
  )
}
