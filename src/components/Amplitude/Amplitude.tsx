/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-bind */
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import AmplitudeData from 'src/services/types/AmplitudeData';
import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';
import YAxisToggle from '../YAxisToggle/YAxisToggle';
import { COLOR } from '../../utils/constants';
import { calculateChannels, calculateDB, calculateLog } from '../../utils/calculate';
import { amplitudeAxisY, amplitudeReal, QASettings } from '../Settings/qaSettings';
import {
  MISSING_DATA_COLOR,
  INVALID_DATA_COLOR,
  createRectangle
} from '../../utils/masksCalculator';

interface AmplitudeProps {
  amplitudeData: AmplitudeData;
  displaySettings: typeof QASettings;
  legend: any;
  polarization: string;
  redraw: boolean;
  resize: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSettings: Function;
  socketStatus: string;
  missingData?: number[][];
}

const RATIO = 2;

const Amplitude = ({
  amplitudeData,
  displaySettings,
  legend,
  polarization,
  redraw,
  resize,
  setSettings,
  socketStatus,
  missingData = null
}: AmplitudeProps) => {
  const { t } = useTranslation('signalDisplay');

  const [disableReal, setDisableReal] = React.useState(true);

  const [chartData1, setChartData1] = React.useState(null);
  const [invalidDataAmplitude, setInvalidDataAmplitude] = React.useState(null);

  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const settingElement = (amplitude: boolean) =>
    `showPolarization${amplitude ? 'Amplitude' : 'Phase'}${polarization}axisY`;

  const settingElementAmplitudeReal = useCallback(
    (real: string) => `showPolarization${real}${polarization}axisY`,
    disableReal
  );

  const setting = (amplitude: boolean) => displaySettings[settingElement(amplitude)];

  const settingAmplitudeReal = (real: string) => displaySettings[settingElementAmplitudeReal(real)];

  const xLabel = () => `${t('label.frequency')} (${t('units.frequency')})`;

  const yLabel = (amplitude: boolean) =>
    `${t('label.amplitude')} (${t(`units.${setting(amplitude)}`)})`;

  const chartTitle = (amplitude: boolean) => t(amplitude ? 'label.amplitude' : 'label.phase');

  function calculateYData(values: any, amplitude: boolean, selection: string) {
    if (selection === 'component') {
      return values;
    }

    switch (setting(amplitude)) {
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
        setDisableReal(true);
        return 'component';
      case amplitudeReal[1]:
        setDisableReal(false);
        return 'data';
      default:
        return 0;
    }
  }

  function getBaseData(inData: array, polarisation: string, amplitude: boolean, real: string) {
    const selection = selector(real);
    return inData
      .filter(dataPayload => dataPayload.polarisation === polarisation)
      .map(({ baseline, [selection]: data }) => ({
        name: baseline,
        data: calculateYData(data, amplitude, selection)
      }))
      .filter((_, i) => !legend || legend[i]?.active);
  }

  const legendMap = React.useMemo(() => {
    const map = new Map();
    legend?.forEach(l => map.set(l.text, l.color));
    return map;
  }, [legend]);

  function getLegendColor(name: string) {
    return legendMap.get(name) || COLOR[0];
  }

  function getChartData(usedData: any, amplitude: boolean, real: string) {
    const xValues = calculateChannels(usedData.spectral_window);
    const baseData = getBaseData(usedData.data, polarization, amplitude, real);
    return baseData.map(({ name, data }) => ({
      x: xValues,
      y: data,
      name,
      marker: { color: getLegendColor(name) },
      line: { shape: 'hvh' },
      type: 'scatter'
    }));
  }

  const canShow = () => amplitudeData && amplitudeData.data;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  const canShowChartAmplitude = () => displaySettings[`showPolarizationAmplitude${polarization}`];
  const parentWidth = () => (canShowChartAmplitude() ? 700 : 1400);

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
      if (line.data) {
        for (let j = 0; j < line.data.length; j++) {
          const num = line.data[j];
          if (!Number.isFinite(num)) {
            const x0 = xValues[j] - 0.5 * (xValues[1] - xValues[0]);
            const x1 = xValues[j] + 0.5 * (xValues[1] - xValues[0]);
            shapes.push(createRectangle(x0, x1, INVALID_DATA_COLOR));
          }
        }
      }
    }
    function addMask(item: number[]) {
      shapes.push(createRectangle(item[0], item[1], MISSING_DATA_COLOR));
    }

    if (missingData) {
      missingData.forEach(addMask);
    }

    return shapes;
  }

  React.useEffect(() => {
    const firstRender = chartData1 === null;
    if (amplitudeData && legend) {
      setChartData1(canShow() ? getChartData(amplitudeData, true, 'Real') : null);
      setInvalidDataAmplitude(canShow() ? checkForInvalidData(amplitudeData, true, 'Real') : null);
    }
    if (firstRender) {
      setShowContent(canShow());
    }
  }, [amplitudeData, legend, redraw]);

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

  return (
    <>
      {canShowChartAmplitude() && (
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
        </SignalCard>
      )}
    </>
  );
};
export default Amplitude;
