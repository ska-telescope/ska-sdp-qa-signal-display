/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';

import SignalCard  from '../signalCard/SignalCard';
import LineChart from '../d3/lineChart/LineChart';
import { storageObject } from '../../services/stateStorage';
import { PROTOCOL } from '../../utils/constants';

interface SpectrumPlotProps {
  resize: number;
  socketStatus: string; 
  data: object;
}

const SpectrumPlot = ({ resize, socketStatus, data }: SpectrumPlotProps) => {
  const { t } = useTranslation();

  const [showContent, setShowContent] = React.useState(false);
  const [d3Chart0, setD3Chart0] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();
  const divId0 = "sPlotSvg";

  const sPlotRef = React.useRef(null);

  function xLabel() {
    return `${t('label.frequency')} (${t('units.frequency')})`;
  }

  const yLabel = () => { 
    return `${t('label.amplitude')}`;
  }

  const cardTitle = () => { 
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  const chartTitle = () => {
    return '';
  }

  const getChart = (id: string) => {
    return new LineChart(id, chartTitle(), xLabel(), yLabel(), darkMode);
  }

  function getChartData(usedData: any) {
    const chartData = {
      x_min: Math.min(...usedData.channels),
      x_max: Math.max(...usedData.channels),
      y_min: Math.min(...usedData.power),
      y_max: Math.round(Math.max(...usedData.power) + 1),
      xData: usedData.channels,
      yData: Array(usedData.power)
    }
    return chartData;
  }

  const canShow = () => { 
    return data !== null;
  }

  const showToggle = () => { 
    setShowContent(showContent ? false : canShow());
  }

  React.useEffect(() => {
    setShowContent(canShow());
  }, [data]);

  React.useEffect(() => {
    setD3Chart0(showContent ? getChart(`#${divId0}`) : null);
  }, [showContent]);

  React.useEffect(() => {      
    if (showContent && data && d3Chart0) {
      window.requestAnimationFrame(() => d3Chart0.draw(getChartData(data)));
    }
  }, [data, d3Chart0]);

  React.useEffect(() => {
    if (!refresh) 
      setShowContent(canShow());
    else
      setRefresh(false);
  }, [refresh]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [resize]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [darkMode]);

  return (
    <SignalCard
      title={t('label.spectrumPlot')}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={showToggle}
    >
      <div id={divId0} data-testid={divId0} ref={sPlotRef} />
    </SignalCard>
  );
};
export default SpectrumPlot;
