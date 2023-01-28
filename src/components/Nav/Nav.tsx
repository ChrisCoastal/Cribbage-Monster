import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AvatarSize } from 'src/@types';

import useAuthContext from 'src/hooks/useAuthContext';
import useSettingsContext from 'src/hooks/useSettingsContext';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/UI/Button';
import Avatar from 'src/components/Avatar/Avatar';
import CreateGame from '../CreateGame/CreateGame';
import DropDown from '../UI/DropDown';

const Nav = () => {
  const { userAuth } = useAuthContext();
  const { userSettingsState } = useSettingsContext();
  const { logoutUser } = useFirebaseAuth();
  const [scrollY, setScrollY] = useState({ pos: 0, isDown: false });
  const navigate = useNavigate();

  console.log(userSettingsState);

  //FIXME:
  function isScroll() {
    console.log(window.scrollY);

    if (window.scrollY > scrollY.pos) setScrollY({ pos: window.scrollY, isDown: true });
    if (window.scrollY < scrollY.pos || window.scrollY === 0)
      setScrollY({ pos: window.scrollY, isDown: false });
  }

  const navPos = scrollY.isDown ? '-top-12' : 'top-0 ';

  useEffect(() => {
    console.log('useEffect');
    window.addEventListener('scroll', isScroll, { passive: true });
    return () => window.removeEventListener('scroll', isScroll);
  }, [scrollY.pos]);

  return (
    <div
      className={`${navPos} fixed z-50 flex h-12 w-full items-center justify-between bg-stone-900/80 px-4 backdrop-blur-sm transition-all md:px-12`}>
      <Link to={'/'}>
        <h1 className="cursor-pointer font-molle text-xl text-white md:text-2xl lg:text-3xl">
          Cribbage Monster
        </h1>
      </Link>
      <ul className="flex items-center gap-3">
        {/* <li>
          <div className="h-6 w-6 rounded-full bg-white"></div>
        </li>
        <li>
          <div className="h-6 w-6 rounded-full bg-white"></div>
        </li> */}
        {userAuth && userSettingsState ? (
          <>
            <li>
              <Avatar className={`${AvatarSize.SM}`} avatar={userSettingsState.avatar}></Avatar>
              <DropDown menuItems={['candy']} />
            </li>
            <li>
              <Button buttonColor="secondary" handler={() => logoutUser(() => navigate('/'))}>
                LOGOUT
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'signup'} className="h-6 rounded-full bg-white">
                JOIN
              </Link>
            </li>
            <li>
              <Link to={'login'} className="h-6 rounded-full bg-white">
                LOGIN
              </Link>
            </li>
          </>
        )}

        {/* <Button handler={signupHandler}>join</Button>
        <Button handler={loginHandler}>login</Button> */}
      </ul>
    </div>
  );
};

export default Nav;
