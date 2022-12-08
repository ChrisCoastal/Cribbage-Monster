import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import Button from 'src/components/UI/Button';
import useAuthContext from 'src/hooks/useAuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useFirebaseAuth();
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();

  function redirectAuthUser() {
    console.log('redir');
    navigate('/dashboard');
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    loginUser(email, password, redirectAuthUser);
  }

  return (
    <div className="flex justify-center">
      <div>
        <h1>LOGIN</h1>
        {userAuth ? (
          <div>
            <p>you are already signed in</p>
            <div>PLAY GAMES</div>
          </div>
        ) : (
          <form onSubmit={submitHandler}>
            <ul className="flex flex-col gap-3">
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
              <button type="submit">Login</button>
            </ul>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
