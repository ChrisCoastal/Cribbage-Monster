import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import useAuthContext from 'src/hooks/useAuthContext';
import { get } from 'firebase/database';
import { getUserSettingsRef } from 'src/utils/helpers';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const { loginUser } = useFirebaseAuth();
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();

  // const redirectAuthUser = useCallback(
  //   (uid: string) =>
  function redirectAuthUser(uid: string) {
    navigate(`/dashboard/${uid}`);
  }
  //   [navigate]
  // );

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      loginUser(email, password, redirectAuthUser);
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   if (!userAuth?.uid) return;
  //   get(getUserSettingsRef(userAuth.uid)).then(() => redirectAuthUser(userAuth.uid));
  // }, [userAuth?.uid, redirectAuthUser]);

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
              <button type="submit" className="bg-red-300">
                Login
              </button>
            </ul>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
