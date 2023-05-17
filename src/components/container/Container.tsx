import React from 'react';
// Import all the css files created for d3 charts
import './container.css';

// import Rfi from '../components/rfi/Rfi';
import Spectrogram from '../spectrogram/spectrogram';
import SpectrumPlot from '../spectrumPlot/spectrumPlot';
import Statistics from '../statistics/statistics';
import AmpFreq from '../ampFreq/AmpFreq';
import PhaseFreq from '../phaseFreq/PhaseFreq';

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

function Container() {
  const [resize, setRefresh] = React.useState(0);

  // We have a delay to reduce screen flicker
  function resizeIncrement()
  {
    setTimeout(() => { setRefresh(resize + 1); }, 1000);    
  }
  window.onresize = resizeIncrement;

  return (
    <>
      <Statistics />
      <SpectrumPlot resize={resize} />
      <AmpFreq resize={resize} />
      <PhaseFreq resize={resize} />
      <Spectrogram />
      {/* Suppressed for now <Rfi />   */}
    </>
  );
}

export default Container;
