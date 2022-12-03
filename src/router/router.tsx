import { createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import ErrorPage from 'src/router/routes/ErrorPage';
import GamePage from './routes/GamePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/game/:gameId',
    element: <GamePage />
  }
]);

export default router;
