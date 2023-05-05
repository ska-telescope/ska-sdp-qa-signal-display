import React from 'react';
// Import all the css files created for d3 charts
import '../../libs/css/spectrogramPlotTable.css';

// import Rfi from '../components/rfi/Rfi';
import Spectrogram from '../spectrogram/spectrogram';
import SpectrumPlot from '../spectrumPlot/spectrumPlot';
import Statistics from '../statistics/statistics';
import AmpFreq from '../ampFreq/AmpFreq';

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

function Container() {

  return (
    <>
      <Statistics />
      <SpectrumPlot />
      <AmpFreq />
      <Spectrogram />
      {/* Suppressed for now <Rfi />   */}
    </>
  );
}

export default Container;
