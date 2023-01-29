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
import MenuIcon from '../UI/icons/MenuIcon/MenuIcon';
import useMenu from 'src/hooks/useMenu';
import useMediaQuery from 'src/hooks/useMediaQuery';
import { MEDIA_SIZE } from 'src/utils/constants';

const Nav = () => {
  const navigate = useNavigate();

  const { userAuth } = useAuthContext();
  const { userSettingsState } = useSettingsContext();
  const { logoutUser } = useFirebaseAuth();

  const [scrollY, setScrollY] = useState({ pos: 0, isDown: false });
  const [mobile, setMobile] = useState(false);

  const minMediaSm = useMediaQuery(MEDIA_SIZE.sm);
  const {
    menuIsVisible: appMenuVisible,
    toggleMenuHandler: toggleAppMenu,
    Menu: AppMenu
  } = useMenu();

  const {
    menuIsVisible: userMenuVisible,
    toggleMenuHandler: toggleUserMenu,
    Menu: UserMenu
  } = useMenu();

  const menuItems = [{ text: 'Rules', path: '/rules' }];

  const renderedMenuItems = menuItems
    .map((item, index) => {
      return (
        <li key={index} className={`text-lg tracking-wide text-stone-50`}>
          <Link to={item.path}>{item.text}</Link>
        </li>
      );
    })
    .concat(
      userAuth && userSettingsState ? (
        <li>
          <Avatar className={`${AvatarSize.SM}`} avatar={userSettingsState.avatar}></Avatar>
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

  const mobileMenu = (
    <button onClick={toggleAppMenu}>
      <MenuIcon height="30" width="30" />
      <AppMenu menuItems={renderedMenuItems} />
    </button>
  );

  return (
    <div
      className={`${navPos} fixed z-40 flex h-16 w-full items-center justify-between bg-stone-900/60 px-4 text-stone-50 transition-all sm:px-12`}>
      <Link to={'/'}>
        <h1 className="cursor-pointer font-molle text-xl md:text-2xl lg:text-3xl">
          Cribbage Monster
        </h1>
      </Link>
      <ul className="flex items-center gap-4 md:gap-8">
        {minMediaSm ? renderedMenuItems : mobileMenu}
      </ul>
    </div>
  );
};

export default Nav;
