'use client'

import { AppBar, Toolbar, Grid, Hidden, Box } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import type { Session } from '@supabase/auth-helpers-nextjs'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'

export default function Header({ session }: { session: Session | null }) {
  return (
    <AppBar position="static" elevation={0} sx={{ zIndex: 1100 }}>
      <Toolbar style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        <Grid container>
          <Grid item xs={3}>
            <Link href="/" style={{ display: 'inline-block' }}>
              <Image
                src="/assets/logo_updated.png"
                width={110}
                height={34}
                style={{ width: 'auto', top: '2px', position: 'relative' }}
                alt="Logo"
              />
            </Link>
          </Grid>
          <Grid item xs={9}>
            <Hidden mdDown implementation="css">
              <DesktopMenu session={session} />
            </Hidden>

            <Hidden mdUp implementation="css">
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <MobileMenu session={session} />
              </Box>
            </Hidden>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
