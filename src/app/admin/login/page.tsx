'use client';

import { Button, Container, Typography } from '@mui/material';
import styles from './styles.module.scss';

export default function AdminLoginPage() {
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
          onClick={() => alert('not implemented')}
        >
          Login with Hashpack
        </Button>
        <Button component="a" variant="outlined" fullWidth href="/login">
          User Login
        </Button>
      </form>
    </Container>
  );
}
