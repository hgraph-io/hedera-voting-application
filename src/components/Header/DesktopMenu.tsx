'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from '@supabase/auth-helpers-nextjs'
import { VIEWS } from '@supabase/auth-ui-shared'
import { Button, Box, Grid } from '@/components'
import { useHashConnect } from '@/context'
import styles from './styles.module.scss'

function MenuLink({ href, children }: { href: string; children: string }) {
  const pathname = usePathname()
  return (
    <Box
      position="relative"
      top="-2px"
      pb="8px"
      borderBottom={pathname === href ? 4 : undefined}
      borderColor={pathname === href ? 'secondary.main' : undefined}
      color={pathname === href ? 'text.primary' : 'grey.600'}
    >
      <Link href={href}>{children}</Link>
    </Box>
  )
}
export default function DesktopMenu({ session }: { session: Session | null }) {
  const { accountId, client } = useHashConnect()
  const pathname = usePathname()

  return (
    <Grid container>
      <Grid
        item
        xs={6}
        display="flex"
        justifyContent="space-evenly"
        position="relative"
        top="18px"
      >
        <MenuLink href="/">Home</MenuLink>
        <MenuLink href="/dashboard">Dashboard</MenuLink>
        <MenuLink href="/admin">Admin</MenuLink>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={4} display="flex" justifyContent="space-evenly" alignItems="flex-end">
        {pathname.startsWith('/admin') && accountId && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            //@ts-ignore
            onClick={() => client?.disconnect()}
          >
            Disconnect wallet {accountId}
          </Button>
        )}
        {pathname.startsWith('/admin') && !accountId && !session?.user && (
          <>
            <Button component="a" href={`/login?v=${VIEWS.SIGN_IN}`} variant="outlined">
              Login
            </Button>
            <Button component="a" href={`/login?v=${VIEWS.SIGN_UP}`} variant="contained">
              Sign Up
            </Button>
          </>
        )}
        {pathname.startsWith('/admin') && !accountId && session?.user && (
          <form action="/auth/signout" method="post">
            <Button variant="contained" type="submit">
              Sign Out
            </Button>
          </form>
        )}

        {!pathname.startsWith('/admin') && session?.user && (
          <form action="/auth/signout" method="post">
            <Button variant="contained" type="submit" className={styles.signoutButton}>
              Sign Out
            </Button>
          </form>
        )}
        {!pathname.startsWith('/admin') && !session?.user && (
          <>
            <Button
              component="a"
              href={`/login?v=${VIEWS.SIGN_IN}`}
              variant="outlined"
              className={styles.signupButton}
            >
              Login
            </Button>
            <Button
              component="a"
              href={`/login?v=${VIEWS.SIGN_UP}`}
              variant="contained"
              className={styles.signupButton}
            >
              Sign Up
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  )
}
