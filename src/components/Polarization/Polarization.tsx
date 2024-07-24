/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid } from '@mui/material';
import { InfoCard } from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import PhaseData from 'src/services/types/PhaseData';
import AmplitudeData from 'src/services/types/AmplitudeData';
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
import {
  amplitudeAxisY,
  phaseAxisY,
  amplitudeReal,
  phaseImaginary,
  QASettings
} from '../Settings/qaSettings';
import {
  MISSING_DATA_COLOR,
  INVALID_DATA_COLOR,
  createRectangle
} from '../../utils/masksCalculator';

interface PolarizationProps {
  phaseData: PhaseData;
  amplitudeData: AmplitudeData;
  displaySettings: typeof QASettings;
  legend: any;
  polarization: string;
  redraw: boolean;
  resize: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSettings: Function;
  socketStatus: string;
  // missingData?: number[][];
}

const RATIO = 2;

const Polarization = ({
  phaseData,
  amplitudeData,
  displaySettings,
  legend,
  polarization,
  redraw,
  resize,
  setSettings,
  socketStatus
}: // missingData
PolarizationProps) => {
  const { t } = useTranslation('signalDisplay');

  const [disableReal, setRealDisabled] = React.useState(true);
  const [disableImag, setImagDisabled] = React.useState(true);

  const [chartData1, setChartData1] = React.useState(null);
  const [chartData2, setChartData2] = React.useState(null);
  const [invalidDataAmplitude, setInvalidDataAmplitude] = React.useState(null);
  const [invalidDataPhase, setInvalidDataPhase] = React.useState(null);

  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const settingElement = (amplitude: boolean) =>
    `showPolarization${amplitude ? 'Amplitude' : 'Phase'}${polarization}axisY`;

  const settingElementAmplitudeReal = useCallback((real: string) => `showPolarization${real}${polarization}axisY`, [disableReal, disableImag]);

  const setting = (amplitude: boolean) => displaySettings[settingElement(amplitude)];

  const settingAmplitudeReal = (real: string) => displaySettings[settingElementAmplitudeReal(real)];

  const xLabel = () => `${t('label.frequency')} (${t('units.frequency')})`;

  const yLabel = (amplitude: boolean) =>
    `${t('label.amplitude')} (${t(`units.${setting(amplitude)}`)})`;

  const chartTitle = (amplitude: boolean) => t(amplitude ? 'label.amplitude' : 'label.phase');

  function calculateYData(values: any, amplitude: boolean, selection: string) {
    if (selection === 'component') {
      return values
    }
    
      switch (setting(amplitude)) {
        case phaseAxisY[0]: // radians
          return values;
        case phaseAxisY[1]: // degrees
          return values.map((item: number) => calculateDegrees(item));
        case amplitudeAxisY[0]: // amplitude
          return values;
        case amplitudeAxisY[1]: // db
          return values.map((item: number) => calculateDB(item));
        case amplitudeAxisY[2]: // log
          return values.map((item: number) => calculateLog(item));
        default:
          return 0;
      }
    
  }

  function selector(real: string) {
    switch (settingAmplitudeReal(real)) {
      case amplitudeReal[0]:
        setRealDisabled(true);
        return 'component';
      case amplitudeReal[1]:
        setRealDisabled(false);
        return 'data';
      case phaseImaginary[0]:
        setImagDisabled(true);
        return 'component';
      case phaseImaginary[1]:
        setImagDisabled(false);
        return 'data';
      default:
        return 0;
    }
  }

  function getBaseData(inData: array, polarisation: string, amplitude: boolean, real: string) {

    const selection = selector(real)

    const tmp = inData
    .filter(dataPayload => dataPayload.polarisation === polarisation)
    .map(dataPayload => ({
      name: dataPayload.baseline,
      data: calculateYData(dataPayload[selection], amplitude, selection)
    }));
    

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

  function getChartData(usedData: any, amplitude: boolean, real: string) {
    const chartData = [];
    if (!legend) {
      return chartData;
    }
    const xValues = calculateChannels(usedData.spectral_window);
    const baseData = getBaseData(usedData.data, polarization, amplitude, real);
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

  const canShow = () => phaseData && phaseData.data && amplitudeData && amplitudeData.data;

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

  function checkForInvalidData(usedData: any, amplitude: boolean, real: string) {
    const xValues = calculateChannels(usedData.spectral_window);
    const y = getBaseData(usedData.data, polarization, amplitude, real);

    const shapes = [];

    for (let i = 0; i < y.length; i++) {
      const line = y[i];
      for (let j = 0; j < line.data.length; j++) {
        const num = line.data[j];
        if (!Number.isFinite(num)) {
          const x0 = xValues[j] - 0.5 * (xValues[1] - xValues[0]);
          const x1 = xValues[j] + 0.5 * (xValues[1] - xValues[0]);
          shapes.push(createRectangle(x0, x1, INVALID_DATA_COLOR));
        }
      }
    }

    function rectangle(item: number[]) {
      shapes.push(createRectangle(item[0], item[1], MISSING_DATA_COLOR));
    }

    // if (missingData) {
    //   missingData.forEach(rectangle);
    // }

    return shapes;
  }

  React.useEffect(() => {
    const firstRender = chartData1 === null;
    if (amplitudeData && phaseData && legend) {
      setChartData1(canShow() ? getChartData(amplitudeData, true, 'Real') : null);
      setChartData2(canShow() ? getChartData(phaseData, false, 'Imaginary') : null);
      setInvalidDataAmplitude(canShow() ? checkForInvalidData(amplitudeData, true, 'Real') : null);
      setInvalidDataPhase(canShow() ? checkForInvalidData(phaseData, false, 'Imaginary') : null);
    }
    if (firstRender) {
      setShowContent(canShow());
    }
  }, [amplitudeData, phaseData, legend, redraw]);

  function setValue(e: typeof QASettings) {
    setSettings(e);
  }

  const chartToggle = (type: boolean, disable: boolean) => (
    <YAxisToggle
      // eslint-disable-next-line react/jsx-no-bind
      setValue={setValue}
      testId={`${settingElement(type)}ButtonTestId`}
      type={type ? 'amplitude' : 'phase'}
      value={settingElement(type)}
      displaySettings={displaySettings}
      disabled={disable}
    />
  );

  const amplitudeRealToggle = (type: string) => (
    <YAxisToggle
      setValue={setValue}
      testId={`${settingElementAmplitudeReal(type)}ButtonTestId`}
      type={type === 'Real' ? 'Real' : 'Imaginary'}
      value={settingElementAmplitudeReal(type)}
      displaySettings={displaySettings}
      disabled={false}
    />
  );

  const phaseImaginaryToggle = (type: string) => (
    <YAxisToggle
      setValue={setValue}
      testId={`${settingElementAmplitudeReal(type)}ButtonTestId`}
      type={type === 'phase' ? 'Phase' : 'Imaginary'}
      value={settingElementAmplitudeReal(type)}
      displaySettings={displaySettings}
      disabled={false}
    />
  );

  return (
    <Grid container direction="row" justifyContent="space-between">
      {canShowChartAmplitude() && (
        <Grid item xs={canShowChartPhase() ? 6 : 12}>
          <SignalCard
            action={chartToggle(true, disableReal)}
            action2={amplitudeRealToggle('Real')}
            title={`${t('label.polarization')} / ${chartTitle(true)} ${polarization}`}
            socketStatus={socketStatus}
            showContent={showContent}
            setShowContent={showToggle}
            showInfoModal="true"
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
                    masked={invalidDataAmplitude}
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
            action={chartToggle(false, disableImag)}
            action2={phaseImaginaryToggle('Imaginary')}
            title={`${t('label.polarization')} / ${chartTitle(false)}  ${polarization}`}
            socketStatus={socketStatus}
            showContent={showContent}
            setShowContent={showToggle}
            showInfoModal="true"
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
                    masked={invalidDataPhase}
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
