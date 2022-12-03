import { createContext, FC, ReactNode } from 'react';
import { AuthContextType } from 'src/@types';
import { useProvideAuth } from 'src/hooks/useAuthProvider';

type AuthProviderProps = {
  children?: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // state is held/managed in the useProvideAuthHook
  const authState = useProvideAuth();

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
