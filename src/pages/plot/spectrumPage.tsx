import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  useTheme
} from "@mui/material";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TimelineIcon from "@mui/icons-material/Timeline";

import { Protocol } from "src/models/protocol";
import { MessageTopic } from "src/models/message-topic";
import { decodeJson, decodeSpectrum } from "src/libs/decoder";
import { DashboardLayout } from "src/components/dashboard-layout/dashboard-layout";
import { SpectrumPlotSvg } from "src/libs/spectrum-plot-svg";
// import { SpectrumPlotCanvas } from "src/libs/spectrum-plot-canvas";
// import { mockSpectrumData } from "src/mock/mock-spectrum-data";

const WIDTH = 1200;
const HEIGHT = 600;
const PROTOCOL = Protocol.PROTOBUF;
const MESSAGE_TOPIC = MessageTopic.SPECTRUM;
const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const SpectrumPage = () => {
  const theme = useTheme();
  const [socketStatus, setSocketStatus] = useState("disconnected");

  const connectToWebSocket = useCallback(async () => {
    //
    // spectrum plot: SVG implementation
    //
    const spectrumPlot = new SpectrumPlotSvg("#divId", WIDTH, HEIGHT);

    //
    // spectrum plot: canvas implementation (incomplete)
    //
    // const spectrumPlot = new SpectrumPlotCanvas({
    //   canvasId: "canvasId",
    //   unitsPerTickX: 1000,
    //   unitsPerTickY: 2,
    // });

    // test plot with mock data
    // spectrumPlot.draw(mockSpectrumData);

    // DEBUG console.log(`SpectrumPage: connecting to WS_API = ${WS_API}`);

    // socket

    const ws = new WebSocket(WS_API);

    ws.onerror = function oneError(e) {
      console.error("SpectrumPage: ws onerror, error = ", e);
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
        console.error("SpectrumPage: received, decoding error = ", e);
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
    <>
      <Head>
        <title>Spectrum Plot</title>
      </Head>
      <DashboardLayout>
        <Box
          sx={{
            position: "fixed",
            overflow: "visible",
            bottom: 0,
            left: { xs: 0, md: 280 },
            top: 60,
            right: 0
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
                    title="Spectrum Plot"
                    subheader={`Socket: ${socketStatus}, Serialisation: ${PROTOCOL}`}
                  />

                  <CardContent sx={{ pt: "8px" }}>
                    <div id="divId" />
                    {/* <canvas
                      id="canvasId"
                      width={WIDTH}
                      height={HEIGHT}
                      style={{
                        outline: "gray 1px solid",
                        backgroundColor: "white",
                      }}
                    ></canvas> */}
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

export default SpectrumPage;
