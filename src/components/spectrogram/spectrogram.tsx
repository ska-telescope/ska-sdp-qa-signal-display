/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { Protocol } from '../../models/protocol';
import { MessageTopic } from '../../models/message-topic';
import { decodeJson, decodeSpectrogram } from '../../libs/decoder';
import SpectrogramPlotTable from './spectrogram-plot-table';

const WIDTH = 1200;
const HEIGHT = 300;
const CELL_WIDTH = 150;
const CELL_HEIGHT = 75;
const PROTOCOL = (process.env.REACT_APP_MESSAGE_TYPE === "protobuf") ? Protocol.PROTOBUF : Protocol.JSON;
const MESSAGE_TOPIC = MessageTopic.SPECTROGRAMS;
const WS_API = `${process.env.REACT_APP_WS_API}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const Spectrogram = () => {
  const [socketStatus, setSocketStatus] = useState('disconnected');

  const connectWebSocket = useCallback(async () => {
    const spectrogramPlotTable = new SpectrogramPlotTable(
      'spectrogramId',
      WIDTH,
      HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT
    );

    const ws = new WebSocket(WS_API);

    ws.onerror = function onError(e) {
      /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error('SpectrogramsPage: ws onerror, error = ', e);
    };

    ws.onclose = function onClose() {
      console.log("SpectrogramsPage: ws onclose");
    };

    ws.onopen = function onOpen() {
      console.log("SpectrogramsPage: ws onopen");
      // ws.send("status: ws open");
    };

    ws.onmessage = function onMessage(msg) {
      const data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          console.log("SpectrogramsPage: received, type = ArrayBuffer, data = ", data);
        } else if (data instanceof Blob) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          decodeSpectrogram(data).then((decoded: any) => {
            console.log("SpectrogramsPage: received type = Blob, decoded = ", decoded);
            window.requestAnimationFrame(() => {
              spectrogramPlotTable.draw(decoded.spectrogram);
            });
          });
        } else {
          const decoded = decodeJson(data);
          console.log( "SpectrogramsPage: received type = string, decoded = ", decoded, );
          if (decoded && decoded.status) {
            setSocketStatus(decoded.status);
          } else {
            console.log("SpectrogramsPage: received type = text, decoded = ", decoded);
            window.requestAnimationFrame(() => {
              spectrogramPlotTable.draw(decoded.spectrogram);
            });
          }
        }
      } catch (e) {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error('SpectrogramsPage: received, decoding error = ', e);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card color="primary" variant="outlined" sx={{ minWidth: WIDTH }}>
            <CardHeader
              title="Spectrograms"
              subheader={`Socket: ${socketStatus}, Serialisation: ${PROTOCOL}`}
            />

            <CardContent sx={{ pt: '8px' }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Click on the baseline and polarisation label to see a detailed spectrogram
              </Typography>

              <div id="spectrogramId" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Spectrogram;
