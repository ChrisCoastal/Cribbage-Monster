import React from 'react';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { AvatarSize } from 'src/@types';

import Avatar from 'src/components/Avatar/Avatar';
import Button from 'src/components/UI/Button';
import CreateGame from 'src/components/CreateGame/CreateGame';
import Logo from 'src/components/Logo/Logo';
import Menu from 'src/components/UI/Menu';
import MenuIcon from 'src/components/UI/icons/MenuIcon/MenuIcon';

import useAuthContext from 'src/hooks/useAuthContext';
import useSettingsContext from 'src/hooks/useSettingsContext';
import useScrollY from 'src/hooks/useScrollY';

const Nav = () => {
  const navigate = useNavigate();
  const params = useParams();
  const scrollY = useScrollY();

  const { userAuth } = useAuthContext();
  const { userSettingsState } = useSettingsContext();
  const { logoutUser } = useFirebaseAuth();

  const isGame = params.gameId;
  const navIsVisible = scrollY.isDown && scrollY.pos > 140 && !isGame;
  const navPos = navIsVisible ? '-top-16' : 'top-0';

  const authNavItems = [
    <li key={0} className="border-b px-4 pb-4 tracking-wide md:text-base">
      <span className="flex items-center justify-between gap-2">
        <Avatar className={`${AvatarSize.SM} user-menu`} avatar={userSettingsState.avatar} />
        <p className="text-sm">{userSettingsState.displayName}</p>
      </span>
    </li>,
    <li
      key={2}
      className="tracking-wide transition-all duration-200 hover:text-emerald-300 md:text-base">
      <Link to={`/`}>Home</Link>
    </li>,
    <li key={1}>
      <CreateGame className="tracking-wide transition-all duration-200 hover:text-emerald-300 md:text-base">
        Create Game
      </CreateGame>
    </li>,
    <li
      key={2}
      className="tracking-wide transition-all duration-200 hover:text-emerald-300 md:text-base">
      <Link to={`/dashboard/${userAuth?.uid}`}>Dashboard</Link>
    </li>,
    <li
      key={4}
      className="tracking-wide transition-all duration-200 hover:text-emerald-300 md:text-base">
      <Link to={'/rules'}>Rules</Link>
    </li>,
    <li key={5} className="flex w-full items-center">
      <Button
        className="mt-4"
        buttonColor="secondary"
        handler={() => logoutUser(() => navigate('/'))}>
        Logout
      </Button>
    </li>
  ];
  const unAuthNavItems = [
    <li
      key={2}
      className="tracking-wide transition-all duration-200 hover:text-emerald-300 md:text-base">
      <Link to={`/`}>Home</Link>
    </li>,
    <li
      key={6}
      className="tracking-wide transition-all duration-200 hover:text-emerald-300 md:text-base">
      <Link to={'/login'}>Login</Link>
    </li>,
    <li
      key={7}
      className="tracking-wide transition-all duration-200 hover:text-emerald-300 md:text-base">
      <Link to={'/rules'}>Rules</Link>
    </li>,
    <li key={8}>
      <Button buttonSize="sm" buttonColor="secondary">
        <Link to={'/signup'} className="">
          JOIN
        </Link>
      </Button>
    </li>
  ];
  const navItems = userAuth && userSettingsState ? authNavItems : unAuthNavItems;

  return (
    <nav
      className={`${navPos} ${
        !isGame ? 'fixed' : ''
      } z-40 flex h-16 w-full items-center justify-between bg-stone-900 px-4 text-stone-50 shadow-lg transition-all duration-500 sm:px-8 md:px-12`}>
      <div>
        <Link to={'/'}>
          <Logo
            height="40"
            width="120"
            className=" transition-all duration-200 hover:fill-emerald-300"
          />
        </Link>
      </div>
      <div>
        <Menu menuItems={navItems} scrollY={scrollY}>
          <MenuIcon
            height="30"
            width="30"
            className=" transition-all duration-200 hover:fill-emerald-300"
          />
        </Menu>
      </div>
    </nav>
  );
};

export default Nav;
