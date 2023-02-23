import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'src/components/UI/Button';

import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import useAuthContext from 'src/hooks/useAuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useFirebaseAuth();
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();

  function redirectAuthUser(uid: string) {
    navigate(`/dashboard/${uid}`);
  }

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

  useEffect(() => {
    if (!userAuth?.uid) return;
    redirectAuthUser(userAuth.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuth?.uid]);

  return (
    <div className="relative flex h-screen items-center justify-center bg-cardbacks object-scale-down text-stone-50">
      <div className="pointer-events-none absolute h-full w-full bg-gradient-to-br from-stone-900/70 to-stone-900/90 "></div>
      <div className="relative z-10 w-80 animate-fade-up-delay-xs rounded-xl bg-stone-900/60 p-8 sm:w-96">
        <h3 className="mb-6 text-lg font-semibold tracking-wider">LOGIN</h3>
        <form onSubmit={submitHandler} className="mb-8">
          <ul className="flex flex-col gap-2">
            <li>
              <label htmlFor="email" className="mb-0.5 block text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                autoComplete="email"
                className=" w-full rounded-sm px-2 py-1 text-sm font-light text-stone-800 focus:outline focus:outline-2 focus:outline-emerald-200"
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="password" className="mb-0.5 block text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                className=" w-full rounded-sm px-2 py-1 text-sm font-light text-stone-800 focus:outline focus:outline-2 focus:outline-emerald-200"
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <li className="mt-3 self-center">
              <Button buttonColor="secondary" type="submit">
                Login
              </Button>
            </li>
          </ul>
        </form>
        <p className="text-center text-sm font-light">
          Don&apos;t have an account?
          <span
            tabIndex={0}
            className="cursor-pointer p-2 text-lg font-medium underline transition-all hover:text-emerald-300 sm:text-base"
            onClick={() => navigate('/signup')}>
            Join
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
