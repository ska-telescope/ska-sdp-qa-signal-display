/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SignalCard  from '../signalCard/SignalCard';
import D3LineChart from '../d3/lineChart/D3LineChart';

import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../utils/decoder';
import { storageObject } from '../../services/stateStorage';

import { PROTOCOL, WS_API_URL } from '../../utils/constants';

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
          const chartData = {
            x_min: decoded.x_min,
            x_max: decoded.x_max,
            y_min: decoded.y_min,
            y_max: decoded.y_max,
            xData: decoded.channels,
            yData: Array(decoded.power)
          }
          window.requestAnimationFrame(() => d3Chart?.draw(chartData));
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
    connectToWebSocket();
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
