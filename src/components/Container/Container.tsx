/* eslint-disable no-inner-declarations */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Tabs, Tab } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReceiptIcon from '@mui/icons-material/Receipt'
import { Button, ButtonColorTypes, DropDown, InfoCard } from '@ska-telescope/ska-gui-components';
import { env } from '../../env'
import { QASettings } from '../Settings/qaSettings';
import Legend from '../Legend/Legend';
import Polarization from '../Polarization/Polarization';
import PointingOffsets from '../PointingOffsets/PointingOffsets';
import Settings from '../Settings/Settings';
import Summary from '../Summary/Summary';
import Spectrogram from '../Spectrogram/Spectrogram';
import SpectrumPlot from '../SpectrumPlot/SpectrumPlot';
import Statistics from '../Statistics/Statistics';
import Socket from '../../services/webSocket/Socket';
import LagPlot from '../LagPlot/LagPlot';
import LogLinks from '../LogLinks/LogLinks';

import mockStatisticsProcessingBlock from '../../mockData/Statistics/processingBlock';
import mockStatisticsReceiverEvents from '../../mockData/Statistics/receiverEvents';
import PhaseData from '../../mockData/WebSocket/phase.json';
import PlotData from '../../mockData/WebSocket/spectrum.json';
import pointingOffsetData from '../../mockData/WebSocket/pointingOffsets.json'
import { COLOR, DATA_API_URL, DATA_LOCAL, SOCKET_STATUS, WS_API_URL } from '../../utils/constants';


const items = ['XX', 'XY', 'YX', 'YY'];
const offsets = ['cross', 'elevation', 'expectedH', 'expectedV', 'tolerance', 'height']

const Container = ({ childToParent }) => {
  const { t } = useTranslation('signalDisplay');

  const [redraw, setRedraw] = React.useState(false);
  const [refresh, setRefresh] = React.useState(0);
  const [socketStatus1, setSocketStatus1] = React.useState(SOCKET_STATUS[0]);
  const [chartData1, setChartData1] = React.useState(null);
  const [socketStatus2, setSocketStatus2] = React.useState(SOCKET_STATUS[0]);
  const [chartData2, setChartData2] = React.useState(null);
  const [socketStatus3, setSocketStatus3] = React.useState(SOCKET_STATUS[0]);
  const [chartData3, setChartData3] = React.useState(null);
  const [legendData, setLegendData] = React.useState(null);
  const [legendPole, setLegendPole] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  const [displaySettings, setDisplaySettings] = React.useState(QASettings);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [subArray, setSubArray] = React.useState('');
  const [subArrays, setSubArrays] = React.useState(null);
  const [processingBlockStatisticsData, setProcessingBlockStatisticsData] = React.useState(null);
  const [receiverEventsData, setReceiverEventsData] = React.useState(null);
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0)

  const [counter, setCounter] = React.useState(0);
  const [fetchConfig, setFetchConfig] = React.useState(false);
  const [fetchSubArrayList, setFetchSubarrayList] = React.useState(false);

  const CONVERT = 1000;
  const WORKFLOW_STATISTICS_INTERVAL_SECONDS =
    Number(env.REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS) * CONVERT;

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

  const showLegend = () =>
    displaySettings.showPolarizationAmplitudeXX ||
    displaySettings.showPolarizationAmplitudeXY ||
    displaySettings.showPolarizationAmplitudeYX ||
    displaySettings.showPolarizationAmplitudeYY ||
    displaySettings.showPolarizationPhaseXX ||
    displaySettings.showPolarizationPhaseXY ||
    displaySettings.showPolarizationPhaseYX ||
    displaySettings.showPolarizationPhaseYY ||
    displaySettings.showSpectrograms ||
    displaySettings.showLagPlots;

  const settingsClick = () => {
    setOpenSettings(o => !o);
    setRedraw(!redraw);
  };

  const settingsUpdate = (e: typeof QASettings) => {
    setDisplaySettings(e);
    setRedraw(!redraw);
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

  const displayError = () => {
    if (DATA_LOCAL) {
      return t('error.local');
    }
    return t(config ? 'error.subArray' : 'error.config');
  };

  async function retrieveProcessingBlockStatisticsData() {
    await fetch(`${DATA_API_URL}${config.paths.processing_blocks}/latest/statistics`)
      .then(response => response.json())
      .then(data => {
        setProcessingBlockStatisticsData(data);
        setTimeout(retrieveProcessingBlockStatisticsData, WORKFLOW_STATISTICS_INTERVAL_SECONDS);
      })
      .catch(() => null);
  }

  async function retrieveReceiverEventData() {
    await fetch(`${DATA_API_URL}${config.paths.spead2_scans}/latest/latest_event`)
      .then(response => response.json())
      .then(data => {
        setReceiverEventsData(data);
        setTimeout(retrieveReceiverEventData, WORKFLOW_STATISTICS_INTERVAL_SECONDS);
      })
      .catch(() => null);
  }

  const limit = () =>
    subArrays && subArrays.length > 0
      ? +env.REACT_APP_SUBARRAY_REFRESH_SECONDS
      : +env.REACT_APP_SUBARRAY_REFRESH_SECONDS_FAST;

  React.useEffect(() => {
    setFetchConfig(true);
  }, []);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    const subarrayRefresh = limit();
    if (counter >= subarrayRefresh) {
      setFetchConfig(true);
      setCounter(0);
    }
    const interval = setInterval(() => {
      setCounter(DATA_LOCAL ? counter : counter + 1);
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
    if (DATA_LOCAL) {
      setProcessingBlockStatisticsData(mockStatisticsProcessingBlock);
      setReceiverEventsData(mockStatisticsReceiverEvents);
    } else if (config !== null) {
      retrieveProcessingBlockStatisticsData();
      retrieveReceiverEventData();
    }
  }, [config]);

  React.useEffect(() => {
    childToParent(config);
  }, [config, childToParent]);

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
      setSocketStatus3(SOCKET_STATUS[3])
      setChartData3(pointingOffsetData)
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
      Socket({
        apiUrl: WS_API_URL + config.paths.websocket,
        protocol: config.api_format,
        suffix: `${config.topics.pointing_offset}-${subArray}`,
        statusFunction: setSocketStatus3,
        dataFunction: setChartData3
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

  const gridWidth = () => {
    if (displaySettings.gridView) {
      return 6
    } 
      return 12
  }

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex)
  }

  return (
    <>
      <Box m={0}>
        <Settings
          open={openSettings}
          openToggle={settingsClick}
          displaySettings={displaySettings}
          setSettings={settingsUpdate}
        />
        <Grid container direction="row" gap={2} justifyContent="space-between">
          <Grid item xs={6}>
            <Grid container direction="column" gap={2} justifyContent="justify-left">
              <Grid item>
                <Box m={1}>
                  {subArrays && (
                    <DropDown
                      disabled={!subArrays || subArrays.length < 2}
                      helperText={t(
                        subArrays.length < 2 ? 'prompt.subArrayOne' : 'prompt.subArrayMany'
                      )}
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
                      message={displayError()}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item>
                {config && (
                  <Box mt={1}>
                    <Button
                      color={ButtonColorTypes.Secondary}
                      disabled={!!DATA_LOCAL}
                      icon={<RefreshIcon />}
                      label={t('label.button.refresh', { count: labelCounter() })}
                      onClick={refreshClicked}
                      testId="refreshButton"
                      toolTip={t('toolTip.button.refresh')}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Summary
              config={config}
              status1={socketStatus1}
              status2={socketStatus2}
              status3={SOCKET_STATUS[processingBlockStatisticsData === null ? 1 : 2]}
              status4={SOCKET_STATUS[receiverEventsData === null ? 1 : 2]}
              clickFunction={settingsClick}
            />
          </Grid>
        </Grid>
      </Box>
      <LogLinks subArray={subArray} config={config} />
      <Statistics
        processingBlockStatisticsData={processingBlockStatisticsData}
        receiverEventsData={receiverEventsData}
        displaySettings={displaySettings}
      />
      <Box sx={{width: '100%'}}>
        <Box sx={{BorderBottom: 1, borderColor: 'divider'}}>
      <Tabs 
        value={currentTabIndex} 
        onChange={handleTabChange} 
        textColor='secondary' 
        centered 
        variant='fullWidth'>
          <Tab label='Visibility Receive' data-testid='visibilitiesTab'/>
          <Tab label='Calibration Data' data-testid='calibrationPlotsTab'/>
      </Tabs>
      </Box>
      </Box>
      {currentTabIndex===0 && (<Grid container>
        {items.map(item => (
          <Grid item xs={gridWidth()}>
            <SpectrumPlot
              key={`SpectrumPlot${item}`}
              polarization={item}
              redraw={redraw}
              resize={refresh}
              setSettings={settingsUpdate}
              socketStatus={socketStatus2}
              displaySettings={displaySettings}
              data={chartData2}
            />
          </Grid>
      ))}
      </Grid>
      )}
      
      {(currentTabIndex===0 && showLegend()) && (
        <Legend
          resize={refresh}
          data={legendData}
          displaySettings={displaySettings}
          onClick={legendOnClick}
          pole={legendPole}
          poleUpdate={poleOnClick}
        />
      )}
      {currentTabIndex === 0 && items.map(item => (
        <Polarization
          key={`Polarization${item}`}
          polarization={item}
          redraw={redraw}
          resize={refresh}
          setSettings={settingsUpdate}
          socketStatus={socketStatus1}
          displaySettings={displaySettings}
          data={chartData1}
          legend={legendData}
        />
      ))}

      
      {currentTabIndex===0 && (<Spectrogram config={config} legend={legendData} displaySettings={displaySettings} />)}
      {currentTabIndex===0 && (<LagPlot config={config} legend={legendData} displaySettings={displaySettings} />)}
      
      
      {currentTabIndex === 1 && (<Grid container>
        {offsets.map(item => (
          <Grid item xs={gridWidth()}>
            <PointingOffsets 
              data={chartData3} 
              displaySettings={displaySettings} 
              offset={item} 
              resize={refresh}
              socketStatus={socketStatus3} 
              redraw={redraw}
            />
          </Grid>
        ))}
      </Grid>)}
    </>
  );
};

export default Container;
