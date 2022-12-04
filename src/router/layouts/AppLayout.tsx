import Nav from 'src/components/Nav/Nav';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="relative grid grid-rows-[3rem_minmax(1fr)_3rem_3rem] h-screen max-h-screen bg-teal-100">
      <Nav />
      <Outlet />
    </div>
  );
};

export default AppLayout;
