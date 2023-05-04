/* eslint-disable import/no-unresolved */
import React from 'react';
import SignalCard  from '../signalCard/SignalCard';
import D3Chart from './D3Chart';

import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../libs/decoder';

import { PROTOCOL, WS_API_URL } from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.SPECTRUM;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const AmpFreq = () => {
  const [socketStatus, setSocketStatus] = React.useState('unknown');
  const [showContent, setShowContent] = React.useState(true);

  const cardTitle = () => { 
    return `Socket: ${  socketStatus  }, Serialisation: ${  PROTOCOL}`;
  }

  const connectToWebSocket = React.useCallback(async () => {
    const d3Chart = new D3Chart('#ampFreqSvg');
    const ws = new WebSocket(WS_API);

    ws.onerror = function oneError(e) {
      console.error('AmpFreq: ws onerror, error = ', e);
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
        console.error('AmpFreq: received, decoding error = ', e);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  React.useEffect(() => {
    if (showContent)
    connectToWebSocket();
  }, [showContent]);

  return (
    <SignalCard
      title="Amplitude vs Frequency"
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={setShowContent}
    >
      <div id="ampFreqSvg" data-testid="ampFreqSvg" />
    </SignalCard>
  );
};
export default AmpFreq;
