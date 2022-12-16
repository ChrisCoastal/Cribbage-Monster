import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from 'src/router/layouts/AppLayout';
import ErrorPage from 'src/router/routes/ErrorPage';
import GamePage from 'src/router/routes/GamePage';
import SignUpPage from 'src/router/routes/SignUpPage';
import LoginPage from 'src/router/routes/LoginPage';
import ProtectedRoutes from 'src/router/routes/ProtectedRoutes';
import HomePage from 'src/router/routes/HomePage';
import DashboardPage from './router/routes/DashboardPage';

import { gameLoader } from 'src/router/routes/GamePage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/signup',
        element: <SignUpPage />
      },

      {
        path: '/login',
        element: <LoginPage />
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            // path: '/dashboard/:userId',
            path: '/dashboard',
            element: <DashboardPage />
          },
          {
            path: '/game/:gameId',
            loader: gameLoader,
            element: <GamePage />
          }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
