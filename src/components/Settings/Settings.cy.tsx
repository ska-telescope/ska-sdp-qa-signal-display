import React from 'react';
import { mount } from 'cypress/react18';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import Settings from './Settings';
import theme from '../../services/theme/theme';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<Settings />', () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}`, () => {
      mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <Settings open={false} handleSettingsToggle={undefined} />
        </ThemeProvider>
      );
    });
  }
});
