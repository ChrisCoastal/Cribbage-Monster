import { AuthContextType, UserState } from 'src/@types';

import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
  UserCredential
} from 'firebase/auth';
import { auth } from 'src/firestore.config';

const useAuthProvider = (): AuthContextType => {
  // const auth = getAuth();
  const [userAuth, setUserAuth] = useState<UserState | null>(null);
  // const [loadingAuth, setloadingAuth] = useState<boolean>(false);

  const updateDisplayName = async (newDisplayName: string) => {
    await updateProfile(auth.currentUser!, {
      displayName: newDisplayName
    })
      .then(() => {
        console.log('DisplayName updated');
        return userAuth;
      })
      .catch((error) => console.log('update displayName error', error));
  };

  const signinUser = (email: string | null, password: string | null, callback: VoidFunction) => {
    if (typeof email !== 'string' || typeof password !== 'string')
      return console.log('Error email or password is invalid!');
    signInWithEmailAndPassword(auth, email, password)
      .then((userDataObj: UserCredential) => {
        console.log('User has logged in', userDataObj);

        setUserAuth(() => userDataObj.user);

        callback();
        console.log('user', userAuth);

        return userAuth;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const createUser = (
    displayName: string,
    email: string,
    password: string,
    callback: VoidFunction
  ) => {
    if (
      typeof displayName !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    )
      return console.log('Error name, email, or password is invalid!');

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userDataObj: UserCredential) => {
        // automatically logged in after signup
        console.log('User has been created/logged in', userDataObj.user);
        await updateDisplayName(displayName);

        setUserAuth(() => userDataObj.user);

        console.log('user', userAuth);
        localStorage.setItem('authToken', userDataObj.user.refreshToken);
        callback();
        return userAuth;
      })
      .catch((err) => {
        // TODO: add error message under password field UI
        console.log(err.message);
      });
  };

  const signoutUser = (callback: VoidFunction) =>
    // const signoutUser = () =>
    signOut(auth)
      .then(async () => {
        console.log(userAuth, 'User signed out');
        setUserAuth(() => null);

        console.log(userAuth, 'User signed out');
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
    const unsubscribe = onAuthStateChanged(auth, (userDataObj) => {
      if (userDataObj) {
        console.log('Userstate is logged in via useEffect');
        setUserAuth(userDataObj);
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
    signinUser,
    signoutUser
    // sendPasswordResetEmail,
    // confirmPasswordReset
  };
};

export default useAuthProvider;
