'use client';

import { Button, Container, Typography } from '@/components';
import { useHashConnect, useSnackbar } from '@/context';
import { SnackbarMessageSeverity } from '@/types';
import styles from './styles.module.scss';

export default function AdminLoginPage() {
  const hc = useHashConnect();

  const { openSnackbar } = useSnackbar();
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
            onClick={() => {
              if (hc?.initData?.pairingString) hc?.client?.connectToLocalWallet();
              else
                openSnackbar(
                  'Hashpack is not initialized, please try reloading the current page.',
                  SnackbarMessageSeverity.Error
                );
            }}
          >
            Connect to Hashpack
          </Button>
          <Button
            variant="text"
            color="primary"
            fullWidth
            onClick={() => {
              if (hc?.initData?.pairingString) {
                navigator.clipboard.writeText(hc.initData.pairingString);
                openSnackbar('Pairing String Copied', SnackbarMessageSeverity.Success);
              } else
                openSnackbar(
                  'Hashpack is not initialized, please try reloading the current page.',
                  SnackbarMessageSeverity.Error
                );
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
