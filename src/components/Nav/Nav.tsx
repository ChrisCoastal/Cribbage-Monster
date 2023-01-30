import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AvatarSize } from 'src/@types';

import useAuthContext from 'src/hooks/useAuthContext';
import useSettingsContext from 'src/hooks/useSettingsContext';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/UI/Button';
import Avatar from 'src/components/Avatar/Avatar';
import CreateGame from 'src/components/CreateGame/CreateGame';
import MenuIcon from 'src/components/UI/icons/MenuIcon/MenuIcon';
import Menu from 'src/components/UI/Menu';
// import useMenu from 'src/hooks/useMenu';
import useMediaQuery from 'src/hooks/useMediaQuery';
import { MEDIA_SIZE } from 'src/utils/constants';

const Nav = () => {
  const navigate = useNavigate();

  const { userAuth } = useAuthContext();
  const { userSettingsState } = useSettingsContext();
  const { logoutUser } = useFirebaseAuth();

  const [scrollY, setScrollY] = useState({ pos: 0, isDown: false });

  const minMediaSm = useMediaQuery(MEDIA_SIZE.sm);

  // const { toggleMenuHandler: toggleAppMenu, Menu: AppMenu, MenuButton: AppMenuButton } = useMenu();
  // const {
  //   toggleMenuHandler: toggleUserMenu,
  //   Menu: UserMenu,
  //   MenuButton: UserMenuButton
  // } = useMenu();

  const menuItems = [
    <div key={0} className={`text-lg tracking-wide text-stone-50`}>
      <Link to={`/rules`}>Rules</Link>
    </div>,
    <div
      key={1}
      className={`text-lg tracking-wide text-stone-50`}
      onClick={() => navigate(`/dashboard/${userAuth?.uid}`)}>
      {/* <Link to={`/dashboard/${userAuth?.uid}`}>Dashboard</Link> */}
      <div className="cursor-pointer">Dashboard</div>
    </div>,
    <div key={2}>
      <Button buttonColor="secondary" handler={() => logoutUser(() => navigate('/login'))}>
        LOGOUT
      </Button>
    </div>
  ];

  const renderedMenuItems = []
    .map((item, index) => {
      return (
        <li key={index} className={`text-lg tracking-wide text-stone-50`}>
          {/* <Link to={item.path}>{item.text}</Link> */}
        </li>
      );
    })
    .concat(
      userAuth && userSettingsState ? (
        <li>
          <Menu menuItems={menuItems}>
            <Avatar className={`${AvatarSize.SM} user-menu`} avatar={userSettingsState.avatar} />
          </Menu>
          {/* <UserMenu menuItems={menuItems} /> */}
        </li>
      ) : (
        <>
          <li className="text-lg tracking-wide">
            <Link to={'/login'}>Login</Link>
          </li>
          <li>
            <Button buttonSize="sm" buttonColor="secondary">
              <Link to={'signup'} className="">
                JOIN
              </Link>
            </Button>
          </li>
        </>
      )
    );

  function isScroll() {
    if (window.scrollY > scrollY.pos) setScrollY({ pos: window.scrollY, isDown: true });
    if (window.scrollY < scrollY.pos || window.scrollY === 0)
      setScrollY({ pos: window.scrollY, isDown: false });
  }

  const navPos = scrollY.isDown ? '-top-12' : 'top-0 ';

  useEffect(() => {
    window.addEventListener('scroll', isScroll, { passive: true });
    return () => window.removeEventListener('scroll', isScroll);
  }, [scrollY.pos]);

  // const mobileMenu = (
  //   <button onClick={toggleAppMenu} className="app-menu">
  //     <MenuIcon height="30" width="30" />
  //     <AppMenu menuItems={renderedMenuItems} buttonClass="app-menu" />
  //   </button>
  // );

  const authNavItems = [
    <li key={0} className="border-b px-4 pb-4 tracking-wide md:text-base">
      <span className="flex items-center justify-between gap-2">
        <Avatar className={`${AvatarSize.SM} user-menu`} avatar={userSettingsState.avatar} />
        <p className="text-sm">{userSettingsState.displayName}</p>
      </span>
    </li>,
    <li key={1}>
      <CreateGame className="tracking-wide md:text-base">Create Game</CreateGame>
    </li>,
    <li key={2} className="tracking-wide md:text-base">
      <Link to={`/dashboard/${userAuth?.uid}`}>Dashboard</Link>
    </li>,
    <li key={4} className="tracking-wide md:text-base">
      <Link to={'/rules'}>Learn</Link>
    </li>,
    <li key={5} className="flex w-full items-center">
      <Button
        className="mt-4"
        buttonColor="secondary"
        handler={() => logoutUser(() => navigate('/login'))}>
        LOGOUT
      </Button>
    </li>
  ];
  const unAuthNavItems = [
    <li key={6} className="tracking-wide md:text-base">
      <Link to={'/login'}>Login</Link>
    </li>,
    <li key={7} className="tracking-wide md:text-base">
      <Link to={'/rules'}>Learn</Link>
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
      className={`${navPos} fixed z-40 flex h-16 w-full items-center justify-between bg-stone-900/60 px-4 text-stone-50 transition-all sm:px-12`}>
      <Link to={'/'}>
        <h1 className="cursor-pointer font-molle text-xl md:text-2xl lg:text-3xl">
          Cribbage Monster
        </h1>
      </Link>
      <div>
        <Menu menuItems={navItems}>
          <MenuIcon height="30" width="30" />
        </Menu>
      </div>
    </nav>
  );
};

export default Nav;
