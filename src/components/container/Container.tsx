import React from 'react';
// Import all the css files created for d3 charts
import './container.css';

// import Rfi from '../components/rfi/Rfi';
import Spectrogram from '../spectrogram/spectrogram';
import SpectrumPlot from '../spectrumPlot/spectrumPlot';
import Statistics from '../statistics/statistics';
import Legend from '../legend/Legend';
import Polarization from '../polarization/Polarization';
import LocalData from '../../mockData/webSocket/phase.json';
import { decodeJson } from '../../utils/decoder';
import { DATA_LOCAL, PROTOCOL, WS_API_URL } from '../../utils/constants';
import { MessageTopic } from '../../models/message-topic';

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

function Container() {
  const [resize, setRefresh] = React.useState(0);
  const [socketStatus1, setSocketStatus1] = React.useState('unknown');
  const [chartData1, setChartData1] = React.useState(null);

  const connectToWebSocket1 = React.useCallback(async () => {
    const tmp = `${WS_API_URL}/${PROTOCOL}_${MessageTopic.PHASE_AMP}`;
    console.error(tmp);
    const ws = new WebSocket(tmp);

    ws.onerror = function oneError(e) {
      console.error('WebSocket: onerror, error = ', e);
      setSocketStatus1('error');
    };

    ws.onmessage = function onMessage(msg) {
      const inData = msg?.data;
      try {
        const decoded = decodeJson(inData);
        if (decoded && decoded.status) {
          setSocketStatus1(decoded.status);
        } else {
          setChartData1(decoded);
        }
      } catch (e) {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error('WebSocket: received, decoding error = ', e);
        setSocketStatus1('error');
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  // We have a delay to reduce screen flicker
  function resizeIncrement()
  {
    setTimeout(() => { setRefresh(resize + 1); }, 1000);    
  }
  window.onresize = resizeIncrement;

  React.useEffect(() => {
    if (DATA_LOCAL) {
      setSocketStatus1('local');
      setChartData1(LocalData);
    } 
    else
    {
      connectToWebSocket1();
    } 
  }, []);

  return (
    <>
      <Statistics />
      {/* TODO : Change the following to access the correct data */}
      <SpectrumPlot resize={resize} socketStatus={socketStatus1} data={chartData1} />
      <Legend resize={resize} socketStatus={socketStatus1} data={chartData1} />
      <Polarization polarization='XX' resize={resize} socketStatus={socketStatus1} data={chartData1} />
      <Polarization polarization='XY' resize={resize} socketStatus={socketStatus1} data={chartData1} />
      <Polarization polarization='YX' resize={resize} socketStatus={socketStatus1} data={chartData1} />
      <Polarization polarization='YY' resize={resize} socketStatus={socketStatus1} data={chartData1} />
      <Spectrogram />
      {/* Suppressed for now <Rfi />   */}
    </>
  );
}

export default Container;
