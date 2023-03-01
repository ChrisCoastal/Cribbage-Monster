import { Dispatch } from 'react';

export type UserSettingsState = {
  uid: string;
  displayName: string;
  // email: string;
  avatar: string;
  online: boolean;
  lastVisibleAt: string;
};

export type SettingsContextType = {
  userSettingsState: UserSettingsState;
  dispatchSettings: Dispatch<SettingsReducerActions>;
};

export enum SettingsReducerTypes {
  UPDATE_SETTINGS = 'update'
}

export type UpdateAvatarAction = {
  type: SettingsReducerTypes.UPDATE_SETTINGS;
  payload: UserSettingsState;
};

export type SettingsReducerActions = UpdateAvatarAction;
