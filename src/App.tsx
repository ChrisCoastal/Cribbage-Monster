import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from 'src/router/layouts/AppLayout';
import ErrorPage from 'src/router/routes/ErrorPage';
import GamePage from 'src/router/routes/GamePage';
import SignUpPage from 'src/router/routes/SignUpPage';
import LoginPage from 'src/router/routes/LoginPage';
import ProtectedRoutes from 'src/router/routes/ProtectedRoutes';
import HomePage from 'src/router/routes/HomePage';
import DashboardPage, { dashboardLoader } from 'src/router/routes/DashboardPage';

import { gameLoader } from 'src/router/routes/GamePage';
import { getConnectionRef, getPresenceRef, getUserStatusRef } from './utils/helpers';
import { onDisconnect, onValue, push, set } from 'firebase/database';
import { useEffect } from 'react';
import useAuthContext from './hooks/useAuthContext';

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
            path: '/dashboard/:uid',
            // path: '/dashboard',
            loader: dashboardLoader,
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
  const { userAuth } = useAuthContext();
  const uid = userAuth?.uid;

  // presence if app is open
  useEffect(() => {
    console.log('rendering useEffect');
    if (!uid) return;
    const presenceRef = getPresenceRef();
    const statusRef = getUserStatusRef(uid);
    set(presenceRef, true);
    // const disconnect = onDisconnect(statusRef);
    // disconnect.set('disconnected');
    // Write a string when this client loses connection
    // set(statusRef, true).then(() => console.log('Online presence set'));

    // Remove the node whenever the client disconnects
    // onDisconnect(statusRef)
    //   .remove()
    //   .then(() => console.log('On disconnect function configured.'));
    onDisconnect(presenceRef)
      .set(false)
      .then(() => console.log('disconnected'));

    // const connectionRef = getConnectionRef();
    // const unsubConnection = onValue(connectionRef, (snapshot) => {
    //   if (snapshot.val() === true) {
    //     console.log('connected');
    //     onDisconnect(presenceRef)
    //       .set('I disconnected!')
    //       .then(() => console.log('disconnected'));
    //     const status = push(statusRef);
    //     // onDisconnect(presenceRef).set('I disconnected!');
    //   } else {
    //     console.log('not connected');
    //   }
    // });
    // return unsubConnection;
  }, [uid]);

  return <RouterProvider router={router} />;
}

export default App;
