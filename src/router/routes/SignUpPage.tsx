import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { firebaseAuth, db } from 'src/firestore.config';
import { collection } from 'firebase/firestore';

import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import useAuthContext from 'src/hooks/useAuthContext';
import Button from 'src/components/UI/Button';

export async function signUpAction() {
  await new Promise((res) => {
    res(() => console.log('here'));
  });
}

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { createUser } = useFirebaseAuth();
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();
  // const { setAuth } = useFirebaseAuth();

  function redirectAuthUser() {
    console.log('redir');
    navigate('/dashboard');
  }

  useEffect(() => {
    if (userAuth) navigate('/dashboard');
  }, [userAuth]);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const username = formData.get('username') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      createUser(username, email, password, redirectAuthUser);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>SIGNUP</h1>
      {userAuth ? (
        <div>
          <p>you are already signed in</p>
          <div>PLAY GAMES</div>
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <ul className="flex flex-col gap-3">
            <li>
              <label htmlFor="username">Username</label>
              <input
                type="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </li>
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
            <button type="submit">Join</button>
          </ul>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
