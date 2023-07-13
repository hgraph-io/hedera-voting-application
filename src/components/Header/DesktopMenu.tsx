'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Session } from '@supabase/auth-helpers-nextjs';
import { VIEWS } from '@supabase/auth-ui-shared';
import { Button } from '@/components';
import { useHashConnect } from '@/context';

import styles from './styles.module.scss';

//https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
export default function DesktopMenu({ session }: { session: Session | null }) {
  const pathname = usePathname();
  console.log(pathname);
  const hc = useHashConnect();
  //@ts-ignore
  const pairedWalletId =
    hc?.connectionStatusChangeEvent == 'Paired' &&
    // @ts-ignore
    hc?.client?.hcData.pairingData.find(Boolean).accountIds.find(Boolean);

  return (
    <div className={styles.links}>
      <Link href="/">
        <div className={pathname === '/' ? styles.activeLink : styles.link}>Home</div>
      </Link>
      <Link href="/dashboard">
        <div className={pathname.startsWith('/dashboard') ? styles.activeLink : styles.link}>
          Dashboard
        </div>
      </Link>
      <Link href="/admin">
        <div className={pathname.startsWith('/admin') ? styles.activeLink : styles.link}>
          Admin
        </div>
      </Link>
      <div className={styles.desktopButtonContainer}>
        {pathname.startsWith('/admin') && pairedWalletId && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            // @ts-ignore
            onClick={() => hc.client.disconnect(hc.client.hcData.topic)}
          >
            Disconnect wallet {pairedWalletId}
          </Button>
        )}

        {!pathname.startsWith('/admin') && session?.user && (
          <form className={styles.desktopSignoutForm} action="/auth/signout" method="post">
            <Button fullWidth variant="contained" type="submit">
              Sign Out
            </Button>
          </form>
        )}
        {!pathname.startsWith('/admin') && !session?.user && (
          <>
            <Button
              component="a"
              href={`/login?v=${VIEWS.SIGN_UP}`}
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
      </div>
    </div>
  );
}
