import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function withAuth(WrappedComponent) {
  return function (props) {
    const router = useRouter();

    React.useEffect(() => {
      axios.get('/api/auth')
        .catch(() => {
          router.replace('/login');
        });
    }, []);

    return <WrappedComponent {...props} />;
  };
}
