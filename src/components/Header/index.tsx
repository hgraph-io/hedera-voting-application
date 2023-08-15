'use client'

import { AppBar, Toolbar, Grid, Hidden, Box } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import type { Session } from '@supabase/auth-helpers-nextjs'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'

export default function Header({ session }: { session: Session | null }) {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Grid container>
          <Grid item xs={5}>
            <Link href="/" style={{ display: 'inline-block' }}>
              <Image
                src="/assets/logo.png"
                width={110}
                height={34}
                style={{ width: 'auto' }}
                alt="Logo"
              />
            </Link>
          </Grid>
          <Grid item xs={7}>
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
