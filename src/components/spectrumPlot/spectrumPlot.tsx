/* eslint-disable import/no-unresolved */
import React from 'react';
import SignalCard  from '../signalCard/SignalCard';
import D3LineChart from '../d3/lineChart/D3LineChart';

import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../libs/decoder';

import { PROTOCOL, WS_API_URL } from '../../utils/constants';

const X_LABEL = 'Frequency (MHz)';
const Y_LABEL = 'Power (dB)';
const MESSAGE_TOPIC = MessageTopic.SPECTRUM;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const SpectrumPlot = () => {
  const [socketStatus, setSocketStatus] = React.useState('unknown');
  const [showContent, setShowContent] = React.useState(false);

  const cardTitle = () => { 
    return `Socket: ${  socketStatus  }, Serialisation: ${  PROTOCOL}`;
  }

  const connectToWebSocket = React.useCallback(async () => {
    const d3Chart = new D3LineChart('#sPlotId', X_LABEL, Y_LABEL);
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
          window.requestAnimationFrame(() => d3Chart?.draw(decoded));
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
      title="Spectrum Plot"
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
