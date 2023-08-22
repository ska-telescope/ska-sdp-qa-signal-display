/* eslint-disable no-restricted-syntax */
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import theme from '../../services/theme/theme';
import Plotly from './Plotly';

const THEME = [THEME_DARK, THEME_LIGHT];

const trace1 = {
  x: [0, 1, 2, 3, 4],
  y: [1, 5, 3, 7, 5]
};

const trace2 = {
  x: [1, 2, 3, 4, 5],
  y: [4, 0, 4, 6, 8]
};

const data = [trace1, trace2];

describe('<Plotly />', () => {
  for (const theTheme of THEME) {
    it(`Theme ${theTheme}: Renders`, () => {
      cy.mount(
        <ThemeProvider theme={theme(theTheme)}>
          <CssBaseline />
          <Plotly
            darkMode={theTheme === THEME_DARK}
            data={data}
            height={300}
            title="PLOTLY TITLE"
            width={600}
            xLabel="X LABEL"
            yLabel="Y LABEL"
          />
        </ThemeProvider>
      );
    });
  }
});
