import React from 'react';
import { Outlet } from 'react-router-dom';

import Nav from 'src/components/Nav/Nav';
import ScrollRestoration from 'src/router/scroll/ScrollRestoration';

const AppLayout = () => {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-stone-800">
        <div id="container">
          <div id="overlay-root"></div>
          <Nav />
          <main className="main">
            <Outlet />
          </main>
          <ScrollRestoration />
        </div>
        <div id="footer" className="relative"></div>
      </div>
    </>
  );
};

export default AppLayout;
