/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Plot from 'react-plotly.js';

import SignalCard from '../SignalCard/SignalCard';
import { storageObject } from '../../services/stateStorage';
import { COLOR, PROTOCOL } from '../../utils/constants';

interface SpectrumPlotProps {
  resize: number;
  socketStatus: string;
  data: object;
}

const RATIO = 2;

const SpectrumPlot = ({ resize, socketStatus, data }: SpectrumPlotProps) => {
  const { t } = useTranslation();

  const [chartData, setChartData] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const cardTitle = () =>
    `${t('label.socket')}: ${socketStatus}, ${t('label.serialisation')}: ${PROTOCOL}`;

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

  function getChartData(usedData: any) {
    if (!usedData.channels) {
      return [];
    }
    const chartDataTmp = [
      {
        x: usedData.channels,
        y: usedData.power,
        marker: {
          color: COLOR[0]
        }
      }
    ];
    return chartDataTmp;
  }

  React.useEffect(() => {
    if (data) {
      setChartData(getChartData(data));
    }
    setShowContent(canShow());
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
    <SignalCard
      data-testid="signalCardId"
      title={t('label.spectrumPlot')}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={showToggle}
    >
      <Plot
        data={chartData}
        layout={{
          autosize: false,
          title: chartTitle(),
          plot_bgcolor: darkMode ? 'black' : 'white',
          paper_bgcolor: darkMode ? 'black' : 'white',
          width: parentWidth(),
          height: parentWidth() / RATIO,
          xaxis: {
            title: xLabel(),
            color: darkMode ? 'white' : 'black',
            automargin: true
          },
          yaxis: {
            title: yLabel(),
            color: darkMode ? 'white' : 'black',
            automargin: true
          }
        }}
      />
    </SignalCard>
  );
};
export default SpectrumPlot;
