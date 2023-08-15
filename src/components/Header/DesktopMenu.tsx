'use client'

import { Session } from '@supabase/auth-helpers-nextjs'
import { Grid } from '@/components'
import NavLink from './NavLink'
import LoginButtons from './LoginButtons'

export default function DesktopMenu({ session }: { session: Session | null }) {
  return (
    <Grid container>
      <Grid item xs={0} lg={3} />
      <Grid
        item
        md={7}
        lg={5}
        display="flex"
        justifyContent="space-evenly"
        position="relative"
        top="18px"
      >
        <NavLink href="/">Home</NavLink>
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/admin">Admin</NavLink>
      </Grid>
      <Grid
        item
        md={5}
        lg={4}
        display="flex"
        justifyContent="space-evenly"
        position="relative"
        top="6px"
      >
        <LoginButtons session={session} />
      </Grid>
    </Grid>
  )
}
