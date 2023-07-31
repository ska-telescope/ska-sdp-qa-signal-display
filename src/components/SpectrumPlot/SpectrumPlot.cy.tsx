/* eslint-disable no-restricted-syntax */
import React from 'react';
// TODO : This should be moved into the Cypress config same as all other repositories
import { mount } from 'cypress/react18';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';
import SpectrumPlot from './SpectrumPlot';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<SpectrumPlot />', () => {
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <SpectrumPlot
            polarization=""
            resize={0}
            socketStatus=""
            config={undefined}
            data={undefined}
          />
        </ThemeProvider>
      );
    });
  }
});
