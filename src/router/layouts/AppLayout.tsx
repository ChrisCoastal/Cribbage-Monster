import Nav from 'src/components/Nav/Nav';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <div id="overlay-root"></div>
      <div className="relative h-screen overflow-x-hidden bg-stone-800">
        <Nav />
        <main className="">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppLayout;
