import React, {useEffect, useState} from 'react';
import withAuth from '../helpers/withAuth';
import DashboardPage from '../components/DashboardPage'

function Dashboard() {
  return <DashboardPage />
}

export default withAuth(Dashboard);
