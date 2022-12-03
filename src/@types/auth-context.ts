import { Dispatch } from 'react';
import { AppState } from './index';

// export type AppContextType = {
//   appState: AppState;
//   dispatchApp: Dispatch<AppReducerActions>;
// };

// // TODO:
// export enum AppReducerTypes {
//   ADD_USER = 'add user'
// }

// export type AppAction = {
//   type: AppReducerTypes.ADD_USER;
//   payload: { id: string };
// };

// export type AppReducerActions = AppAction;

export interface UserState {
  displayName: string | null;
  email: string | null;
  uid: string | null;
}

export type AuthContextType = {
  userAuth: UserState | null;
  // setUserAuth: Dispatch<React.SetStateAction<UserState | null>>;
  updateDisplayName: (newDisplayName: string) => void;
  createUser: (
    displayName: string,
    email: string,
    password: string,
    callback: VoidFunction
  ) => void;
  signinUser: (email: string | null, password: string | null, callback: VoidFunction) => void;
  signoutUser: (callback: VoidFunction) => void;
  // sendPasswordResetEmail: () => void;
  // confirmPasswordReset: () => void;
};

export type FirebaseAuthResponse = {
  // signin
  operationType: string;
  providerId: null;
  user: FirebaseAuthUser;
  // TODO:
  _tokenResponse: { [key: string]: any };
};

export type FirebaseAuthUser = {
  accessToken: string;
  auth: { [key: string]: any };
  displayName: string | null;
  email: string;
  emailVerified: false;
  isAnonymous: false;
  metadata: {
    createdAt: string;
    lastLoginAt: string;
    lastSignInTime: string;
    creationTime: string;
  };
  phoneNumber: null;
  photoURL: string | null;
  proactiveRefresh: { [key: string]: any };
  providerData: [];
  providerId: 'firebase';
  reloadListener: null;
  reloadUserInfo: {
    localId: string;
    email: string;
    passwordHash: string;
    emailVerified: boolean;
    passwordUpdatedAt: number;
    providerUserInfo: [];
    validSince: string;
  };
  stsTokenManager: { [key: string]: any };
  tenantId: null;
  uid: string;
};
