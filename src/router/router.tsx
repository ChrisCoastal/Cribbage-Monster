import { createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import ErrorPage from 'src/router/routes/ErrorPage';
import GamePage from 'src/router/routes/GamePage';
import LoginPage from 'src/router/routes/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  },
  {
    path: '/game/:gameId',
    element: <GamePage />
  }
]);

export default router;
