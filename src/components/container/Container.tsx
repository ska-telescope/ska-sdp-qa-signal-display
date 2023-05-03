import React from 'react';
import { Box } from '@mui/material';
// Import all the css files created for d3 charts
import '../../libs/css/spectrogram-plot-table.css';

// import Rfi from '../components/rfi/rfi';
import Spectrogram from '../spectrogram/spectrogram';
import SpectrumPlot from '../spectrumPlot/spectrumPlot';
import Statistics from '../statistics/statistics';

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

function Container() {

  return (
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
        {/* Suppressed for now <Rfi />   */}
      </Box>
    </div>
  );
}

export default Container;
