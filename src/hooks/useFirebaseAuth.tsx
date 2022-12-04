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
import { firebaseAuth } from 'src/firestore.config';

const useFirebaseAuth = (): AuthContextType => {
  // const auth = getAuth();
  const [userAuth, setUserAuth] = useState<UserState | null>(null);
  // const [loadingAuth, setloadingAuth] = useState<boolean>(false);

  const updateDisplayName = async (newDisplayName: string) => {
    await updateProfile(firebaseAuth.currentUser!, {
      displayName: newDisplayName
    })
      .then(() => {
        console.log('DisplayName updated');
        return userAuth;
      })
      .catch((error) => console.log('update displayName error', error));
  };

  const loginUser = (email: string | null, password: string | null, callback: VoidFunction) => {
    if (typeof email !== 'string' || typeof password !== 'string')
      return console.log('Error email or password is invalid!');
    signInWithEmailAndPassword(firebaseAuth, email, password)
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

  const createUser = async (
    displayName: string,
    email: string,
    password: string,
    callback: VoidFunction
  ) => {
    // TODO: validation
    if (
      typeof displayName !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    )
      return console.log('Error name, email, or password is invalid!');

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userDataObj: UserCredential) => {
        // automatically logged in after signup
        console.log('User has been created/logged in', userDataObj.user);
        await updateDisplayName(displayName);

        setUserAuth(() => userDataObj.user);

        localStorage.setItem('authToken', userDataObj.user.refreshToken);
        callback();
        // return userAuth;
      })
      .catch((err) => {
        // TODO: add error message under password field UI
        console.log(err.message);
        if (err.message === 'Firebase: Error (auth/email-already-in-use).')
          console.log('In use signin');
      });
  };

  const logoutUser = (callback: VoidFunction) =>
    // const signoutUser = () =>
    signOut(firebaseAuth)
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
    const unsubscribe = onAuthStateChanged(firebaseAuth, (userDataObj) => {
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
    loginUser,
    logoutUser
    // sendPasswordResetEmail,
    // confirmPasswordReset
  };
};

export default useFirebaseAuth;
