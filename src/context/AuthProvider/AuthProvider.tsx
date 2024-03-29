import { createContext, FC, ReactNode } from 'react';
import { AuthContextType } from 'src/@types';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';

type AuthProviderProps = {
  children?: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // state is held/managed in the useFirebaseAuth hook
  const authState = useFirebaseAuth();

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
