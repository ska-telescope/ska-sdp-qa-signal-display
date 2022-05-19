import { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import Head from 'next/head';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';

import { Protocol } from 'src/models/protocol';
import { MessageTopic } from 'src/models/message-topic';
import { decodeJson, decodeSpectrogram } from 'src/libs/decoder';
import { DashboardLayout } from 'src/components/dashboard-layout/dashboard-layout';
import SpectrogramPlotTable from 'src/libs/spectrogram-plot-table';
// import { mockSpectrogramsData } from "src/mock/mock-spectrogram-data";

const WIDTH = 1200;
const HEIGHT = 600;
const CELL_WIDTH = 150;
const CELL_HEIGHT = 75;
const SIDEBAR_WIDTH = 250;
const PROTOCOL = (process.env.NEXT_PUBLIC_MESSAGE_TYPE === "json") ? Protocol.JSON : Protocol.PROTOBUF;
const MESSAGE_TOPIC = MessageTopic.SPECTROGRAMS;
const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const SpectrogramTable = () => {
  const theme = useTheme();
  const [socketStatus, setSocketStatus] = useState('disconnected');

  const connectWebSocket = useCallback(async () => {
    const spectrogramPlotTable = new SpectrogramPlotTable(
      'divId',
      WIDTH,
      HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT
    );
    // test plot with mock data
    // spectrogramPlotTable.draw(mockSpectrogramsData.spectrogram);

    // prettier-ignore
    console.log(`SpectrogramsPage: connecting to WS_API = ${WS_API}`);

    // DEBUG console.log(`SpectrogramsPage: connecting to WS_API = ${WS_API}`);


    // socket
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

      try {
        if (data instanceof ArrayBuffer) {
          // DEBUG console.log("SpectrogramsPage: received, type = ArrayBuffer, data = ", data);
        } else if (data instanceof Blob) {
          decodeSpectrogram(data).then((decoded: any) => {
            // DEBUG console.log("SpectrogramsPage: received type = Blob, decoded = ", decoded);
            window.requestAnimationFrame(() => {
              spectrogramPlotTable.draw(decoded.spectrogram);
            });
          });
        } else {
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
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  return (
    <>
      <Head>
        <title>Phase Spectrograms</title>
      </Head>
      <DashboardLayout>
        <Box
          sx={{
            position: 'fixed',
            overflow: 'visible',
            bottom: 0,
            left: { xs: 0, md: SIDEBAR_WIDTH },
            top: 5,
            margin: 2,
            right: 0,
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ minWidth: WIDTH }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <WaterfallChartIcon />
                      </Avatar>
                    }
                    title="Spectrograms"
                    subheader={`Socket: ${socketStatus}, Serialisation: ${PROTOCOL}`}
                  />

                  <CardContent sx={{ pt: '8px' }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Click on the baseline and polarisation label to see a detailed spectrogram
                    </Typography>

                    <div id="divId" />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default SpectrogramTable;
