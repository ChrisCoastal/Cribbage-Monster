import { SettingsReducerActions, SettingsReducerTypes, UserSettingsState } from 'src/@types';

const gameReducer = (
  state: UserSettingsState,
  action: SettingsReducerActions
): UserSettingsState => {
  const { type, payload } = action;

  switch (type) {
    case SettingsReducerTypes.UPDATE_SETTINGS: {
      const updatedState = { ...state, ...payload };

      return updatedState;
    }

    default:
      return state;
  }
};

export default gameReducer;
