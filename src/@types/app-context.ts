import { Dispatch } from 'react';
import { AppState } from './index';

export type AppContextType = {
  appState: AppState;
  dispatchApp: Dispatch<AppReducerActions>;
};

// TODO:
export enum AppReducerTypes {
  ADD_USER = 'add user'
}

export type AppAction = {
  type: AppReducerTypes.ADD_USER;
  payload: { id: string };
};

export type AppReducerActions = AppAction;
