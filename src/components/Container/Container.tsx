/* eslint-disable no-inner-declarations */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, ButtonColorTypes, DropDown, InfoCard } from '@ska-telescope/ska-gui-components';
import Legend from '../Legend/Legend';
import Polarization from '../Polarization/Polarization';
import Spectrogram from '../Spectrogram/Spectrogram';
import SpectrumPlot from '../SpectrumPlot/SpectrumPlot';
import Statistics from '../Statistics/Statistics';
import Socket from '../../services/webSocket/Socket';

import PhaseData from '../../mockData/WebSocket/phase.json';
import PlotData from '../../mockData/WebSocket/spectrum.json';
import { COLOR, DATA_API_URL, DATA_LOCAL, SOCKET_STATUS, WS_API_URL } from '../../utils/constants';

const items = ['XX', 'XY', 'YX', 'YY'];

const Container = () => {
  const { t } = useTranslation('signalDisplay');

  const [refresh, setRefresh] = React.useState(0);
  const [socketStatus1, setSocketStatus1] = React.useState(SOCKET_STATUS[0]);
  const [chartData1, setChartData1] = React.useState(null);
  const [socketStatus2, setSocketStatus2] = React.useState(SOCKET_STATUS[0]);
  const [chartData2, setChartData2] = React.useState(null);
  const [legendData, setLegendData] = React.useState(null);
  const [legendPole, setLegendPole] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  const [subArray, setSubArray] = React.useState('');
  const [subArrays, setSubArrays] = React.useState(null);

  const [counter, setCounter] = React.useState(0);
  const [fetchConfig, setFetchConfig] = React.useState(false);
  const [fetchSubArrayList, setFetchSubarrayList] = React.useState(false);

  // We have a delay to reduce screen flicker
  function resizeIncrement() {
    setTimeout(() => {
      setRefresh(refresh + 1);
    }, 1000);
  }
  window.onresize = resizeIncrement;

  const isSelf = (inValue: string) => {
    const arr = inValue.split('_');
    return arr[0] === arr[1] ? arr[0] : '';
  };

  const isActive = (inValue: string) => {
    const found = legendData ? legendData.find((e: { text: string }) => e.text === inValue) : false;
    return found ? found.active : true;
  };

  const isPoleActive = (inValue: string) => {
    const found = legendPole ? legendPole.find((e: { text: string }) => e.text === inValue) : false;
    return found ? found.active : true;
  };

  function legendOnClick(val: string): void {
    const tmp = [];
    for (let i = 0; i < legendData.length; i++) {
      tmp.push({
        self: legendData[i].self,
        text: legendData[i].text,
        color: legendData[i].color,
        active:
          legendData[i].text.toUpperCase() === val ? !legendData[i].active : legendData[i].active
      });
    }
    setLegendData(tmp);
  }

  function poleOnClick(val: string): void {
    const poles = [];
    let newValue = null;
    for (let i = 0; i < legendPole.length; i++) {
      if (legendPole[i].text.toUpperCase() === val) {
        newValue = !legendData[i].active;
      }
      poles.push({
        text: legendPole[i].text,
        color: legendPole[i].color,
        active:
          legendPole[i].text.toUpperCase() === val ? !legendData[i].active : legendData[i].active
      });
    }
    setLegendPole(poles);

    const tmp = [];
    for (let i = 0; i < legendData.length; i++) {
      const arr = legendData[i].text.split('_');
      tmp.push({
        self: legendData[i].self,
        text: legendData[i].text,
        color: legendData[i].color,
        active:
          arr[0].toUpperCase() === val || arr[1].toUpperCase() === val
            ? newValue
            : legendData[i].active
      });
    }
    setLegendData(tmp);
  }

  const limit = () => subArrays && subArrays.length > 0 ? +process.env.REACT_APP_SUBARRAY_REFRESH_SECONDS : 10;

  React.useEffect(() => {
    setFetchConfig(true);
  }, []);

  React.useEffect(() => {
    const subarrayRefresh = limit();
    if (counter >= subarrayRefresh) {
      setFetchConfig(true);
      setCounter(0);
    }
    const interval = setInterval(() => {
      setCounter(counter + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);

  React.useEffect(() => {
    if (fetchConfig === false) {
      return;
    }
    if (DATA_LOCAL) {
      setConfig('DATA LOCAL');
      setFetchConfig(false);
      setFetchSubarrayList(true);
      return;
    }
    const abortController = new AbortController();

    async function fetchConfigFromAPI() {
      await fetch(`${DATA_API_URL}/config`, {
        signal: abortController.signal
      })
        .then(response => response.json())
        .then(data => {
          setConfig(data);
          setFetchConfig(false);
          setFetchSubarrayList(true);
          abortController.abort();
        })
        .catch(() => {
          setFetchConfig(false);
          abortController.abort();
        });
    }
    fetchConfigFromAPI();
  }, [fetchConfig]);

  React.useEffect(() => {
    if (fetchSubArrayList === false) {
      return;
    }
    if (config === null) {
      setFetchSubarrayList(false);
      return;
    }
    if (DATA_LOCAL) {
      setSubArray('1');
      setFetchSubarrayList(false);
    } else {
      const abortController = new AbortController();

      const clear = () => {
        setSubArrays([]);
        setSubArray('');
        setFetchSubarrayList(false);
      };

      async function fetchSubArrayFromAPI() {
        await fetch(`${DATA_API_URL}${config.paths.subarrays}`, {
          signal: abortController.signal
        })
          .then(response => response.json())
          .then(data => {
            const obj: { id: string }[] = data && data.all ? Object.values(data.all) : null;
            if (obj) {
              const elements = obj.map(e => ({ label: e.id, value: e.id }));
              const latest = data && data?.latest ? data.latest : '';
              const eDefault = elements?.length > 0 ? elements[0].value : '';
              setSubArrays(elements);
              setSubArray(latest.length ? latest : eDefault);
              setFetchSubarrayList(false);
            } else {
              clear();
            }
            abortController.abort();
          })
          .catch(() => {
            clear();
            abortController.abort();
          });
      }
      fetchSubArrayFromAPI();
    }
    setFetchSubarrayList(false);
  }, [fetchSubArrayList]);

  React.useEffect(() => {
    if (subArray === '') {
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
        suffix: `${config.topics.phase_and_amplitude}-${subArray}`,
        statusFunction: setSocketStatus1,
        dataFunction: setChartData1
      });
      Socket({
        apiUrl: WS_API_URL + config.paths.websocket,
        protocol: config.api_format,
        suffix: `${config.topics.spectrum}-${subArray}`,
        statusFunction: setSocketStatus2,
        dataFunction: setChartData2
      });
    }
  }, [subArray]);

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
      const elements = filtered.map((e, i) => ({
        text: e,
        active: isActive(e),
        self: isSelf(e),
        color: COLOR[i]
      }));
      const poles = [];
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].self.length) {
          poles.push({
            text: elements[i].self,
            active: isPoleActive(elements[i].self),
            color: elements[i].color
          });
        }
      }
      setLegendPole(poles);
      return elements;
    }

    if (chartData1) {
      if (chartData1.data && chartData1.data.length > 0) {
        setLegendData(getLegendData(chartData1));
      } else {
        // eslint-disable-next-line no-console
        console.error('WebSocket: received, unexpected content error');
        setSocketStatus1(SOCKET_STATUS[1]);
        setLegendData([]);
      }
    }
  }, [chartData1]);

  const labelCounter = () => limit() - counter;
  const refreshClicked = () => {
    if (!fetchSubArrayList) {
      setFetchSubarrayList(true);
    }
  };

  return (
    <>
      <Box m={1}>
        <Grid container direction="row" gap={2} justifyContent="justify-left">
          <Grid item xs={3}>
            {subArrays && (
              <DropDown
                disabled={!subArrays || subArrays.length < 2}
                helperText={t(subArrays.length < 2 ? 'prompt.subArrayOne' : 'prompt.subArrayMany')}
                label={t('label.subArray')}
                options={subArrays}
                testId="subArraySelection"
                value={subArray}
                setValue={setSubArray}
              />
            )}
            {!subArrays && (
              <InfoCard
                testId="noSubArrayCard"
                fontSize={25}
                level={1}
                message={t(config ? 'error.subArray' : 'error.config')}
              />
            )}
          </Grid>
          <Grid item>
            {config && (
              <Button
                color={ButtonColorTypes.Secondary}
                icon={<RefreshIcon />}
                label={t('label.button.refresh', { count: labelCounter() })}
                onClick={refreshClicked}
                testId="refreshButton"
                toolTip={t('toolTip.button.refresh')}
              />
            )}
          </Grid>
        </Grid>
      </Box>

      <Statistics config={config} />
      {items.map(item => (
        <SpectrumPlot
          key={`SpectrumPlot${item}`}
          polarization={item}
          resize={refresh}
          socketStatus={socketStatus2}
          config={config}
          data={chartData2}
        />
      ))}
      <Legend
        resize={refresh}
        socketStatus={socketStatus1}
        config={config}
        data={legendData}
        onClick={legendOnClick}
        pole={legendPole}
        poleUpdate={poleOnClick}
      />
      {items.map(item => (
        <Polarization
          key={`Polarization${item}`}
          polarization={item}
          resize={refresh}
          socketStatus={socketStatus1}
          config={config}
          data={chartData1}
          legend={legendData}
        />
      ))}
      <Spectrogram config={config} legend={legendData} />
    </>
  );
};

export default Container;
