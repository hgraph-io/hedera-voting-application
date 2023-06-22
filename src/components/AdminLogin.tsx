import React from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import styles from './AdminLogin.module.scss';

const AdminLogin: React.FC = () => {
  return (
    <div className={styles.adminLogin}>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" align="center" className={styles.title}>
          Admin Login
        </Typography>
        <form noValidate autoComplete="off">
          <TextField label="Username" variant="outlined" fullWidth className={styles.inputField} />
          <TextField label="Password" variant="outlined" type="password" fullWidth className={styles.inputField} />
          <Button variant="contained" color="primary" type="submit" fullWidth className={styles.submitBtn}>
            Log In
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default AdminLogin;
