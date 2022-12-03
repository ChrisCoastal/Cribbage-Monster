import { createContext, FC, ReactNode } from 'react';
import { AuthContextType } from 'src/@types';
import useAuthProvider from 'src/hooks/useAuthProvider';

type AuthProviderProps = {
  children?: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // state is held/managed in the useProvideAuthHook
  const authState = useAuthProvider();

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
