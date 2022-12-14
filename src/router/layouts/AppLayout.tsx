import Nav from 'src/components/Nav/Nav';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="relative grid h-screen max-h-screen grid-rows-[3rem_minmax(1fr)_3rem_3rem] bg-teal-100">
      <Nav />
      <main className="mt-16 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
