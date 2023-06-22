import React from 'react';
import styles from './AdminLogin.module.scss';

const AdminLogin: React.FC = () => {
  return (
    <div className={styles.adminLogin}>
      <h1>Admin Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default AdminLogin;
