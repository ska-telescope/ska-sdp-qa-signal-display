import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TimelineIcon from "@mui/icons-material/Timeline";

import { Protocol } from "src/models/protocol";
import { MessageTopic } from "src/models/message-topic";
import { decodeJson, decodeSpectrogram } from "src/libs/decoder";
import { DashboardLayout } from "src/components/dashboard-layout/dashboard-layout";

import SpectrogramPlotTable from "src/libs/spectrogram-plot-table";
import { mockSpectrogramsData } from "src/mock/mock-spectrogram-data";

const WIDTH = 1600;
const HEIGHT = 600;
const CELL_WIDTH = 200;
const CELL_HEIGHT = 100;
const PROTOCOL = Protocol.PROTOBUF;
const MESSAGE_TOPIC = MessageTopic.SPECTROGRAMS;
const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const SpectrogramTable = () => {
  const theme = useTheme();
  const [socketStatus, setSocketStatus] = useState("disconnected");

  const connectWebSocket = useCallback(async () => {
    const spectrogramPlotTable = new SpectrogramPlotTable(
      "divId",
      WIDTH,
      HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT,
    );
    // test plot with mock data
    spectrogramPlotTable.draw(mockSpectrogramsData.spectrogram);

    // prettier-ignore
    console.log(`SpectrogramPage: connecting to WS_API = ${WS_API}`);

    // socket
    const ws = new WebSocket(WS_API);

    ws.onerror = function (e) {
      console.error("SpectrogramPage: ws onerror, error = ", e);
    };

    ws.onclose = function () {
      console.log("SpectrogramPage: ws onclose");
    };

    ws.onopen = function () {
      console.log("SpectrogramPage: ws onopen");
      // ws.send("status: ws open");
    };

    ws.onmessage = function (msg) {
      let data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          // prettier-ignore
          console.log("SpectrogramPage: received, type = ArrayBuffer, data = ", data);
        } else if (data instanceof Blob) {
          decodeSpectrogram(data).then((decoded: any) => {
            // prettier-ignore
            console.log("SpectrogramPage: received type = Blob, decoded = ", decoded);
            window.requestAnimationFrame(() => {
              spectrogramPlotTable.draw(decoded.spectrogram);
            });
          });
        } else {
          const decoded = decodeJson(data);
          // prettier-ignore
          // console.log( "SpectrogramPage: received type = string, decoded = ", decoded, );
          if (decoded && decoded.status) {
            setSocketStatus(decoded.status);
          } else {
            // prettier-ignore
            console.log("SpectrogramPage: received type = text, decoded = ", decoded);
            window.requestAnimationFrame(() => {
              spectrogramPlotTable.draw(decoded.spectrogram);
            });
          }
        }
      } catch (e) {
        console.error("SpectrogramPage: received, decoding error = ", e);
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
            position: "fixed",
            overflow: "visible",
            bottom: 0,
            left: { xs: 0, md: 280 },
            top: 60,
            right: 0,
          }}
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ minWidth: WIDTH }}>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <TimelineIcon />
                      </Avatar>
                    }
                    title="Spectrograms"
                    subheader={`Socket: ${socketStatus}, Serialisation: ${PROTOCOL}`}
                  />

                  <CardContent sx={{ pt: "8px" }}>
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
