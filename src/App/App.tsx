import React, { StrictMode } from 'react';
import { CacheProvider } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { Box, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';

import { createEmotionCache } from '../utils/create-emotion-cache.ts';
import { theme } from '../theme/index.ts';
// Import all the css files created for d3 charts
import '../libs/css/spectrogram-plot-table.css';

// import Rfi from '../components/rfi/rfi';
import Spectrogram from '../components/spectrogram/spectrogram.tsx';
import SpectrumPlot from '../components/spectrumPlot/spectrumPlot.tsx';
import Statistics from '../components/statistics/statistics.tsx';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function App() {
  const DashboardLayoutRoot = styled('div')(() => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
  }));

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Helmet>
        <title>QA Display</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Helmet>
      <StrictMode>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <DashboardLayoutRoot>
              <Box
                sx={{
                  display: 'flex',
                  flex: '1 1 auto',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Statistics />
                <SpectrumPlot />
                <Spectrogram />
                {/*      Suppressed for now.
        <Rfi />
        */}
              </Box>
            </DashboardLayoutRoot>
          </ThemeProvider>
        </StyledEngineProvider>
      </StrictMode>
    </CacheProvider>
  );
}

export default App;
