import { createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import Nav from 'src/components/Nav/Nav';
import AppLayout from 'src/router/layouts/AppLayout';
import ErrorPage from 'src/router/routes/ErrorPage';
import GamePage from 'src/router/routes/GamePage';
import LoginPage from 'src/router/routes/LoginPage';
import ProtectedRoutes from './routes/ProtectedRoutes';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
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

export default router;
