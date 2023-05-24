/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SignalCard  from '../signalCard/SignalCard';
import LineChart from '../d3/lineChart/LineChart';

import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../utils/decoder';
import { storageObject } from '../../services/stateStorage';
import LocalData from '../../mockData/webSocket/spectrum.json';

import { DATA_LOCAL, PROTOCOL, WS_API_URL } from '../../utils/constants';

interface SpectrumPlotProps {
  resize: number;
  socketStatus: string; 
  data: object;
}

const SpectrumPlot = ({ resize, socketStatus, data }: SpectrumPlotProps) => {
  const { t } = useTranslation();

  const [oldSocketStatus, setOldSocketStatus] = React.useState('unknown');
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();
  const sPlotRef = React.useRef(null);

  function xLabel() {
    return `${t('label.frequency')} (${t('units.frequency')})`;
  }

  const yLabel = () => { 
    return `${t('label.amplitude')}`;
  }

  const cardTitle = () => { 
    return `${t('label.socket')}: ${  oldSocketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  const getChart = (id: string) => {
    return new LineChart(id, '', xLabel(), yLabel(), darkMode);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const connectToWebSocket = React.useCallback(async () => {
    const d3Chart = getChart('#sPlotId');
    const ws = new WebSocket(`${WS_API_URL}/${PROTOCOL}_${MessageTopic.SPECTRUM}`);

    ws.onerror = function oneError(e) {
      console.error('SpectrumPlot: ws onerror, error = ', e);
    };

    ws.onmessage = function onMessage(msg) {
      const data = msg?.data;
      try {
        const decoded = decodeJson(data);
        if (decoded && decoded.status) {
          setOldSocketStatus(decoded.status);
        } else {
          window.requestAnimationFrame(() => d3Chart?.draw(getChartData(decoded)));
        }
      } catch (e) {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error('spectrumPlot: received, decoding error = ', e);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  React.useEffect(() => {
    setShowContent(true);
  }, []);

  React.useEffect(() => {
    if (showContent)
    if (DATA_LOCAL) {
      const d3Chart = getChart('#sPlotId');
      window.requestAnimationFrame(() => d3Chart?.draw(getChartData(LocalData)));
    } else {
      connectToWebSocket();
    }
  }, [showContent]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [darkMode]);

  React.useEffect(() => {
    if (!refresh) 
      setShowContent(true);
    else
      setRefresh(false);
  }, [refresh]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [resize]);

  return (
    <SignalCard
      title={t('label.spectrumPlot')}
      actionTitle={cardTitle()}
      socketStatus={oldSocketStatus}
      showContent={showContent}
      setShowContent={setShowContent}
    >
      <div id="sPlotId" data-testid="sPlotId" ref={sPlotRef} />
    </SignalCard>
  );
};
export default SpectrumPlot;
