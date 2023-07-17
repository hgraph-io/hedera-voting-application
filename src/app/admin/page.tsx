'use client';

import { Button, Container, Typography } from '@/components';
import { useHashConnect } from '@/context';
import styles from './styles.module.scss';

export default function AdminLoginPage() {
  const hc = useHashConnect();
  return (
    <>
      <div className={styles.background} />
      <Container className={styles.adminLoginPageContainer} maxWidth="xs">
        <Typography component="h1" variant="h2" gutterBottom>
          Admin Login
        </Typography>
        <Typography>
          Login with your whitelisted Hedera Account to view submissions and vote for panelists
          and moderators
        </Typography>
        <form className={styles.formContent} noValidate autoComplete="off">
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => hc?.client?.connectToLocalWallet()}
          >
            Connect to Hashpack
          </Button>
          {hc?.initData?.savedPairings?.map((pairingData, index) => {
            return (
              <Button
                key={index}
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => hc?.client?.disconnect(pairingData.topic)}
              >
                Disconnect wallet {pairingData.accountIds.join(',')}
              </Button>
            );
          })}
        </form>
      </Container>
    </>
  );
}
