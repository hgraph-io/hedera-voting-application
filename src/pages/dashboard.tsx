import React, {useEffect, useState} from 'react';
import withAuth from '../components/withAuth';
import { supabase } from '../supabaseClient';
import DashboardPage from '../components/DashboardPage'

type Application = {
  id: string;
  name: string;
  // Add other fields as per your 'applications' table
};

function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    let { data: applications, error } = await supabase
      .from('applications')
      .select('*');
    if (error) console.error('Error: ', error);
    else {
      console.log(applications)
      setApplications(applications || []);
    }
  }
  return <DashboardPage />
}

export default Dashboard;
