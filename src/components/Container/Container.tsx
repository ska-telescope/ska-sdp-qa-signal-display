/* eslint-disable react/jsx-no-bind */
import React from 'react';
import Legend from '../Legend/Legend';
import Polarization from '../Polarization/Polarization';
import Spectrogram from '../Spectrogram/Spectrogram';
import SpectrumPlot from '../SpectrumPlot/SpectrumPlot';
import Statistics from '../Statistics/Statistics';
import Socket from '../../services/webSocket/Socket';
import PhaseData from '../../mockData/WebSocket/phase.json';
import PlotData from '../../mockData/WebSocket/spectrum.json';
import {
  COLOR,
  DATA_API_URL,
  DATA_LOCAL,
  MSG_PHASE_AMP,
  MSG_SPECTRUM,
  SOCKET_STATUS,
  WS_API_URL
} from '../../utils/constants';

const Container = () => {
  const [refresh, setRefresh] = React.useState(0);
  const [socketStatus1, setSocketStatus1] = React.useState(SOCKET_STATUS[0]);
  const [chartData1, setChartData1] = React.useState(null);
  const [socketStatus2, setSocketStatus2] = React.useState(SOCKET_STATUS[0]);
  const [chartData2, setChartData2] = React.useState(null);
  const [legendData, setLegendData] = React.useState(null);
  const [config, setConfig] = React.useState(null);

  // We have a delay to reduce screen flicker
  function resizeIncrement() {
    setTimeout(() => {
      setRefresh(refresh + 1);
    }, 1000);
  }
  window.onresize = resizeIncrement;

  function legendOnClick(val: string) {
    const tmp = [];
    for (let i = 0; i < legendData.length; i++) {
      tmp.push({
        text: legendData[i].text,
        color: legendData[i].color,
        active:
          legendData[i].text.toUpperCase() === val ? !legendData[i].active : legendData[i].active
      });
    }
    setLegendData(tmp);
  }

  React.useEffect(() => {
    if (DATA_LOCAL) {
      setConfig('DATA LOCAL');
      return;
    }
    const abortController = new AbortController();
    async function fetchConfig() {
      await fetch(`${DATA_API_URL}/config`, {
        signal: abortController.signal
      })
        .then(response => response.json())
        .then(data => {
          setConfig(data);
          abortController.abort();
        })
        .catch(() => {
          // TODO : What do we put in here ?
          abortController.abort();
        });
    }
    fetchConfig();
  }, []);

  React.useEffect(() => {
    if (config === null) {
      return;
    }
    if (DATA_LOCAL) {
      setSocketStatus1(SOCKET_STATUS[3]);
      setChartData1(PhaseData);
      setSocketStatus2(SOCKET_STATUS[3]);
      setChartData2(PlotData);
    } else {
      Socket({
        apiUrl: WS_API_URL + config.paths.websocket,
        protocol: config.api_format,
        suffix: MSG_PHASE_AMP,
        statusFunction: setSocketStatus1,
        dataFunction: setChartData1
      });
      Socket({
        apiUrl: WS_API_URL + config.paths.websocket,
        protocol: config.api_format,
        suffix: MSG_SPECTRUM,
        statusFunction: setSocketStatus2,
        dataFunction: setChartData2
      });
    }
  }, [config]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getBData(inData: any) {
      const arr = [];
      for (let i = 0; i < inData.length; i += 1) {
        arr.push(inData[i].baseline);
      }
      return arr;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getLegendData(usedData: any) {
      const values = getBData(usedData.data);
      const filtered = values.filter((value, index, array) => array.indexOf(value) === index);
      const elements = filtered.map((e, i) => ({ text: e, active: true, color: COLOR[i] }));
      return elements;
    }

    if (!legendData && chartData1) {
      if (chartData1 && chartData1.data) {
        setLegendData(getLegendData(chartData1));
      } else {
        // eslint-disable-next-line no-console
        console.error('WebSocket: received, unexpected content error');
        setSocketStatus1(SOCKET_STATUS[1]);
      }
    }
  }, [chartData1]);

  const Polar = (inValue: string): React.JSX.Element => (
    <Polarization
      polarization={inValue}
      resize={refresh}
      socketStatus={socketStatus1}
      config={config}
      data={chartData1}
      legend={legendData}
    />
  );

  return (
    <>
      <Statistics config={config} />
      <SpectrumPlot
        resize={refresh}
        socketStatus={socketStatus2}
        config={config}
        data={chartData2}
      />
      <Legend
        resize={refresh}
        socketStatus={socketStatus1}
        config={config}
        data={legendData}
        onClick={legendOnClick}
      />
      {Polar('XX')}
      {Polar('XY')}
      {Polar('YX')}
      {Polar('YY')}
      <Spectrogram config={config} />
    </>
  );
};

export default Container;
