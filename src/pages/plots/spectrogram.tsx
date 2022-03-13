import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";
import { decodeJson, decodeSpectrogram } from "src/lib/decoder";
import { SpectrogramPlot, WaterfallDirection } from "src/lib/spectrogram-plot";
import { spectrogramsMockData } from "public/static/mock/spectrogram-mock-data";

const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/spectrogram-`;
const WIDTH = 2300,
  HEIGHT = 1200;

const SpectrogramPage = () => {
  const [socketStatus, setSocketStatus] = useState("disconnected");
  const router = useRouter();
  const protocol =
    typeof router.query.protocol === "string"
      ? router.query.protocol
      : undefined;

  const connectWebSocket = useCallback(async () => {
    if (!protocol) {
      return;
    }

    const spectrogramPlot = new SpectrogramPlot(
      "canvasId",
      WaterfallDirection.TOP_TO_BOTTOM,
    );
    // Test with mock data
    for (let d of spectrogramsMockData.spectrogram) {
      spectrogramPlot.draw(d.phase);
    }

    const wsApi = `${WS_API}${protocol}`;
    // prettier-ignore
    console.log(`SpectrogramPage: protocol = ${protocol}, wsApi = ${wsApi}`);

    // socket
    const ws = new WebSocket(wsApi);

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
              spectrogramPlot.draw(decoded.spectrogram[0].phase);
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
  }, [protocol]);

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
          <Typography variant="caption" display="block" gutterBottom>
            {"SPECTROGRAM PLOT: Socket: " +
              socketStatus +
              ", Serialisation:" +
              protocol}
          </Typography>

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
        </Box>
      </DashboardLayout>
    </>
  );
};

export default SpectrogramPage;
