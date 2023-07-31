/* eslint-disable no-restricted-syntax */
import React from 'react';
// TODO : This should be moved into the Cypress config same as all other repositories
import { mount } from 'cypress/react18';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';
import SpectrogramImage from './SpectrogramImage';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<SpectrogramImage />', () => {
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <SpectrogramImage element={undefined} config={undefined} />
        </ThemeProvider>
      );
    });
  }
});
