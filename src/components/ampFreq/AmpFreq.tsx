/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from 'react';
import SignalCard from '../signalCard/SignalCard';

import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../libs/decoder';
import { SpectrumPlotSvg } from '../../libs/spectrum-plot-svg';

import { HEIGHT, PROTOCOL, WIDTH, WS_API_URL } from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.SPECTRUM;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const AmpFreq = () => {
  const [socketStatus, setSocketStatus] = useState('unknown');

  const cardTitle = () => { 
    return `Socket: ${  socketStatus  }, Serialisation: ${  PROTOCOL}`;
  }

  const connectToWebSocket = useCallback(async () => {
    const spectrumPlot = new SpectrumPlotSvg('#sPlotId', WIDTH, HEIGHT);
    const ws = new WebSocket(WS_API);

    ws.onerror = function oneError(e) {
      console.error('AmpFreq: ws onerror, error = ', e);
    };

    ws.onmessage = function onMessage(msg) {
      const data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          // DEBUG console.log("SpectrumPage: received, type = ArrayBuffer, data = ", data);
        }
        // - Removing Protobuff for now.
        //  else if (data instanceof Blob) {
        //   decodeSpectrum(data).then((decoded: object) => {
        //     // DEBUG console.log("SpectrumPage: received type = Blob, decoded = ", decoded);
        //     window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
        //   });
        // }
        else {
          const decoded = decodeJson(data);
          if (decoded && decoded.status) {
            setSocketStatus(decoded.status);
          } else {
            window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
          }
        }
      } catch (e) {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error('SpectrumPage: received, decoding error = ', e);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    connectToWebSocket();
  }, [connectToWebSocket]);

  return (
    <SignalCard
      title="Amplitude vs Frequency"
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
    >
      <div id="sPlotId" data-testid="sPlotId" />
    </SignalCard>
  );
};
export default AmpFreq;
