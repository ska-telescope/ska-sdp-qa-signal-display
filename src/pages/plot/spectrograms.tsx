import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import DashboardLayout from "src/components/dashboard-layout/DashboardLayout";
import { decodeJson, decodeSpectrogram } from "src/lib/decoder";
import { spectrogramsMockData } from "public/static/mock/spectrogram-mock-data";
import SpectrogramPlotTable from "src/lib/spectrogram-plot-table";

const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/spectrogram-`;

const SpectrogramTable = () => {
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

    const spectrogramPlotTable = new SpectrogramPlotTable("divId");
    spectrogramPlotTable.draw(spectrogramsMockData.spectrogram);

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
        <title>Spectrogram Table</title>
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
            {"SPECTROGRAM (TABLE): Socket: " +
              socketStatus +
              ", Serialisation:" +
              protocol}
          </Typography>
          <div id="divId" />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default SpectrogramTable;
