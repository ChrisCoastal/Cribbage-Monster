import React, { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import useMediaQuery from 'src/hooks/useMediaQuery';
import { MEDIA_SIZE } from 'src/utils/constants';
import CloseIcon from '../components/UI/icons/CloseIcon/CloseIcon';

type MenuProps = {
  menuItems: JSX.Element[];
};

const useMenu = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const minMediaSm = useMediaQuery(MEDIA_SIZE.sm);

  const toggleMenuHandler = () => {
    setMenuIsVisible(!menuIsVisible);
  };

  const Menu: FC<MenuProps> = ({ menuItems }) => {
    const overlay = document.getElementById('overlay-root');

    useEffect(() => {
      if (!overlay) return;
    }, [overlay]);

    return (
      <>
        {overlay && menuIsVisible && !minMediaSm
          ? createPortal(
              <div className="absolute right-0 z-50 flex h-screen w-screen flex-col items-center bg-stone-800 py-2 px-4 text-stone-50">
                <div className="mb-8 self-end">
                  <button onClick={toggleMenuHandler}>
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

  return { menuIsVisible, toggleMenuHandler, Menu };
};

export default useMenu;
