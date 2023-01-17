import { useContext } from 'react';
import { SettingsContext } from 'src/context/SettingsProvider/SettingsProvider';

const useSettingsContext = () => useContext(SettingsContext);

export default useSettingsContext;
