import Nav from 'src/components/Nav/Nav';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <div id="overlay-root"></div>
      <div className="relative h-screen overflow-hidden bg-neutral-800">
        <Nav />
        <main className="px-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppLayout;
