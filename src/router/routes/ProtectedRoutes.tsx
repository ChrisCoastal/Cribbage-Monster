import { useEffect, useState, FC } from 'react';
import { Navigate, Outlet, redirect, useLocation } from 'react-router-dom';
import useAuthContext from 'src/hooks/useAuthContext';
import { useTimer } from 'src/hooks/useTimer';

// firebase
import { firebaseAuth } from 'src/firestore.config';
import { getAuth } from 'firebase/auth';

//types
import { UserState, ProtectedAuth } from 'src/@types';

interface ProtectedRoutesProps {
  user?: UserState | null;
  redirectPath?: string;
  children?: React.ReactElement;
}

const loader = async () => {
  const user = useAuthContext().userAuth;
  if (!user) {
    return redirect('/login');
  }
};

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({
  redirectPath = '/login',
  children
}: ProtectedRoutesProps) => {
  const [isAuth, setIsAuth] = useState<ProtectedAuth>(ProtectedAuth.LOADING);
  const [timeout, setTimeout] = useState<number>(0);
  const location = useLocation();
  const { userAuth } = useAuthContext();

  // TODO: set timeout for auth; see frondly
  useTimer(
    () => {
      console.log('using timer');
      setTimeout(timeout + 1);
    },
    !userAuth ? 100 : null
  );

  useEffect(() => {
    setIsAuth(userAuth ? ProtectedAuth.USER_IS_AUTH : ProtectedAuth.LOADING);
    if (timeout === 10 && !userAuth) setIsAuth(ProtectedAuth.NOT_IS_AUTH);
  }, [userAuth, timeout]);

  if (isAuth === ProtectedAuth.LOADING) return <p>Loading...</p>;
  if (isAuth === ProtectedAuth.USER_IS_AUTH) return children ? children : <Outlet />;
  if (isAuth === ProtectedAuth.NOT_IS_AUTH)
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  else return <Navigate to={redirectPath} state={{ from: location }} replace />;
};

export default ProtectedRoutes;
