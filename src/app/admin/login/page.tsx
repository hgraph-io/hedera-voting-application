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
      <Typography component="h1" variant="h5">
        Admin Login
      </Typography>
      <form className={styles.formContent} noValidate autoComplete="off">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => hp?.hashconnect.connectToLocalWallet()}
        >
          Connect to Hashpack
        </Button>
        {hp?.hashconnect?.hcData?.pairingData?.map((pairingData) => {
          return (
            <Button
              key={pairingData.topic}
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => hp?.hashconnect.disconnect(pairingData.topic)}
            >
              {pairingData.accountIds.join(',')} - Disconnect from to Hashpack
            </Button>
          );
        })}
      </form>
    </Container>
  );
}
