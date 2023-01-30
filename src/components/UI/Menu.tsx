import React, { FC, useRef, useEffect, useState, ReactNode, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import useMediaQuery from 'src/hooks/useMediaQuery';
import useClickOutside from 'src/hooks/useClickOutside';
import { MEDIA_SIZE } from 'src/utils/constants';
import CloseIcon from 'src/components/UI/icons/CloseIcon/CloseIcon';
import anime from 'animejs';

type MenuProps = {
  menuItems: JSX.Element[];
  className?: string;
  children?: ReactNode;
};

const Menu: FC<MenuProps> = ({ menuItems, className, children }) => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const minMediaSm = useMediaQuery(MEDIA_SIZE.sm);
  const ListenClickOutside = useClickOutside();

  const overlay = document.getElementById('overlay-root');

  const toggleMenuHandler = () => {
    menuIsVisible ? setMenuIsVisible(false) : setMenuIsVisible(true);
  };

  useEffect(() => {
    if (!overlay) return;
  }, [overlay]);

  useEffect(() => {
    for (let i = 0; i < menuItems.length; i++) {
      anime({
        targets: `.animate-item-${i}`,
        translateY: [
          { value: 60, duration: 0, delay: 0 },
          { value: 0, duration: 800, delay: 150 * i }
        ],
        opacity: [
          { value: 0, duration: 0, delay: 0 },
          { value: 1, duration: 800, delay: 150 * i }
        ],

        easing: 'easeOutExpo'
      });
    }
  }, [menuIsVisible]);

  const animatedMenuItems = menuItems.map((item, i) => {
    return (
      <div key={i} className={`animate-item-${i}`}>
        {item}
      </div>
    );
  });

  return (
    <>
      <ListenClickOutside callback={() => setMenuIsVisible(false)}>
        <button className={`${className}`} onClick={() => setMenuIsVisible(!menuIsVisible)}>
          {children}
        </button>
      </ListenClickOutside>

      {overlay && menuIsVisible && !minMediaSm
        ? createPortal(
            <div className="animate-menu absolute right-0 flex h-screen w-screen flex-col items-center overflow-hidden bg-stone-800 p-8 text-stone-50">
              <div className="flex h-16 items-center self-end">
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
              <div className="animate-menu absolute right-2 top-0 h-4 w-4 rotate-45 bg-stone-900 shadow-md"></div>
              <div className="animate-menu absolute right-0 mt-1 flex flex-col items-end overflow-hidden rounded-lg bg-stone-900 p-8 text-stone-50 shadow-md">
                <ul className="flex flex-col gap-6 py-2 px-2">{animatedMenuItems}</ul>
              </div>
            </div>
          )}
    </>
  );
};

export default Menu;
