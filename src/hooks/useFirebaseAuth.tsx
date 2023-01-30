import { AuthContextType, UserSettingsState } from 'src/@types';

import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  UserCredential
} from 'firebase/auth';
import { rtdb, firebaseAuth } from 'src/firestore.config';
import { Timestamp } from 'firebase/firestore';
import { update, ref, set, serverTimestamp } from 'firebase/database';
import { User } from 'firebase/auth';
import { AVATARS } from 'src/utils/constants';
import { getUserSettingsRef } from 'src/utils/helpers';

const useFirebaseAuth = (): AuthContextType => {
  // const auth = getAuth();
  const [userAuth, setUserAuth] = useState<User | null>(null);
  // const [loadingAuth, setloadingAuth] = useState<boolean>(false);

  const updateDisplayName = async (newDisplayName: string) => {
    await updateProfile(firebaseAuth.currentUser!, {
      displayName: newDisplayName
    })
      // .then(() => {
      //   return userAuth;
      // })
      .catch((error) => console.log('update displayName error', error));
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
        // await updateUserDoc({...userData, avatar: AVATARS.at(-1)!});

        await setUserDoc(userData).then(() => {
          setUserAuth(() => userData.user);
          localStorage.setItem('authToken', userData.user.refreshToken);
          callback(userData.user.uid!);
        });
        // const usersRef = collection(db, 'users');
        // return userAuth;
      })
      .catch((err) => {
        // TODO: add error message under password field UI
        console.log(err.message);
        if (err.message === 'Firebase: Error (auth/email-already-in-use).')
          console.log('In use signin');
      });
  };

  async function setUserDoc(userData: UserCredential) {
    console.log('setting', userData.user.uid);
    const userSettingsRef = getUserSettingsRef(userData.user.uid);
    set(userSettingsRef, {
      uid: userData.user.uid,
      displayName: userData.user.displayName,
      email: userData.user.email,
      avatar: AVATARS.at(-1),
      online: true,
      lastVisibleAt: serverTimestamp()
    }).then((data) => console.log(data, 'updated user doc'));
  }

  function updateUserDoc(userData: UserSettingsState) {
    update(getUserSettingsRef(userData.uid), {
      uid: userData.uid,
      displayName: userData.displayName,
      email: userData.email,
      avatar: userData.avatar,
      online: true,
      lastVisibleAt: Timestamp
    }).then((data) => console.log(data, 'updated user doc'));
  }

  const logoutUser = (callback: VoidFunction) =>
    // const signoutUser = () =>
    signOut(firebaseAuth)
      .then(async () => {
        console.log(userAuth, 'User signed out');
        setUserAuth(() => null);

        callback();
        return Promise.resolve(userAuth);
      })
      .catch((err) => {
        console.log(err.message);
      });

  // const resetPasswordByEmail = (email: string | null) => {
  //   if (typeof email !== 'string')
  //     return console.log('Error name, email, or password is invalid!');
  //   sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       return true;
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (userData) => {
      if (userData) {
        setUserAuth(userData);
      } else {
        console.log('Userstate set to null');
        setUserAuth(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    userAuth,
    // setUserAuth,
    updateDisplayName,
    createUser,
    loginUser,
    logoutUser
    // sendPasswordResetEmail,
    // confirmPasswordReset
  };
};

export default useFirebaseAuth;
