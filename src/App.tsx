import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from 'src/router/layouts/AppLayout';
import ErrorPage from 'src/router/routes/ErrorPage';
import GamePage from 'src/router/routes/GamePage';
import RulesPage from 'src/router/routes/RulesPage';
import SignUpPage from 'src/router/routes/SignUpPage';
import LoginPage from 'src/router/routes/LoginPage';
import ProtectedRoutes from 'src/router/routes/ProtectedRoutes';
import HomePage from 'src/router/routes/HomePage';
import DashboardPage, { dashboardLoader } from 'src/router/routes/DashboardPage';

import { gameLoader } from 'src/router/routes/GamePage';
import { getIsOnlineRef, getUserSettingsRef } from './utils/helpers';
import { onDisconnect, onValue, set } from 'firebase/database';
import { useEffect } from 'react';
import useAuthContext from './hooks/useAuthContext';
import useSettingsContext from './hooks/useSettingsContext';
import { SettingsReducerTypes } from './@types';

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
        path: '/rules',
        element: <RulesPage />
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: '/dashboard/:uid',
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
  const { dispatchSettings } = useSettingsContext();
  const uid = userAuth?.uid;

  // presence if app is open
  useEffect(() => {
    if (!uid) return;
    const isOnlineRef = getIsOnlineRef(uid);
    set(isOnlineRef, true);

    onDisconnect(isOnlineRef).set(false);
  }, [uid]);

  useEffect(() => {
    if (!uid) return;
    const userSettingsRef = getUserSettingsRef(userAuth!.uid!);
    const unsubscribe = onValue(
      userSettingsRef,
      (snapshot) => {
        dispatchSettings({ type: SettingsReducerTypes.UPDATE_SETTINGS, payload: snapshot.val() });
      },
      (error) => console.log(error)
    );
    return unsubscribe;
  }, [uid, dispatchSettings, userAuth]);

  return <RouterProvider router={router} />;
}

export default App;
