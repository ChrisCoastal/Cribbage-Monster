import { createContext, FC, ReactNode, useReducer } from 'react';
import { SettingsContextType } from 'src/@types';
import { INITIAL_SETTINGS_STATE } from 'src/utils/constants';
import settingsReducer from './settingsReducer';

type SettingsProviderProps = {
  children?: ReactNode;
};

const SettingsContext = createContext({} as SettingsContextType);

const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [userSettingsState, dispatchSettings] = useReducer(settingsReducer, INITIAL_SETTINGS_STATE);

  return (
    <SettingsContext.Provider value={{ userSettingsState, dispatchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
