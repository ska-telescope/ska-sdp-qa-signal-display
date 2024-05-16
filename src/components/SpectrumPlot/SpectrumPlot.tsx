/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';
import YAxisToggle from '../YAxisToggle/YAxisToggle';
import { COLOR } from '../../utils/constants';
import { calculateChannels, calculateDB } from '../../utils/calculate';
import { amplitudeAxisY, QASettings } from '../Settings/qaSettings';

interface SpectrumPlotProps {
  data: object;
  displaySettings: typeof QASettings;
  polarization: string;
  redraw: boolean;
  resize: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSettings: Function;
  socketStatus: string;
}

const RATIO = 2;

const SpectrumPlot = ({
  data,
  displaySettings,
  polarization,
  redraw,
  resize,
  setSettings,
  socketStatus
}: SpectrumPlotProps) => {
  const { t } = useTranslation('signalDisplay');

  const [chartData, setChartData] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const chartTitle = () => '';

  const settingElement = () => `showSpectrumPlot${polarization}axisY`;
  const setting = () => displaySettings[settingElement()];

  const xLabel = () => `${t('label.frequency')} (${t('units.frequency')})`;

  const yLabel = () => `${t('label.amplitude')} (${t(`units.${setting()}`)})`;

  const canShow = () => data !== null;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  function parentWidth() {
    // TODO : Make this responsive
    if (displaySettings.gridView) {
      return 700;
    }
    return 1400;
  }

  function calculateYData(inData: any) {
    switch (setting()) {
      case amplitudeAxisY[0]: // amplitude
        return inData;
      case amplitudeAxisY[1]: // db
        return inData.map((item: number) => calculateDB(item));
      case amplitudeAxisY[2]: // log
        return inData.map((item: number) => Math.log10(item));
      default:
        return 0;
    }
  }

  function getYData(inData: any, polar: string) {
    return calculateYData(
      inData.filter(spectrumPayload => spectrumPayload.polarisation == polar)[0].power
    );
  }
  function getChartData(usedData: any) {
    const xValues = calculateChannels(usedData.spectral_window);
    const chartDataTmp = [
      {
        x: xValues,
        y: getYData(usedData.data, polarization),
        marker: {
          color: COLOR[2]
        }
      }
    ];
    return chartDataTmp;
  }

  function canShowChart() {
    switch (polarization) {
      case 'XX':
        return displaySettings.showSpectrumPlotXX;
      case 'XY':
        return displaySettings.showSpectrumPlotXY;
      case 'YX':
        return displaySettings.showSpectrumPlotYX;
      case 'YY':
        return displaySettings.showSpectrumPlotYY;
      default:
        return false;
    }
  }

  React.useEffect(() => {
    const firstRender = chartData === null;
    if (data) {
      setChartData(getChartData(data));
    }
    if (firstRender) {
      setShowContent(canShow());
    }
  }, [data, redraw]);

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

  function setValue(e: typeof QASettings) {
    setSettings(e);
  }

  const chartToggle = () => (
    <YAxisToggle
      // eslint-disable-next-line react/jsx-no-bind
      setValue={setValue}
      testId={`${settingElement()}ButtonTestId`}
      type="amplitude"
      value={settingElement()}
      displaySettings={displaySettings}
    />
  );

  return (
    <>
      {canShowChart() && (
        <SignalCard
          action={chartToggle()}
          data-testid="signalCardId"
          title={`${t('label.spectrumPlot')} ${polarization}`}
          socketStatus={socketStatus}
          showContent={showContent}
          setShowContent={showToggle}
          showInfoModal="true"
          infoTitle={t('modalInfo.spectrumPlot.title')}
          infoContent={t('modalInfo.spectrumPlot.content')}
          infoSite={t('modalInfo.spectrumPlot.site')}
        >
          <Plotly
            darkMode={darkMode}
            data={showContent ? chartData : null}
            height={parentWidth() / RATIO}
            title={chartTitle()}
            width={parentWidth()}
            xLabel={xLabel()}
            yLabel={yLabel()}
          />
        </SignalCard>
      )}
    </>
  );
};
export default SpectrumPlot;
