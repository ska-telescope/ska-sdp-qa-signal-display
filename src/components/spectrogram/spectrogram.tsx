/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, 
  Card,
  CardContent,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal
} from '@mui/material';
import SignalCard from '../signalCard/SignalCard';
import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../libs/decoder';
import SpectrogramPlotTable from '../../libs/spectrogram-plot-table';
import {
  CELL_HEIGHT,
  CELL_WIDTH,
  DATA_API_URL,
  HEIGHT,
  PROTOCOL,
  ROW_HEIGHT,
  WIDTH,
  WS_API_URL
} from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.SPECTROGRAMS;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;
const SWITCH_D3_IMAGE_CREATION_ON_OFF = process.env.REACT_APP_SWITCH_D3_IMAGE_CREATION_ON_OFF;
const SUBHEADER = "Click on the baseline and polarisation label to see a detailed spectrogram";

function switchImageCreationOn() {
  return SWITCH_D3_IMAGE_CREATION_ON_OFF === 'on';
}

const Spectrogram = () => {
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [chartData, setChartData] = useState(null);

  const cardTitle = () => { 
    return `Socket: ${  socketStatus  }, Serialisation: ${  PROTOCOL}`;
  }

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
    const abortController = new AbortController();
    async function retrieveChartData() {
      await fetch(`${DATA_API_URL}/stats/processing_block/blocks/latest/baselines`, {
          signal: abortController.signal
        })
        .then((response) => response.json())
        .then((data) => {
          setChartData(data.baselines);
        })
        .catch(() => null);
    }
    connectWebSocket();
    retrieveChartData();
    return () => {
      abortController.abort();
    }
  }, [connectWebSocket]);

  function getFullImageUrl(item: string) {
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectograms/full_image/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function getThumbnailImageUrl(item: string){
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectograms/thumbnail/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function imageClick(item: string) {
    handleOpen();
    setImageUrl(getFullImageUrl(item));
  }

  if (switchImageCreationOn()) {
    return (
      <SignalCard
        subHeader={SUBHEADER}
        title="Spectrograms"
        actionTitle={cardTitle()}
        socketStatus={socketStatus}
      >
        <div id="spectrogramId" />
      </SignalCard>
    );
  }
  return (
    <Box>
      <Modal
        data-testid='ClickedImage'
        open={open}
        onClose={handleClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card variant="outlined" className="removeBorder:focus">
          <CardContent>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs='auto'>
                <img src={imageUrl} loading="lazy" alt="" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>

      <SignalCard
        subHeader="Click on the baseline and polarisation label to see a detailed spectrogram"
        title="Spectrograms"
        actionTitle={cardTitle()}
        socketStatus={socketStatus}
      >
        <>
          <div id="spectogram-image-list-Id" data-testid="spectogram-image-list-Id">
            {chartData && chartData.length  && (
              <ImageList sx={{ width: 1150 }} cols={6} rowHeight={ROW_HEIGHT}>
                {
                  chartData.map((item) => (
                    <ImageListItem key={item}>
                      <ImageListItemBar title={item} position="top" />
                      <img
                        src={getThumbnailImageUrl(item)}
                        alt={item}
                        loading="lazy"
                        onClick={() => imageClick(item)}
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      />
                    </ImageListItem>
                  ))
                }
              </ImageList>
            )}
          </div>
          <div id="spectrogramId" />
        </>
      </SignalCard>
    </Box>
  );
};

export default Spectrogram;
