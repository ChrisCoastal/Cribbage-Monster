import Nav from 'src/components/Nav/Nav';
import BottomNav from 'src/components/BottomNav/BottomNav';
import { Link, Outlet } from 'react-router-dom';

import { RouterProvider } from 'react-router-dom';
// import router from 'src/router/router';

import { createBrowserRouter } from 'react-router-dom';
import AppLayout from 'src/router/layouts/AppLayout';
import ErrorPage from 'src/router/routes/ErrorPage';
import GamePage from 'src/router/routes/GamePage';
import LoginPage from 'src/router/routes/LoginPage';
import ProtectedRoutes from 'src/router/routes/ProtectedRoutes';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/game/:gameId',
        element: <GamePage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
