/* eslint-disable no-restricted-syntax */
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';
import LagPlot from './LagPlot';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<LagPlot />', () => {
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <LagPlot config={undefined} legend={undefined} />
        </ThemeProvider>
      );
    });
  }
});
