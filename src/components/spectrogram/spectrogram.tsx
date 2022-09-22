/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Typography
} from '@mui/material';
import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../libs/decoder';
import SpectrogramPlotTable from '../../libs/spectrogram-plot-table';
import {
  CELL_HEIGHT,
  CELL_WIDTH,
  DATA_API_URL,
  HEIGHT,
  PROTOCOL,
  WIDTH,
  WS_API_URL
} from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.SPECTROGRAMS;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;
const SWITCH_D3_IMAGE_CREATION_ON_OFF = process.env.REACT_APP_SWITCH_D3_IMAGE_CREATION_ON_OFF;

function switchImageCreationOn() {
  return SWITCH_D3_IMAGE_CREATION_ON_OFF === 'on';
}

const Spectrogram = () => {
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [chartData, setChartData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      // DEBUG console.log("SpectrogramsPage: ws onclose");
    };

    ws.onopen = function onOpen() {
      // DEBUG console.log("SpectrogramsPage: ws onopen");
      // ws.send("status: ws open");
    };

    ws.onmessage = function onMessage(msg) {
      const data = msg?.data;
      if (switchImageCreationOn()) {
        try {
          if (data instanceof ArrayBuffer) {
            // DEBUG console.log("SpectrogramsPage: received, type = ArrayBuffer, data = ", data);
          }
          // - Removing Protobuff for now.
          // else if (data instanceof Blob) {
          //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
          //   decodeSpectrogram(data).then((decoded: any) => {
          //     // DEBUG console.log("SpectrogramsPage: received type = Blob, decoded = ", decoded);
          //     window.requestAnimationFrame(() => {
          //       spectrogramPlotTable.draw(decoded.spectrogram);
          //     });
          //   });
          // }
          else {
            const decoded = decodeJson(data);
            // DEBUG console.log( "SpectrogramsPage: received type = string, decoded = ", decoded, );
            if (decoded && decoded.status) {
              setSocketStatus(decoded.status);
            } else {
              // DEBUG console.log("SpectrogramsPage: received type = text, decoded = ", decoded);
              window.requestAnimationFrame(() => {
                spectrogramPlotTable.draw(decoded.spectrogram);
              });
            }
          }
        } catch (e) {
          /* eslint no-console: ["error", { allow: ["error"] }] */
          console.error('SpectrogramsPage: received, decoding error = ', e);
        }
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    async function retrieveChartData() {
      await fetch(`${DATA_API_URL}/stats/baselines`)
        .then((response) => response.json())
        .then((data) => {
          setChartData(data.baselines);
        })
        .catch(() => null);
    }
    connectWebSocket();
    retrieveChartData();
  }, [connectWebSocket]);

  function getImageUrl(item: string) {
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function imageClick(item: string) {
    handleOpen();
    setImageUrl(getImageUrl(item));
  }

  if (switchImageCreationOn()) {
    return (
      <Container>
        <Card variant="outlined" sx={{ minWidth: WIDTH }}>
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
      </Container>
    );
  }
  return (
    <Container sx={{ py: '8px' }}>
      <Modal
        open={open}
        onClose={handleClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}
      >
        <Card variant="outlined" sx={{ minWidth: WIDTH, border: 'none' }}>
          <CardContent style={{ border: 'none' }}>
            <img src={imageUrl} loading="lazy" alt="" />
          </CardContent>
        </Card>
      </Modal>

      <Card variant="outlined" sx={{ minWidth: WIDTH }}>
        <CardHeader
          title="Spectrograms"
          subheader={`Socket: ${socketStatus}, Serialisation: ${PROTOCOL}`}
        />

        <CardContent sx={{ pt: '8px' }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Click on the baseline and polarisation label to see a detailed spectrogram
          </Typography>

          <div id="spectogram-image-list-Id">
            <ImageList sx={{ width: 1150 }} cols={6} rowHeight={164}>
              {chartData && chartData.length ? (
                chartData.map((item) => (
                  <ImageListItem key={item}>
                    <ImageListItemBar title={item} position="top" />
                    <img
                      src={getImageUrl(item)}
                      alt={item}
                      loading="lazy"
                      onClick={() => imageClick(item)}
                      style={{
                        maxWidth: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                  </ImageListItem>
                ))
              ) : (
                <div />
              )}
            </ImageList>
          </div>
          <div id="spectrogramId" />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Spectrogram;
