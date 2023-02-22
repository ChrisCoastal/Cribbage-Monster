import React, { FC, useRef, useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import useMediaQuery from 'src/hooks/useMediaQuery';
import { MEDIA_SIZE } from 'src/utils/constants';
import CloseIcon from 'src/components/UI/icons/CloseIcon/CloseIcon';
import anime from 'animejs';
import Overlay from 'src/components/UI/Overlay';

type MenuProps = {
  menuItems: JSX.Element[];
  scrollY: { pos: number; isDown: boolean };
  className?: string;
  children?: ReactNode;
};

const Menu: FC<MenuProps> = ({ menuItems, scrollY, className, children }) => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const minMediaSm = useMediaQuery(MEDIA_SIZE.sm);

  const wrapperRef = useRef<HTMLSpanElement>(null);
  const overlay = document.getElementById('overlay-root');

  const toggleMenuHandler = () => {
    menuIsVisible ? setMenuIsVisible(false) : setMenuIsVisible(true);
  };

  useEffect(() => {
    if (!menuIsVisible) return;
    for (let i = 0; i < menuItems.length; i++) {
      anime({
        targets: `.animate-item-${i}`,
        translateY: [
          { value: 60, duration: 0, delay: 0 },
          { value: 0, duration: 800, delay: 120 * i }
        ],
        opacity: [
          { value: 0, duration: 0, delay: 0 },
          { value: 1, duration: 800, delay: 120 * i }
        ],

        easing: 'spring(0.5, 100, 10, 0)'
      });
    }
  }, [menuIsVisible, menuItems.length]);

  useEffect(() => {
    setMenuIsVisible(false);
  }, [scrollY.pos]);

  const animatedMenuItems = menuItems.map((item, i) => {
    return (
      <div key={i} className={`animate-item-${i}`}>
        {item}
      </div>
    );
  });

  return (
    <span ref={wrapperRef} className="relative z-[1000]">
      <button className={`${className}`} onClick={() => setMenuIsVisible(!menuIsVisible)}>
        {children}
      </button>

      {overlay && menuIsVisible && !minMediaSm
        ? createPortal(
            <div
              className="menu absolute right-0 z-[1000] flex h-screen w-screen flex-col items-center overflow-hidden bg-stone-800 px-4 text-2xl font-medium text-stone-50"
              onClick={() => setMenuIsVisible(false)}
              style={{ top: scrollY.pos }}>
              <div className="flex h-16 items-center self-end pb-2">
                <button onClick={() => toggleMenuHandler}>
                  <CloseIcon height="30" width="30" className=" fill-stone-100" />
                </button>
              </div>
              <ul className="flex flex-col items-center gap-12">{animatedMenuItems}</ul>
            </div>,
            document.getElementById('overlay-root')!
          )
        : menuIsVisible && (
            <>
              <div className="relative" onClick={() => setMenuIsVisible(false)}>
                <div className="menu absolute right-2 top-0 z-[1000] h-4 w-4 rotate-45 bg-stone-50"></div>
                <div className="absolute right-0 z-[1000] mt-1 flex flex-col items-end rounded-lg border border-stone-50/60 bg-stone-900 p-8 text-stone-50 shadow-lg">
                  <ul className="flex flex-col gap-6 py-2 px-2">{animatedMenuItems}</ul>
                </div>
              </div>
              <Overlay style="transparent" onClick={() => setMenuIsVisible(false)} />
            </>
          )}
    </span>
  );
};

export default Menu;
