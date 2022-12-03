import { useContext } from 'react';
import { AuthContext } from 'src/context/AuthProvider/AuthProvider';

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
