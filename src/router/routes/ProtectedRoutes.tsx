import { useEffect, useState, Suspense, FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from 'src/hooks/useAuthContext';
// import { useTimer } from '../hooks/useTimer';

// firebase
import { auth } from 'src/firestore.config';
import { getAuth } from 'firebase/auth';

//types
import { UserState } from 'src/@types';

interface ProtectedRoutesProps {
  user?: UserState | null;
  redirectPath?: string;
  children?: React.ReactElement;
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({
  redirectPath = '/login',
  children
}: ProtectedRoutesProps) => {
  const [loading, setLoading] = useState<'loading' | 'userAuth' | 'redirect'>('loading');
  const [timeout, setTimeout] = useState<number>(0);
  const location = useLocation();
  const user = useAuthContext().userAuth;

  // TODO: set timeout for auth; see frondly
  // useTimer(
  //   () => {
  //     console.log('using timer');
  //     setTimeout(timeout + 1);
  //   },
  //   !user ? 100 : null
  // );

  // useEffect(() => {
  //   setLoading(user ? 'userAuth' : 'loading');
  //   if (timeout === 10 && !user) setLoading('redirect');
  // }, [user, timeout]);

  if (loading === 'loading') return <p>Loading...</p>;
  if (loading === 'userAuth') return children ? children : <Outlet />;
  if (loading === 'redirect')
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  else return <Navigate to={redirectPath} state={{ from: location }} replace />;
};

export default ProtectedRoutes;
