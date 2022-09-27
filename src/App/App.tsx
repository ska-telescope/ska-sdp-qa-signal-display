import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';

import theme from '../theme/index';
// Import all the css files created for d3 charts
import '../libs/css/spectrogram-plot-table.css';

// import Rfi from '../components/rfi/rfi';
import Spectrogram from '../components/spectrogram/spectrogram';
import SpectrumPlot from '../components/spectrumPlot/spectrumPlot';
import Statistics from '../components/statistics/statistics';

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

function App() {
  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback="...is loading">
        <div className="App">
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            <Statistics />
            <SpectrumPlot />
            <Spectrogram />
            {/*      Suppressed for now.
        <Rfi />
        */}
          </Box>
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
