import React, { StrictMode } from 'react';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';

import { createEmotionCache } from 'utils/create-emotion-cache';
import { theme } from './../../theme';
// Import all the css files created for d3 charts
import 'libs/css/spectrogram-plot-table.css';

import Rfi from "components/rfi/rfi";
import Spectrogram from "components/spectrogram/spectrogram";
import SpectrumPlot from "components/spectrumPlot/spectrumPlot";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function App() {

  const DashboardLayoutRoot = styled('div')(() => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%'
  }));
  
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <StrictMode>
        <StyledEngineProvider injectFirst>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
                  <DashboardLayoutRoot>
                  <Box
                    sx={{
                      display: 'flex',
                      flex: '1 1 auto',
                      flexDirection: 'column',
                      width: '100%'
                    }}
                  >
                      <SpectrumPlot />
                      <Spectrogram />
                      <Rfi />
                  </Box>
                </DashboardLayoutRoot>
            </ThemeProvider>
          </LocalizationProvider>
        </StyledEngineProvider>
      </StrictMode>
    </CacheProvider>
  );
}

export default App;
