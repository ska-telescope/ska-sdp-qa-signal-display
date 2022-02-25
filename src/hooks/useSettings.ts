import React from 'react';
import SettingsContext from '../contexts/SettingsContext';
import type { SettingsContextValue } from '../contexts/SettingsContext';

const useSettings = (): SettingsContextValue => React.useContext(SettingsContext);

export default useSettings;
