/* eslint-disable import/no-unresolved */
import React from 'react';
import SignalCard from '../signalCard/SignalCard';

import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../libs/decoder';
import { SpectrumPlotSvg } from '../../libs/spectrum-plot-svg';

import { HEIGHT, PROTOCOL, WIDTH, WS_API_URL } from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.SPECTRUM;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const SpectrumPlot = () => {
  const [socketStatus, setSocketStatus] = React.useState('unknown');

  const cardTitle = () => { 
    return `Socket: ${  socketStatus  }, Serialisation: ${  PROTOCOL}`;
  }

  const connectToWebSocket = React.useCallback(async () => {
    const spectrumPlot = new SpectrumPlotSvg('#sPlotId', WIDTH, HEIGHT);
    const ws = new WebSocket(WS_API);

    ws.onerror = function oneError(e) {
      /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error('SpectrumPage: ws onerror, error = ', e);
    };

    ws.onclose = function onClose() {
      // DEBUG console.log("SpectrumPage: ws onclose");
    };

    ws.onopen = function onOpen() {
      // DEBUG console.log("SpectrumPage: ws onopen");
      // ws.send("status: ws open");
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
            // DEBUG console.log("SpectrumPage: received type = text, decoded = ", decoded);
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

  React.useEffect(() => {
    connectToWebSocket();
  }, [connectToWebSocket]);

  return (
    <SignalCard
      title="Spectrum Plot"
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
    >
      <div id="sPlotId" data-testid="sPlotId" />
    </SignalCard>
  );
};
export default SpectrumPlot;
