/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid } from '@mui/material';
import { InfoCard } from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';
import YAxisToggle from '../YAxisToggle/YAxisToggle';
import { COLOR } from '../../utils/constants';
import {
  calculateChannels,
  calculateDB,
  calculateDegrees,
  calculateLog
} from '../../utils/calculate';
import { amplitudeAxisY, phaseAxisY, QASettings } from '../Settings/qaSettings';

interface PolarizationProps {
  data: any;
  displaySettings: typeof QASettings;
  legend: any;
  polarization: string;
  redraw: boolean;
  resize: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSettings: Function;
  socketStatus: string;
}

const RATIO = 2;

const Polarization = ({
  data,
  displaySettings,
  legend,
  polarization,
  redraw,
  resize,
  setSettings,
  socketStatus
}: PolarizationProps) => {
  const { t } = useTranslation('signalDisplay');

  const [chartData1, setChartData1] = React.useState(null);
  const [chartData2, setChartData2] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const settingElement = (amplitude: boolean) =>
    `showPolarization${amplitude ? 'Amplitude' : 'Phase'}${polarization}axisY`;

  const setting = (amplitude: boolean) => displaySettings[settingElement(amplitude)];

  const xLabel = () => `${t('label.frequency')} (${t('units.frequency')})`;

  const yLabel = (amplitude: boolean) =>
    `${t('label.amplitude')} (${t(`units.${setting(amplitude)}`)})`;

  const chartTitle = (amplitude: boolean) => t(amplitude ? 'label.amplitude' : 'label.phase');

  function calculateYData(inData: any, i: number, amplitude: boolean) {
    switch (setting(amplitude)) {
      case phaseAxisY[0]: // radians
        return inData[i].phases;
      case phaseAxisY[1]: // degrees
        return inData[i].phases.map((item: number) => calculateDegrees(item));
      case amplitudeAxisY[0]: // amplitude
        return inData[i].amplitudes;
      case amplitudeAxisY[1]: // db
        return inData[i].amplitudes.map((item: number) => calculateDB(item));
      case amplitudeAxisY[2]: // log
        return inData[i].amplitudes.map((item: number) => calculateLog(item));
      default:
        return 0;
    }
  }

  function getBaseData(inData: any, polarisation: string, amplitude: boolean) {
    const tmp = [];
    for (let i = 0; i < inData.length; i += 1) {
      if (inData[i].polarisation === polarisation) {
        tmp.push({
          name: inData[i].baseline,
          data: calculateYData(inData, i, amplitude)
        });
      }
    }
    if (!legend || legend.length === 0) {
      return tmp;
    }

    const arr = [];
    for (let i = 0; i < tmp.length; i += 1) {
      if (tmp[i].name === legend[i].text && legend[i].active) {
        arr.push(tmp[i]);
      }
    }

    return arr;
  }

  function getLegendColor(name: string) {
    if (legend) {
      for (let i = 0; i < legend.length; i++) {
        if (legend[i].text === name) {
          return legend[i].color;
        }
      }
    }
    return COLOR[0]; // Only here for completeness.
  }

  function getChartData(usedData: any, amplitude: boolean) {
    const chartData = [];
    if (!legend) {
      return chartData;
    }
    const xValues = calculateChannels(usedData.spectral_window);
    const baseData = getBaseData(usedData.data, polarization, amplitude);
    for (let i = 0; i < baseData.length; i++) {
      chartData.push({
        x: xValues,
        y: baseData[i].data,
        name: baseData[i].name,
        marker: {
          color: getLegendColor(baseData[i].name)
        }
      });
    }
    return chartData;
  }

  const canShow = () => data && data.data;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  const canShowChartAmplitude = () => displaySettings[`showPolarizationAmplitude${polarization}`];
  const canShowChartPhase = () => displaySettings[`showPolarizationPhase${polarization}`];
  const parentWidth = () => (canShowChartAmplitude() && canShowChartPhase() ? 700 : 1400);

  React.useEffect(() => {
    if (!refresh) setShowContent(canShow());
    else setRefresh(false);
  }, [refresh]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [resize]);

  React.useEffect(() => {
    const firstRender = chartData1 === null;
    if (data && legend) {
      setChartData1(canShow() ? getChartData(data, true) : null);
      setChartData2(canShow() ? getChartData(data, false) : null);
    }
    if (firstRender) {
      setShowContent(canShow());
    }
  }, [data, legend, redraw]);

  function setValue(e: typeof QASettings) {
    setSettings(e);
  }

  const chartToggle = (type: boolean) => (
    <YAxisToggle
      // eslint-disable-next-line react/jsx-no-bind
      setValue={setValue}
      testId={`${settingElement(type)}ButtonTestId`}
      type={type ? 'amplitude' : 'phase'}
      value={settingElement(type)}
      displaySettings={displaySettings}
    />
  );

  return (
    <Grid container direction="row" justifyContent="space-between">
      {canShowChartAmplitude() && (
        <Grid item xs={canShowChartPhase() ? 6 : 12}>
          <SignalCard
            action={chartToggle(true)}
            title={`${t('label.polarization')} / ${chartTitle(true)} ${polarization}`}
            socketStatus={socketStatus}
            showContent={showContent}
            setShowContent={showToggle}
            showInfoModal='true'
            infoTitle={t('modalInfo.amplitudePlot.title')}
            infoContent={t('modalInfo.amplitudePlot.content')}
            infoSite={t('modalInfo.amplitudePlot.site')}
          >
            <Grid container direction="row" justifyContent="space-between">
              <Grid data-testid="chartData1Content" item md={6} xs={12}>
                {(!legend || !chartData1 || chartData1.length === 0) && (
                  <Box m={1}>
                    <InfoCard
                      testId="noChartData1Card"
                      fontSize={25}
                      level={1}
                      message={t('error.noData')}
                    />
                  </Box>
                )}
                {legend && chartData1 && chartData1.length > 0 && (
                  <Plotly
                    darkMode={darkMode}
                    data={showContent ? chartData1 : null}
                    height={parentWidth() / RATIO}
                    title=""
                    width={parentWidth()}
                    xLabel={xLabel()}
                    yLabel={yLabel(true)}
                  />
                )}
              </Grid>
            </Grid>
          </SignalCard>
        </Grid>
      )}
      {canShowChartPhase() && (
        <Grid item xs={canShowChartAmplitude() ? 6 : 12}>
          <SignalCard
            action={chartToggle(false)}
            title={`${t('label.polarization')} / ${chartTitle(false)}  ${polarization}`}
            socketStatus={socketStatus}
            showContent={showContent}
            setShowContent={showToggle}
            showInfoModal='true'
            infoTitle={t('modalInfo.phasePlot.title')}
            infoContent={t('modalInfo.phasePlot.content')}
            infoSite={t('modalInfo.phasePlot.site')}
          >
            <Grid container direction="row" justifyContent="space-between">
              <Grid data-testid="chartData2Content" item md={6} xs={12}>
                {(!chartData2 || chartData2.length === 0) && (
                  <Box m={1}>
                    <InfoCard
                      testId="noChartData2Card"
                      fontSize={25}
                      level={1}
                      message={t('error.noData')}
                    />
                  </Box>
                )}
                {chartData2 && chartData2.length > 0 && (
                  <Plotly
                    darkMode={darkMode}
                    data={showContent ? chartData2 : null}
                    height={parentWidth() / RATIO}
                    title=""
                    width={parentWidth()}
                    xLabel={xLabel()}
                    yLabel={yLabel(false)}
                  />
                )}
              </Grid>
            </Grid>
          </SignalCard>
        </Grid>
      )}
    </Grid>
  );
};
export default Polarization;
