import { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import Head from "next/head";
import { useRouter } from "next/router";

import { Protocol } from "src/models/protocol";
import { MessageTopic } from "src/models/message-topic";
import { decodeJson, decodeSpectrogram } from "src/libs/decoder";
import { DashboardLayout } from "src/components/dashboard-layout/dashboard-layout";

import SpectrogramPlotTable from "src/libs/spectrogram-plot-table";
import { mockSpectrogramsData } from "src/mock/mock-spectrogram-data";
import { SpectrogramPlot } from "src/libs/spectrogram-plot";

const WIDTH = 1600;
const HEIGHT = 600;
const PROTOCOL = Protocol.PROTOBUF;
const MESSAGE_TOPIC = MessageTopic.SPECTROGRAMS;
const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const SpectrogramPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const idx =
    typeof router.query.idx === "string" ? router.query.idx : undefined;

  const [socketStatus, setSocketStatus] = useState("disconnected");

  const connectWebSocket = useCallback(async () => {
    if (!idx) {
      return;
    }

    const spectrogramPlot = new SpectrogramPlot("canvasId");
    // test spectrogram with mock data
    for (let d of mockSpectrogramsData.spectrogram) {
      spectrogramPlot.draw(d.phase);
    }

    // prettier-ignore
    console.log(`SpectrogramPage: connecting to WS_API = ${WS_API}, idx = ${idx}`);

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
            // console.log("SpectrogramPage: received type = Blob, decoded = ", decoded);
            window.requestAnimationFrame(() => {
              // single spectrogram plot
              spectrogramPlot.draw(decoded.spectrogram[idx].phase);
            });
          });
        } else {
          const decoded = decodeJson(data);
          if (decoded && decoded.status) {
            setSocketStatus(decoded.status);
          } else {
            // console.log("SpectrogramPage: received type = text, decoded = ", decoded);
            // window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
          }
        }
      } catch (e) {
        console.error("SpectrogramPage: received, decoding error = ", e);
      }
    };

    return () => {
      ws.close();
    };
  }, [idx]);

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  return (
    <>
      <Head>
        <title>Spectrogram</title>
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
                <Card sx={{ minWidth: WIDTH + 100 }}>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <WaterfallChartIcon />
                      </Avatar>
                    }
                    title="Spectrograms"
                    subheader={`Socket: ${socketStatus}, Serialisation: ${PROTOCOL}`}
                  />

                  <CardContent sx={{ pt: "8px" }}>
                    <canvas
                      id="canvasId"
                      width={WIDTH}
                      height={HEIGHT}
                      style={{
                        outline: "gray 1px solid",
                        // border: "2px solid steelblue",
                        backgroundColor: "white",
                      }}
                    ></canvas>
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

export default SpectrogramPage;
