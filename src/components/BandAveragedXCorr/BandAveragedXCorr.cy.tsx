/* eslint-disable no-restricted-syntax */
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';
import BandAveragedXCorr from './BandAveragedXCorr';

const THEME = [THEME_DARK, THEME_LIGHT];

describe('<GainCalibration />', () => {
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <BandAveragedXCorr
            polarization=""
            resize={0}
            socketStatus=""
            data={undefined}
            displaySettings={undefined}
            setSettings={undefined}
            legend={undefined}
            redraw
          />
        </ThemeProvider>
      );
    });
  }
});
