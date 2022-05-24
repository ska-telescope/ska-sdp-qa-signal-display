import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Container, Grid } from '@mui/material';

import { Protocol } from 'src/models/protocol';
import { MessageTopic } from 'src/models/message-topic';
import { decodeJson, decodeSpectrum } from 'src/libs/decoder';
import { SpectrumPlotSvg } from 'src/libs/spectrum-plot-svg';

const WIDTH = 1200;
const HEIGHT = 300;
const PROTOCOL = Protocol.PROTOBUF;
const MESSAGE_TOPIC = MessageTopic.SPECTRUM;
const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const SpectrumPlot = () => {
  const [socketStatus, setSocketStatus] = useState('disconnected');

  const connectToWebSocket = useCallback(async () => {

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
        } else if (data instanceof Blob) {
          decodeSpectrum(data).then((decoded: object) => {
            // DEBUG console.log("SpectrumPage: received type = Blob, decoded = ", decoded);
            window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
          });
        } else {
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

  useEffect(() => {
    connectToWebSocket();
  }, [connectToWebSocket]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ minWidth: WIDTH }}>
            <CardHeader
              title="Spectrum Plot"
              subheader={`Socket: ${socketStatus}, Serialisation: ${PROTOCOL}`}
            />
            <CardContent sx={{ pt: '8px' }}>
              <div id="sPlotId" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
export default SpectrumPlot;
