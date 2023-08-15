'use client'

import { usePathname } from 'next/navigation'
import { Session } from '@supabase/auth-helpers-nextjs'
import { VIEWS } from '@supabase/auth-ui-shared'
import { useHashConnect } from '@/context'
import { Button } from '@/components'
import styles from './styles.module.scss'

function AdminPageButtons({ session }: { session: Session | null }) {
  const { accountId, client } = useHashConnect()
  return (
    <>
      {(accountId && (
        // connected to hashpack
        <Button
          variant="contained"
          color="primary"
          fullWidth
          //@ts-ignore
          onClick={() => client?.disconnect()}
        >
          Disconnect wallet {accountId}
        </Button>
      )) ||
        // not connected to hashpack but logged in to applicant flow
        (session?.user && (
          <form action="/auth/signout" method="post">
            <Button variant="contained" type="submit">
              Sign Out
            </Button>
          </form>
        )) || (
          // not paired with hashpack and not logged in to applicant flow
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
    </>
  )
}

function ApplicantPageButtons({ session }: { session: Session | null }) {
  return (
    <>
      {(session?.user && (
        // logged in to applicant flow
        <form action="/auth/signout" method="post">
          <Button variant="contained" type="submit" className={styles.signoutButton}>
            Sign Out
          </Button>
        </form>
      )) || (
        // not logged in to applicant flow
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
    </>
  )
}

export default function LoginButtons({ session }: { session: Session | null }) {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return <AdminPageButtons session={session} />
  else return <ApplicantPageButtons session={session} />
}
