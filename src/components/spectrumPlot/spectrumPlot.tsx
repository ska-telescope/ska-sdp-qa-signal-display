/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SignalCard  from '../signalCard/SignalCard';
import D3LineChart from '../d3/lineChart/D3LineChart';

import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../utils/decoder';
import { storageObject } from '../../services/stateStorage';
import LocalData from '../../mockData/webSocket/spectrum.json';

import { DATA_LOCAL, PROTOCOL, WS_API_URL } from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.SPECTRUM;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const SpectrumPlot = () => {
  const { t } = useTranslation();

  const [socketStatus, setSocketStatus] = React.useState('unknown');
  const [showContent, setShowContent] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const xLabel = () => { 
    return `${t('label.frequency')} (${t('units.frequency')})`;
  }

  const yLabel = () => { 
    return `${t('label.power')} (${t('units.power')})`;
  }

  const cardTitle = () => { 
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
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
    const d3Chart = new D3LineChart('#sPlotId', '', xLabel(), yLabel(), darkMode);
    const ws = new WebSocket(WS_API);

    ws.onerror = function oneError(e) {
      console.error('SpectrumPlot: ws onerror, error = ', e);
    };

    ws.onmessage = function onMessage(msg) {
      const data = msg?.data;
      try {
        const decoded = decodeJson(data);
        if (decoded && decoded.status) {
          setSocketStatus(decoded.status);
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
      const d3Chart = new D3LineChart('#sPlotId', '', xLabel(), yLabel(), darkMode);
      window.requestAnimationFrame(() => d3Chart?.draw(getChartData(LocalData)));
    } else {
      connectToWebSocket();
    }
  }, [showContent]);

  return (
    <SignalCard
      title={t('label.spectrumPlot')}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={setShowContent}
    >
      <div id="sPlotId" data-testid="sPlotId" />
    </SignalCard>
  );
};
export default SpectrumPlot;
