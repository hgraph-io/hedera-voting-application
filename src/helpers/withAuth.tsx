import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';
import { supabase } from '../supabaseClient';  // make sure to import supabase client

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const user = useUser();

    useEffect(() => {
      const checkUserSession = async () => {
        const session = await supabase.auth.getSession();
        console.log(session)
        if (!session) {
          Router.replace('/login');
        }
      };

      checkUserSession();
    }, []);

    return (
      <div>
        {(user) && <WrappedComponent {...props} />}
      </div>
    )
  }
}

export default withAuth;
