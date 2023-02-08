import Nav from 'src/components/Nav/Nav';
import ScrollRestoration from 'src/router/scroll/ScrollRestoration';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AppLayout = () => {
  // const [scrollY, setScrollY] = useState({ pos: 0, isDown: false });

  // function isScroll() {
  //   if (window.scrollY > scrollY.pos) setScrollY({ pos: window.scrollY, isDown: true });
  //   if (window.scrollY < scrollY.pos || window.scrollY === 0)
  //     setScrollY({ pos: window.scrollY, isDown: false });
  // }

  // const navPos = scrollY.isDown ? '-top-16' : 'top-0 ';

  // useEffect(() => {
  //   console.log('scrolling');

  //   window.addEventListener('scroll', isScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', isScroll);
  // }, []);

  return (
    <>
      <div className="relative overflow-x-hidden bg-stone-800" id="container">
        <div id="overlay-root"></div>
        <Nav />
        <main className="main">
          <Outlet />
        </main>
        <ScrollRestoration />
      </div>
    </>
  );
};

export default AppLayout;
