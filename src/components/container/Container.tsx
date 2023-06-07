import React from 'react';
import Legend from '../Legend/Legend';
import Polarization from '../Polarization/Polarization';
import Spectrogram from '../Spectrogram/Spectrogram';
import SpectrumPlot from '../SpectrumPlot/SpectrumPlot';
import Statistics from '../Statistics/Statistics';
import Socket from '../../services/WebSocket/Socket';
import PhaseData from '../../mockData/WebSocket/phase.json';
import PlotData from '../../mockData/WebSocket/spectrum.json';
import {
  COLOR,
  DATA_LOCAL,
  MSG_PHASE_AMP,
  MSG_SPECTRUM,
  PROTOCOL,
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
      setSocketStatus1(SOCKET_STATUS[3]);
      setChartData1(PhaseData);
      setSocketStatus2(SOCKET_STATUS[3]);
      setChartData2(PlotData);
    } else {
      Socket({
        apiUrl: WS_API_URL,
        protocol: PROTOCOL,
        suffix: MSG_PHASE_AMP,
        statusFunction: setSocketStatus1,
        dataFunction: setChartData1
      });
      Socket({
        apiUrl: WS_API_URL,
        protocol: PROTOCOL,
        suffix: MSG_SPECTRUM,
        statusFunction: setSocketStatus2,
        dataFunction: setChartData2
      });
    }
  }, []);

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

  return (
    <>
      <Statistics />
      <SpectrumPlot resize={refresh} socketStatus={socketStatus2} data={chartData2} />
      <Legend
        resize={refresh}
        socketStatus={socketStatus1}
        data={legendData}
        onClick={legendOnClick}
      />
      <Polarization
        polarization="XX"
        resize={refresh}
        socketStatus={socketStatus1}
        data={chartData1}
        legend={legendData}
      />
      <Polarization
        polarization="XY"
        resize={refresh}
        socketStatus={socketStatus1}
        data={chartData1}
        legend={legendData}
      />
      <Polarization
        polarization="YX"
        resize={refresh}
        socketStatus={socketStatus1}
        data={chartData1}
        legend={legendData}
      />
      <Polarization
        polarization="YY"
        resize={refresh}
        socketStatus={socketStatus1}
        data={chartData1}
        legend={legendData}
      />
      <Spectrogram />
    </>
  );
};

export default Container;
