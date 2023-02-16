import { FC, useState, useEffect } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import SubHeading from 'src/components/UI/SubHeading';

import useAuthContext from 'src/hooks/useAuthContext';

type PageError = {
  data: null | unknown;
  status: number;
  statusText?: string;
  message?: string;
};

const ErrorPage: FC = () => {
  const error = useRouteError() as PageError;

  const { userAuth } = useAuthContext();
  const navigate = useNavigate();

  function redirectAuthUser(uid: string) {
    navigate(`/dashboard/${uid}`);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      !userAuth?.uid ? navigate(`/`) : redirectAuthUser(userAuth.uid);
    }, 5000);
    return () => clearTimeout(timer);
  }, [userAuth?.uid]);

  return (
    <div className="relative flex h-screen items-center justify-center bg-cardbacks object-scale-down text-stone-50">
      <div className="pointer-events-none absolute h-full w-full bg-gradient-to-br from-stone-900/70 to-stone-900/90 "></div>
      <div className="relative z-10 w-80 animate-fade-up-delay-xs rounded-xl bg-stone-900/60 p-8 sm:w-[26rem]">
        <SubHeading className="mb-8 tracking-wider">Yikes! Error 404</SubHeading>
        <p className="text-md mb-4 font-semibold">Some places even Monsters should not tread...</p>
        <p>Redirecting you to safety.</p>
        <p>
          Or{' '}
          <span
            tabIndex={0}
            className="cursor-pointer underline transition-all hover:text-emerald-300"
            onClick={() => navigate('/signup')}>
            click here
          </span>{' '}
          to go home.
        </p>
      </div>
    </div>
  );
};
// <div className="bg-black text-stone-50">
//   <h1>Oops!</h1>
//   <p>Sorry, an unexpected error has occurred.</p>
//   <p>
//     <i>{error.statusText || error.message}</i>
//   </p>
// </div>

export default ErrorPage;
