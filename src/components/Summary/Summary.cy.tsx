import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import Summary from './Summary';
import theme from '../../services/theme/theme';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<Summary />', () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}`, () => {
      const config = '';
      const status = ['unknown', 'error', 'connected', 'local'];

      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <Summary
            config={config}
            status1={status[0]}
            status2={status[1]}
            status3={status[2]}
            status4={status[3]}
            clickFunction={null}
          />
        </ThemeProvider>
      );
      cy.get('[data-testid="SettingsIcon"]').should('be.visible');
    });
  }
});
