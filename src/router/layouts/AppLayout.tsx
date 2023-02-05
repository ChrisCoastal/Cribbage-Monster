import Nav from 'src/components/Nav/Nav';
import ScrollRestoration from 'src/router/scroll/ScrollRestoration';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <div id="overlay-root"></div>
      <div className="relative h-screen overflow-x-hidden bg-stone-800" id="container">
        <Nav />
        <main className="main">
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default AppLayout;
