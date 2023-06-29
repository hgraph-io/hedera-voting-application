// pages/admin-dashboard.tsx
import React from 'react';
import withAdmin from '../helpers/withAdmin'; // import the withAdmin HOC
import AdminDashboard from '../components/AdminDashboard'

const AdminDashboardPage = () => {
  return <AdminDashboard />
}

export default withAdmin(AdminDashboardPage); // wrap the AdminDashboardPage component with the withAdmin HOC
