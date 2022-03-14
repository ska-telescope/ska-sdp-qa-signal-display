import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";
import { decodeJson, decodeSpectrum } from "src/lib/decoder";
import { SpectrumPlotCanvas } from "src/lib/spectrum-plot-canvas";
import { mockSpectrumData } from "public/static/mock/spectrum-mock-data";

const WIDTH = 600;
const HEIGHT = 300;
const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/spectrum-`;

const SpectrumPage = () => {
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

    // SVG
    // spectrumPlot = new SpectrumPlotSvg("#divId");
    // spectrumPlot.draw(mockSpectrumData);

    // Canvas
    const spectrumPlot = new SpectrumPlotCanvas({
      canvasId: "canvasId",
      unitsPerTickX: 1000,
      unitsPerTickY: 2,
    });
    // Test with mock data
    spectrumPlot.draw(mockSpectrumData);

    const wsApi = `${WS_API}${protocol}`;
    // prettier-ignore
    console.log(`SpectrumPage: protocol = ${protocol}, wsApi = ${wsApi}`);

    // socket
    const ws = new WebSocket(wsApi);

    ws.onerror = function (e) {
      console.error("SpectrumPage: ws onerror, error = ", e);
    };

    ws.onclose = function () {
      console.log("SpectrumPage: ws onclose");
    };

    ws.onopen = function () {
      console.log("SpectrumPage: ws onopen");
      // ws.send("status: ws open");
    };

    ws.onmessage = function (msg) {
      let data = msg?.data;

      try {
        if (data instanceof ArrayBuffer) {
          // prettier-ignore
          console.log("SpectrumPage: received, type = ArrayBuffer, data = ", data);
        } else if (data instanceof Blob) {
          decodeSpectrum(data).then((decoded: any) => {
            // prettier-ignore
            // console.log("SpectrumPage: received type = Blob, decoded = ", decoded);
            window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
          });
        } else {
          const decoded = decodeJson(data);
          if (decoded && decoded.status) {
            setSocketStatus(decoded.status);
          } else {
            // console.log("SpectrumPage: received type = text, decoded = ", decoded);
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
  }, [protocol]);

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  return (
    <>
      <Head>
        <title>Spectrum</title>
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
            {"SPECTRUM: Socket: " +
              socketStatus +
              ", Serialisation:" +
              protocol}
          </Typography>
          <div id="divId" />

          <canvas
            id="canvasId"
            width={WIDTH}
            height={HEIGHT}
            style={{ outline: "gray 1px solid", backgroundColor: "white" }}
          ></canvas>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default SpectrumPage;
