/* eslint-disable no-restricted-syntax */
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';
import Polarization from './Polarization';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<Polarization />', () => {
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <Polarization
            polarization=""
            resize={0}
            socketStatus=""
            config={undefined}
            data={undefined}
            legend={undefined}
          />
        </ThemeProvider>
      );
    });
  }
});
