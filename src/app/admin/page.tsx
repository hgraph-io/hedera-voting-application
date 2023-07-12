// @ts-nocheck
'use client';

import { Button, Container, Typography } from '@/components';
import { useHashpack } from '@/app/admin/providers';
import styles from './styles.module.scss';

export default function AdminLoginPage() {
  const hp = useHashpack();
  console.log('xxxxxxxxxxxx');
  console.log(hp);
  return (
    <Container className={styles.adminLoginPageContainer} maxWidth="xs">
      <Typography component="h1" variant="h2">
        Admin Login
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </Typography>
      <form className={styles.formContent} noValidate autoComplete="off">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => hp.client.connectToLocalWallet()}
        >
          Connect to Hashpack
        </Button>
        {hp?.initData?.savedPairings?.map((pairingData, index) => {
          return (
            <Button
              key={index}
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => hp.client.disconnect(pairingData.topic)}
            >
              {pairingData.accountIds.join(',')} - Disconnect from to Hashpack
            </Button>
          );
        })}
      </form>
    </Container>
  );
}
