import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  UserCredential
} from 'firebase/auth';
import { firebaseAuth } from 'src/firestore.config';
import { Timestamp } from 'firebase/firestore';
import { update, set, serverTimestamp } from 'firebase/database';
import { User } from 'firebase/auth';

import { AuthContextType, UserSettingsState } from 'src/@types';

import { AVATARS } from 'src/utils/constants';
import { getUserSettingsRef } from 'src/utils/helpers';

const useFirebaseAuth = (): AuthContextType => {
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const updateDisplayName = async (newDisplayName: string) => {
    await updateProfile(firebaseAuth.currentUser!, {
      displayName: newDisplayName
    }).catch((error) => console.log('update displayName error', error));
  };

  const loginUser = (
    email: string | null,
    password: string | null,
    callback: (displayName: string) => void
  ) => {
    if (typeof email !== 'string' || typeof password !== 'string')
      return console.log('Error email or password is invalid!');
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userData: UserCredential) => {
        console.log('User has logged in', userData);

        setUserAuth(() => userData.user);

        callback(userData.user.uid!);
        console.log('user', userAuth);

        return userAuth;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const createUser = async (
    displayName: string,
    email: string,
    password: string,
    callback: (displayName: string) => void
  ) => {
    // TODO: validation
    if (
      typeof displayName !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    )
      return console.log('Error name, email, or password is invalid!');

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userData: UserCredential) => {
        // automatically logged in after signup
        await updateDisplayName(displayName);
        await setUserDoc(userData).then(() => {
          setUserAuth(() => userData.user);
          localStorage.setItem('authToken', userData.user.refreshToken);
          callback(userData.user.uid!);
        });
      })
      .catch((err) => {
        // TODO: add error message under password field UI
        console.log(err.message);
      });
  };

  async function setUserDoc(userData: UserCredential) {
    console.log('setting', userData.user.uid);
    const userSettingsRef = getUserSettingsRef(userData.user.uid);
    set(userSettingsRef, {
      uid: userData.user.uid,
      displayName: userData.user.displayName,
      avatar: AVATARS.at(-1),
      online: true,
      lastVisibleAt: serverTimestamp()
    }).then((data) => console.log(data, 'updated user doc'));
  }

  function updateUserDoc(userData: UserSettingsState) {
    update(getUserSettingsRef(userData.uid), {
      uid: userData.uid,
      displayName: userData.displayName,
      avatar: userData.avatar,
      online: true,
      lastVisibleAt: Timestamp
    }).then((data) => console.log(data, 'updated user doc'));
  }

  const logoutUser = (callback: VoidFunction) =>
    // const signoutUser = () =>
    signOut(firebaseAuth)
      .then(async () => {
        setUserAuth(() => null);
        callback();
        return Promise.resolve(userAuth);
      })
      .catch((err) => {
        console.log(err.message);
      });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (userData) => {
      if (userData) {
        setUserAuth(userData);
      } else {
        setUserAuth(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    userAuth,
    updateDisplayName,
    createUser,
    loginUser,
    logoutUser
  };
};

export default useFirebaseAuth;
