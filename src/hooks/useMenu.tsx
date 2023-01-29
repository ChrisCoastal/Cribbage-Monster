import React, { FC, useRef, useEffect, useState, ReactNode, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import useMediaQuery from 'src/hooks/useMediaQuery';
import useClickOutside from 'src/hooks/useClickOutside';
import { MEDIA_SIZE } from 'src/utils/constants';
import CloseIcon from '../components/UI/icons/CloseIcon/CloseIcon';

type MenuProps = {
  menuItems: JSX.Element[];
  buttonClass: string;
};

type MenuButtonProps = {
  className?: string;
  children?: ReactNode;
};

const useMenu = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const minMediaSm = useMediaQuery(MEDIA_SIZE.sm);

  const overlay = document.getElementById('overlay-root');

  const toggleMenuHandler = <T extends MouseEvent>() => {
    // console.log(e);
    // const button = e.target.contains('user-menu');
    // if (button) return setMenuIsVisible(!menuIsVisible);
    // if (e.target !== overlay && menuIsVisible) setMenuIsVisible(!menuIsVisible);
    menuIsVisible ? setMenuIsVisible(false) : setMenuIsVisible(true);
  };

  const Menu: FC<MenuProps> = ({ menuItems, buttonClass }) => {
    console.log(menuIsVisible);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && menuIsVisible) {
        setMenuIsVisible(false);
      }
    }
    function handleClick(e: MouseEvent) {
      // if (!e.target) return;
      // const target = e.target as HTMLElement;
      // console.log(target.classList.contains(buttonClass));
    }

    useEffect(() => {
      if (!overlay) return;
    }, [overlay]);

    // useEffect(() => {
    //   if (!menuIsVisible) return;
    //   addEventListener('keydown', handleKeyDown);
    //   addEventListener('click', toggleMenuHandler);
    //   return () => {
    //     removeEventListener('keydown', handleKeyDown);
    //     removeEventListener('click', toggleMenuHandler);
    //   };
    // }, [menuIsVisible]);

    return (
      <>
        {overlay && menuIsVisible && !minMediaSm
          ? createPortal(
              <div className="absolute right-0 z-50 flex h-screen w-screen flex-col items-center bg-stone-800 py-2 px-4 text-stone-50">
                <div className="mb-8 self-end">
                  <button onClick={() => toggleMenuHandler}>
                    <CloseIcon height="30" width="30" className=" fill-stone-100" />
                  </button>
                </div>
                <ul className="flex flex-col items-center gap-8">{menuItems}</ul>
              </div>,
              document.getElementById('overlay-root')!
            )
          : menuIsVisible && (
              <div className="relative">
                <div className="absolute right-0 z-50 flex w-screen flex-col items-end bg-stone-800 p-4 text-stone-50">
                  <ul>{menuItems}</ul>
                </div>
              </div>
            )}
      </>
    );
  };

  const MenuButton: FC<MenuButtonProps> = ({ className, children }) => {
    const ListenClickOutside = useClickOutside();

    return (
      <ListenClickOutside callback={() => setMenuIsVisible(false)}>
        <button className={`${className}`} onClick={() => setMenuIsVisible(!menuIsVisible)}>
          {children}
        </button>
      </ListenClickOutside>
    );
  };

  return { menuIsVisible, toggleMenuHandler, Menu, MenuButton };
};

export default useMenu;
