import Nav from 'src/components/Nav/Nav';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="relative h-screen bg-teal-100">
      <Nav />
      <main className="px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
