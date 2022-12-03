import { useState } from 'react';

import { auth } from 'src/firestore.config';

import useAuthProvider from 'src/hooks/useAuthProvider';
import useAuthContext from 'src/hooks/useAuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useAuthContext();
  // const { setAuth } = useAuthProvider();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e, authContext);
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
