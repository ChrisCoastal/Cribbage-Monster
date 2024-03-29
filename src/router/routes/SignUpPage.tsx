import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'src/components/UI/Button';

import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import useAuthContext from 'src/hooks/useAuthContext';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { createUser } = useFirebaseAuth();
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();

  function redirectAuthUser(uid: string) {
    navigate(`/dashboard/${uid}`);
  }

  useEffect(() => {
    if (userAuth) navigate(`/dashboard/${userAuth.uid}`);
  }, [userAuth, navigate]);

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
    <div className="relative flex h-screen items-center justify-center bg-cardbacks object-scale-down text-stone-50">
      <div className="pointer-events-none absolute h-full w-full bg-gradient-to-br from-stone-900/70 to-stone-900/90 "></div>
      <div className="relative z-10 w-80 animate-fade-up-delay-xs rounded-xl bg-stone-900/60 p-8 sm:w-96">
        <h3 className="mb-6 text-lg font-semibold tracking-wider">SIGNUP</h3>
        <form onSubmit={submitHandler} className="mb-8">
          <ul className="flex flex-col gap-2">
            <li className="">
              <label htmlFor="username" className="mb-0.5 block text-sm">
                Username
              </label>
              <input
                type="username"
                name="username"
                value={username}
                className=" w-full rounded-sm px-2 py-1 text-sm font-light text-stone-800 focus:outline focus:outline-2 focus:outline-emerald-200"
                onChange={(e) => setUsername(e.target.value)}
              />
            </li>
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
                Create Account
              </Button>
            </li>
          </ul>
        </form>
        <p className="text-center text-sm font-light">
          Already have an account?
          <span
            tabIndex={0}
            className="cursor-pointer p-2 text-lg font-medium underline transition-all hover:text-emerald-300 sm:text-base"
            onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
