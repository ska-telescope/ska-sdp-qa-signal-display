/* eslint-disable no-inner-declarations */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Tabs, Tab } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, ButtonColorTypes, DropDown, InfoCard } from '@ska-telescope/ska-gui-components';
import { env } from '../../env';
import { QASettings } from '../Settings/qaSettings';
import Legend from '../Legend/Legend';
import Polarization from '../Polarization/Polarization';
import PointingOffsets from '../PointingOffsets/PointingOffsets';
import Settings from '../Settings/Settings';
import Summary from '../Summary/Summary';
import Spectrogram from '../Spectrogram/Spectrogram';
import SpectrumPlot from '../SpectrumPlot/SpectrumPlot';
import Statistics from '../Statistics/Statistics';
import SDPConfiguration from '../SDPConfiguration/SDPConfiguration';
import Socket from '../../services/webSocket/Socket';
import LagPlot from '../LagPlot/LagPlot';
import LogLinks from '../LogLinks/LogLinks';
import GainCalibration from '../GainCalibration/GainCalibration';
import BandAveragedXCorr from '../BandAveragedXCorr/BandAveragedXCorr';
import WeightDistributionPlot from '../WeightDistributions/WeightDistributionPlot';
import mockStatisticsProcessingBlock from '../../mockData/Statistics/processingBlock';
import mockStatisticsReceiverEvents from '../../mockData/Statistics/receiverEvents';
import { mockSubarrayDetail } from '../../mockData/Statistics/configEndpoints';
import PhaseData from '../../mockData/WebSocket/phase.json';
import AmplitudeData from '../../mockData/WebSocket/amplitude.json';
import SpectrumData from '../../mockData/WebSocket/spectrum.json';
import pointingOffsetData from '../../mockData/WebSocket/pointingOffsets.json';
import gainCalibrationData from '../../mockData/WebSocket/gainCalibrations.json';
import BandAveragedXCorrData from '../../mockData/WebSocket/bandAveragedXCorr.json';
import UVCoverageData from '../../mockData/WebSocket/uvCoverage.json';
import maskMockData from '../../mockData/tel-model/maskMockData.json';
import {
  COLOR,
  DATA_API_URL,
  DATA_LOCAL,
  USE_MISSING_DATA_MASK,
  POLARIZATIONS,
  SOCKET_STATUS,
  WS_API_URL,
  OFFSETS,
  GAINS,
  METRIC_TYPES
} from '../../utils/constants';
import { getMaskDomains } from '../../utils/masksCalculator';
import MaskLegend from '../MaskLegend/MaskLegend';

const Container = ({ childToParent }) => {
  const { t } = useTranslation('signalDisplay');

  const [redraw, setRedraw] = React.useState(false);
  const [refresh, setRefresh] = React.useState(0);
  const [socketStatusAmplitude, setSocketStatusAmplitude] = React.useState(SOCKET_STATUS[0]);
  const [socketStatusBandAvXCorr, setSocketBandAvXCorr] = React.useState(SOCKET_STATUS[0]);
  const [socketStatusPhase, setSocketStatusPhase] = React.useState(SOCKET_STATUS[0]);
  const [socketStatusSpectrum, setSocketStatusSpectrum] = React.useState(SOCKET_STATUS[0]);
  const [socketStatusPointingOffset, setSocketStatusPointingOffset] = React.useState(
    SOCKET_STATUS[0]
  );
  const [socketStatusGainCal, setSocketStatusGainCal] = React.useState(SOCKET_STATUS[0]);
  const [socketStatusUVCoverage, setSocketStatusUVCoverage] = React.useState(SOCKET_STATUS[0]);

  const [chartDataAmplitude, setChartDataAmplitude] = React.useState(null);
  const [chartDataBandAvXCorr, setChartDataBandAvXCorr] = React.useState<[]>([]);
  const [chartDataSpectrum, setChartDataSpectrum] = React.useState(null);
  const [chartDataPointingOffset, setChartDataPointingOffset] = React.useState(null);
  const [chartDataGainCal, setChartDataGainCal] = React.useState<
    { time: number[]; gains: number[][]; phases: number[][] }[]
  >([]);
  const [chartDataUVCoverage, setChartDataUVCoverage] = React.useState([]);
  const [legendData, setLegendData] = React.useState(null);
  const [legendPole, setLegendPole] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  const [displaySettings, setDisplaySettings] = React.useState(QASettings);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [subArray, setSubArray] = React.useState('');
  const [subArrays, setSubArrays] = React.useState(null);
  const [subarrayDetails, setSubarrayDetails] = React.useState(null);
  const [enabledMetrics, setEnabledMetrics] = React.useState([]);
  const [processingBlockStatisticsData, setProcessingBlockStatisticsData] = React.useState(null);
  const [receiverEventsData, setReceiverEventsData] = React.useState(null);
  const [maskData, setMaskData] = React.useState(null);

  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  const [chartDataPhase, setChartDataPhase] = React.useState(null);

  const [counter, setCounter] = React.useState(0);
  const [fetchConfig, setFetchConfig] = React.useState(false);
  const [fetchSubArrayList, setFetchSubarrayList] = React.useState(false);
  const [processingBlockId, setProcessingBlockId] = React.useState(null);

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
    displaySettings.showBandAvXCorrXX ||
    displaySettings.showBandAvXCorrXY ||
    displaySettings.showBandAvXCorrYX ||
    displaySettings.showBandAvXCorrYY ||
    displaySettings.showSpectrograms ||
    displaySettings.showLagPlots ||
    displaySettings.showGainCalibrationAmplitudeH ||
    displaySettings.showGainCalibrationAmplitudeV ||
    displaySettings.showGainCalibrationPhaseH ||
    displaySettings.showGainCalibrationPhaseV ||
    displaySettings.showWeightDistributionXX ||
    displaySettings.showWeightDistributionXY ||
    displaySettings.showWeightDistributionYX ||
    displaySettings.showWeightDistributionYY;

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
    if (DATA_LOCAL) {
      return;
    }
    if (config === undefined) {
      return;
    }
    await fetch(`${DATA_API_URL}${config.paths.processing_blocks}/latest/statistics`)
      .then(response => response.json())
      .then(data => {
        setProcessingBlockStatisticsData(data);
      })
      .catch(() => null);
  }

  async function retrieveReceiverEventData() {
    if (DATA_LOCAL) {
      return;
    }
    if (config === undefined) {
      return;
    }
    await fetch(`${DATA_API_URL}${config.paths.spead2_scans}/latest/latest_event`)
      .then(response => response.json())
      .then(data => {
        setReceiverEventsData(data);
      })
      .catch(() => null);
  }

  const limit = () =>
    subArrays && subArrays.length > 0
      ? +env.REACT_APP_SUBARRAY_REFRESH_SECONDS
      : +env.REACT_APP_SUBARRAY_REFRESH_SECONDS_FAST;

  async function retrieveMaskData() {
    await fetch(`${DATA_API_URL}${config.paths.mask_data}/scan_id/01`)
      .then(response => response.json())
      .then(data => {
        setMaskData(getMaskDomains(data.data));
      })
      .catch(() => null);
  }

  function getEnabledMetrics() {
    if (subarrayDetails?.deployments == null) {
      return [];
    }
    const metrics = [];
    Object.entries(subarrayDetails?.deployments).forEach(([_key, deployments]) => {
      deployments?.deployment?.args?.values?.processors.forEach(processor => {
        if (processor.name.startsWith('signal-display-metrics-')) {
          processor.command[processor.command.length - 1].split(',').forEach(metric => {
            metrics.push(metric);
          });
        }
      });
    });
    return metrics;
  }

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
      if (USE_MISSING_DATA_MASK) {
        setMaskData(getMaskDomains(maskMockData.data));
      }
    } else if (config !== null) {
      if (USE_MISSING_DATA_MASK) {
        retrieveMaskData();
      }
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
      setSubarrayDetails(mockSubarrayDetail);
      setFetchSubarrayList(false);
    } else {
      const abortController = new AbortController();

      const clear = () => {
        setSubArrays([]);
        setSubArray('');
        setFetchSubarrayList(false);
      };

      async function fetchSubArrayFromAPI() {
        await fetch(`${DATA_API_URL}/config/subarrays`, {
          signal: abortController.signal
        })
          .then(response => response.json())
          .then(data => {
            if (data) {
              const elements = data.map(e => ({ label: e, value: e }));
              const eFirst = elements?.length > 0 ? elements[0].value : '';
              setSubArrays(elements);
              setSubArray(eFirst);
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

  async function fetchSubarrayDetails() {
    await fetch(`${DATA_API_URL}/config/subarrays/${subArray}/current_setup`)
      .then(response => response.json())
      .then(data => {
        setSubarrayDetails(data);
        if(data.execution_block && data.execution_block.pb_realtime.length > 0){
          setProcessingBlockId(data.execution_block.pb_realtime[0]);
        }
        setTimeout(fetchSubarrayDetails, 10000);
      })
      .catch(() => null);
  }

  const activeWebsockets = React.useRef<{ [key: string]: WebSocket }>({});

  async function connectWebSockets() {
    const localEnabledMetrics = enabledMetrics === null ? [] : enabledMetrics;

    Object.entries(activeWebsockets.current).forEach(([key, webSocket]) => {
      if (!localEnabledMetrics.includes(key)) {
        webSocket.close();
        delete activeWebsockets.current[key];
      }
    });

    localEnabledMetrics.forEach(metric => {
      if (metric in activeWebsockets.current) {
        return;
      }

      switch (metric) {
        case METRIC_TYPES.AMPLITUDE:
          activeWebsockets.current[metric] = Socket({
            apiUrl: WS_API_URL + config.paths.websocket,
            protocol: config.api_format,
            suffix: `${config.topics.amplitude}-${subArray}`,
            statusFunction: setSocketStatusAmplitude,
            dataFunction: setChartDataAmplitude
          });
          break;
        case METRIC_TYPES.PHASE:
          activeWebsockets.current[metric] = Socket({
            apiUrl: WS_API_URL + config.paths.websocket,
            protocol: config.api_format,
            suffix: `${config.topics.phase}-${subArray}`,
            statusFunction: setSocketStatusPhase,
            dataFunction: setChartDataPhase
          });
          break;
        case METRIC_TYPES.SPECTRUM:
          activeWebsockets.current[metric] = Socket({
            apiUrl: WS_API_URL + config.paths.websocket,
            protocol: config.api_format,
            suffix: `${config.topics.spectrum}-${subArray}`,
            statusFunction: setSocketStatusSpectrum,
            dataFunction: setChartDataSpectrum
          });
          break;
        case METRIC_TYPES.BAND_AVERAGED_X_CORR:
          activeWebsockets.current[metric] = Socket({
            apiUrl: WS_API_URL + config.paths.websocket,
            protocol: config.api_format,
            suffix: `${config.topics.bandaveragedxcorr}-${subArray}`,
            statusFunction: setSocketBandAvXCorr,
            dataFunction: setChartDataBandAvXCorr,
            timeSeries: true
          });
          break;
        case METRIC_TYPES.UV_COVERAGE:
          activeWebsockets.current[metric] = Socket({
            apiUrl: WS_API_URL + config.paths.websocket,
            protocol: config.api_format,
            suffix: `${config.topics.uvcoverage}-${subArray}`,
            statusFunction: setSocketStatusUVCoverage,
            dataFunction: setChartDataUVCoverage
          });
          break;
        default:
          break;
      }
    });
  }

  React.useEffect(() => {
    if (processingBlockId != null) {
      setRedraw(!redraw);
    }
  }, [processingBlockId]);


  React.useEffect(() => {
    setEnabledMetrics(getEnabledMetrics());
    if (subarrayDetails?.processing_block_state?.status === 'READY') {
      retrieveProcessingBlockStatisticsData();
      retrieveReceiverEventData();
    }
  }, [subarrayDetails]);

  React.useEffect(() => {
    if (!DATA_LOCAL) {
      connectWebSockets();
    }
  }, [enabledMetrics]);

  React.useEffect(() => {
    if (subArray === '') {
      return;
    }
    if (DATA_LOCAL) {
      setSocketStatusAmplitude(SOCKET_STATUS[3]);
      setChartDataAmplitude(AmplitudeData);
      setSocketStatusPhase(SOCKET_STATUS[3]);
      setChartDataPhase(PhaseData);
      setSocketStatusSpectrum(SOCKET_STATUS[3]);
      setChartDataSpectrum(SpectrumData);
      setSocketStatusPointingOffset(SOCKET_STATUS[3]);
      setChartDataPointingOffset(pointingOffsetData);
      setSocketStatusGainCal(SOCKET_STATUS[3]);
      setChartDataGainCal([gainCalibrationData]);
      setSocketBandAvXCorr(SOCKET_STATUS[3]);
      setChartDataBandAvXCorr([BandAveragedXCorrData]);
      setSocketStatusUVCoverage(SOCKET_STATUS[3]);
      setChartDataUVCoverage([UVCoverageData]);
    } else {
      fetchSubarrayDetails();

      Socket({
        apiUrl: WS_API_URL + config.paths.websocket,
        protocol: config.api_format,
        suffix: `${config.topics.pointing_offset_out}-${subArray}`,
        statusFunction: setSocketStatusPointingOffset,
        dataFunction: setChartDataPointingOffset
      });
      Socket({
        apiUrl: WS_API_URL + config.paths.websocket,
        protocol: config.api_format,
        suffix: `${config.topics.gain_calibration_out}-${subArray}`,
        statusFunction: setSocketStatusGainCal,
        dataFunction: setChartDataGainCal,
        timeSeries: true
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

    if (chartDataAmplitude) {
      if (chartDataAmplitude.data && chartDataAmplitude.data.length > 0) {
        setLegendData(getLegendData(chartDataAmplitude));
      } else {
        // eslint-disable-next-line no-console
        console.error('WebSocket: received, unexpected content error');
        setSocketStatusAmplitude(SOCKET_STATUS[1]);
        setLegendData([]);
      }
    }
  }, [chartDataAmplitude]);

  const labelCounter = () => limit() - counter;
  const refreshClicked = () => {
    if (!fetchSubArrayList) {
      setCounter(0);
      setFetchSubarrayList(true);
    }
  };

  const gridWidth = () => {
    if (displaySettings.gridView) {
      return 6;
    }
    return 12;
  };

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

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
              status1={socketStatusAmplitude}
              status2={socketStatusPhase}
              status3={socketStatusSpectrum}
              status4={SOCKET_STATUS[processingBlockStatisticsData === null ? 1 : 2]}
              status5={SOCKET_STATUS[receiverEventsData === null ? 1 : 2]}
              status6={socketStatusGainCal}
              status7={socketStatusPointingOffset}
              status8={socketStatusBandAvXCorr}
              status9={socketStatusUVCoverage}
              clickFunction={settingsClick}
            />
          </Grid>
        </Grid>
      </Box>
      <LogLinks subArray={subArray} config={config} />
      <SDPConfiguration subarray={subArray} subarrayDetails={subarrayDetails} />
      <Statistics
        processingBlockStatisticsData={processingBlockStatisticsData}
        receiverEventsData={receiverEventsData}
        displaySettings={displaySettings}
      />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ BorderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTabIndex}
            onChange={handleTabChange}
            textColor="secondary"
            centered
            variant="fullWidth"
            sx={{
              '& button': { borderRadius: 2 },
              '& button.Mui-selected': { backgroundColor: '#d3d3d3' },
              '& button:active': { backgroundColor: '#d3d3d3' },
              '& button: focus': { backgroundColor: '#d3d3d3' },
              '& button:hover': { backgroundColor: '#d3d3d3' }
            }}
          >
            <Tab label="Visibility Receive" data-testid="visibilitiesTab" />
            <Tab label="Calibration Data" data-testid="calibrationPlotsTab" />
          </Tabs>
        </Box>
      </Box>
      {currentTabIndex === 0 && showLegend() && <MaskLegend displaySettings={displaySettings} />}
      {currentTabIndex === 0 && (
        <Grid container>
          {POLARIZATIONS.map(item => (
            <Grid item xs={gridWidth()}>
              <SpectrumPlot
                key={`SpectrumPlot${item}`}
                polarization={item}
                redraw={redraw}
                resize={refresh}
                setSettings={settingsUpdate}
                socketStatus={socketStatusSpectrum}
                displaySettings={displaySettings}
                data={chartDataSpectrum}
                config={config}
                subArray={subArray}
                missingData={maskData}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {currentTabIndex === 0 && showLegend() && (
        <Legend
          resize={refresh}
          data={legendData}
          displaySettings={displaySettings}
          onClick={legendOnClick}
          pole={legendPole}
          poleUpdate={poleOnClick}
        />
      )}
      {currentTabIndex === 0 &&
        POLARIZATIONS.map(item => (
          <Polarization
            key={`Polarization${item}`}
            polarization={item}
            redraw={redraw}
            resize={refresh}
            setSettings={settingsUpdate}
            socketStatus={socketStatusAmplitude}
            displaySettings={displaySettings}
            amplitudeData={chartDataAmplitude}
            phaseData={chartDataPhase}
            legend={legendData}
            missingData={maskData}
          />
        ))}

      {currentTabIndex === 0 && (
        <Grid container>
          {POLARIZATIONS.map(item => (
            <Grid item xs={gridWidth()}>
              <BandAveragedXCorr
                key={`Polarization${item}`}
                polarization={item}
                redraw={redraw}
                resize={refresh}
                setSettings={settingsUpdate}
                socketStatus={socketStatusBandAvXCorr}
                displaySettings={displaySettings}
                data={chartDataBandAvXCorr}
                legend={legendData}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {currentTabIndex === 0 && (
        <Grid container>
          {POLARIZATIONS.map(item => (
            <Grid item xs={gridWidth()}>
              <WeightDistributionPlot
                key={`Polarization${item}`}
                polarization={item}
                redraw={redraw}
                resize={refresh}
                socketStatus={socketStatusUVCoverage}
                displaySettings={displaySettings}
                data={chartDataUVCoverage}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {currentTabIndex === 0 && (
        <Spectrogram
          config={config}
          legend={legendData}
          displaySettings={displaySettings}
          subArray={subArray}
          subarrayDetails={subarrayDetails}
          redraw={redraw}
        />
      )}

      {currentTabIndex === 0 && (
        <LagPlot
          config={config}
          legend={legendData}
          displaySettings={displaySettings}
          subArray={subArray}
          subarrayDetails={subarrayDetails}
          redraw={redraw}
        />
      )}

      {currentTabIndex === 1 && (
        <Grid container>
          {OFFSETS.map(item => (
            <Grid item xs={gridWidth()}>
              <PointingOffsets
                data={chartDataPointingOffset}
                displaySettings={displaySettings}
                offset={item}
                resize={refresh}
                socketStatus={socketStatusPointingOffset}
                redraw={redraw}
                setSettings={settingsUpdate}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {currentTabIndex === 1 && (
        <Grid container>
          {GAINS.map(item => (
            <Grid item xs={gridWidth()}>
              <GainCalibration
                data={chartDataGainCal}
                displaySettings={displaySettings}
                gain={item}
                resize={refresh}
                socketStatus={socketStatusGainCal}
                redraw={redraw}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Container;
