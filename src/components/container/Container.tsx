/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// Import all the css files created for d3 charts
import './container.css';

// import Rfi from '../components/rfi/Rfi';
import Spectrogram from '../spectrogram/spectrogram';
import SpectrumPlot from '../spectrumPlot/spectrumPlot';
import Statistics from '../statistics/statistics';
import Legend from '../legend/Legend';
import Polarization from '../polarization/Polarization';
import PlotData from '../../mockData/webSocket/spectrum.json';
import PhaseData from '../../mockData/webSocket/phase.json';
import { decodeJson } from '../../utils/decoder';
import { DATA_LOCAL, PROTOCOL, SOCKET_STATUS, WS_API_URL } from '../../utils/constants';
import { MessageTopic } from '../../models/message-topic';

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

function Container() {
  const [resize, setRefresh] = React.useState(0);
  const [socketStatus1, setSocketStatus1] = React.useState(SOCKET_STATUS[0]);
  const [socketStatus2, setSocketStatus2] = React.useState(SOCKET_STATUS[0]);
  const [chartData1, setChartData1] = React.useState(null);
  const [chartData2, setChartData2] = React.useState(null);
  const [legendData, setLegendData] = React.useState(null);

  const connectToWebSocket1 = React.useCallback(async () => {
    const tmp = `${WS_API_URL}/${PROTOCOL}_${MessageTopic.PHASE_AMP}`;
    const ws = new WebSocket(tmp);

    ws.onerror = function oneError(e) {
      console.error('WebSocket: onerror, error = ', e);
      setSocketStatus1(SOCKET_STATUS[1]);
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
        setSocketStatus1(SOCKET_STATUS[1]);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const connectToWebSocket2 = React.useCallback(async () => {
    const tmp = `${WS_API_URL}/${PROTOCOL}_${MessageTopic.SPECTRUM}`;
    const ws = new WebSocket(tmp);

    ws.onerror = function oneError(e) {
      console.error('WebSocket: onerror, error = ', e);
      setSocketStatus2(SOCKET_STATUS[1]);
    };

    ws.onmessage = function onMessage(msg) {
      const inData = msg?.data;
      try {
        const decoded = decodeJson(inData);
        if (decoded && decoded.status) {
          setSocketStatus2(decoded.status);
        } else {
          setChartData2(decoded);
        }
      } catch (e) {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error('WebSocket: received, decoding error = ', e);
        setSocketStatus2(SOCKET_STATUS[1]);
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

    function getBData(inData: any) {
      const arr = [];
      for (let i = 0; i < inData.length; i += 1) {
        arr.push(inData[i].baseline);
      }
      return arr;
    }

    function getLegendData(usedData: any) {
      const values = getBData(usedData.data);
      const filtered = values.filter((value, index, array) => array.indexOf(value) === index);
      const elements = filtered.map((e) => { return {'name': e, 'active': true} }); 
      return elements;
    }

    if (!legendData && chartData1) {
      if (chartData1 && chartData1.data) {
        setLegendData(getLegendData(chartData1));
      }
      else {
        console.error('WebSocket: received, unexpected content error');
        setSocketStatus1(SOCKET_STATUS[1]);
      }
    }
  }, [chartData1]);

  React.useEffect(() => {
    if (DATA_LOCAL) {
      setSocketStatus1(SOCKET_STATUS[3]);
      setChartData1(PhaseData);
      setSocketStatus2(SOCKET_STATUS[3]);
      setChartData2(PlotData);
    } 
    else
    {
      connectToWebSocket1();
      connectToWebSocket2();
    } 
  }, []);

  return (
    <>
      <Statistics />
      {/* TODO : Change the following to access the correct data */}
      <SpectrumPlot resize={resize} socketStatus={socketStatus2} data={chartData2} />
      <Legend resize={resize} socketStatus={socketStatus1} data={legendData} />
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
