/* eslint-disable no-restricted-syntax */
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';
import SignalCard from './SignalCard';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<SignalCard />', () => {
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <SignalCard title="" showContent={false} setShowContent={undefined} />
        </ThemeProvider>
      );
    });
  }
});
