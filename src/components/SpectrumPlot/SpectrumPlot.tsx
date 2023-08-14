/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';

import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';
import { storageObject } from '../../services/stateStorage';
import { COLOR } from '../../utils/constants';
import { generateChannels } from '../../utils/generateChannels';

interface SpectrumPlotProps {
  displaySettings: any;
  polarization: string;
  resize: number;
  socketStatus: string;
  data: object;
}

const RATIO = 2;

const SpectrumPlot = ({
  displaySettings,
  polarization,
  resize,
  socketStatus,
  data
}: SpectrumPlotProps) => {
  const { t } = useTranslation('signalDisplay');

  const [chartData, setChartData] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const chartTitle = () => '';

  function xLabel() {
    return `${t('label.frequency')} (${t('units.frequency')})`;
  }

  const yLabel = () => `${t('label.amplitude')}`;

  const canShow = () => data !== null;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  function parentWidth() {
    // TODO : Make this responsive
    return 1400;
  }

  function getYData(inData: any, polar: string) {
    switch (polar) {
      case 'XX':
        return inData.XX.power;
      case 'XY':
        return inData.XY.power;
      case 'YX':
        return inData.YX.power;
      default:
        return inData.YY.power;
    }
  }
  function getChartData(usedData: any) {
    const xValues = generateChannels(usedData.spectral_window);
    const chartDataTmp = [
      {
        x: xValues,
        y: getYData(usedData.polarisations, polarization),
        marker: {
          color: COLOR[0]
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
  }, [data]);

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

  return (
    <>
      {canShowChart() && (
        <SignalCard
          data-testid="signalCardId"
          title={`${t('label.spectrumPlot')} ${polarization}`}
          socketStatus={socketStatus}
          showContent={showContent}
          setShowContent={showToggle}
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
