import Nav from 'src/components/Nav/Nav';
import Modal from 'src/components/UI/Modal';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <div id="overlay-root"></div>
      <div className="relative h-screen bg-neutral-800">
        <Nav />
        <main className="px-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppLayout;
