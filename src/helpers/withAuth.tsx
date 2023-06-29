// helpers/withAuth.tsx

import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const user = useUser();

    useEffect(() => {
      if (!user) {
        Router.replace('/login');
      }
    }, [user]);

    return (
      <div>
        {(user) && <WrappedComponent {...props} />}
      </div>
    )
  }
}

export default withAuth;
