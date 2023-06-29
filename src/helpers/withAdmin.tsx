// helpers/withAdmin.tsx

import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';
import { supabase } from '../supabaseClient'; 


const withAdmin = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const user = useUser();

    useEffect(() => {
      const checkAdminStatus = async (accountId: string) => {
        const { data: adminAccounts, error } = await supabase
          .from('admin_accounts')
          .select('accountId')
          .eq('accountId', accountId);
        console.log('adminAccounts',adminAccounts)
        if (error) {
          console.error('Error: ', error);
        } else if (adminAccounts && adminAccounts.length > 0) {
          console.log('is admin');
        } else {
          Router.replace('/admin-login');
        }
      };

      if (user && user.accountId) {
        checkAdminStatus(user.accountId)
      }
    }, [user]);

    return (
      <div>
        {user && <WrappedComponent {...props} />}
      </div>
    )
  }
}

export default withAdmin;
