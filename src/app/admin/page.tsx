'use client';

import { Button, Container, Typography } from '@/components';
import { useHashConnect, useSnackbar } from '@/context';
import styles from './styles.module.scss';

export default function AdminLoginPage() {
  const hc = useHashConnect();
  const sb = useSnackbar();
  return (
    <>
      <div className={styles.background} />
      <Container className={styles.adminLoginPageContainer} maxWidth="xs">
        <Typography component="h1" variant="h3" gutterBottom>
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
          <Button
            variant="text"
            color="primary"
            fullWidth
            onClick={() => {
              navigator.clipboard.writeText(hc.initData.pairingString);
              sb.openSnackbar("Pairing String Copied", "success")
            }}
          >
            Copy Pairing String
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
