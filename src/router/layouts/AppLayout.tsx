import Nav from 'src/components/Nav/Nav';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <div id="overlay-root" className="relative"></div>
      <div className="h-screen overflow-x-hidden bg-stone-800">
        <Nav />
        <main className="px-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppLayout;
