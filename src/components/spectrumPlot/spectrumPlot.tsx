/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Tooltip } from '@mui/material';
import { Status } from '@ska-telescope/ska-gui-components';

import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../libs/decoder';
import { SpectrumPlotSvg } from '../../libs/spectrum-plot-svg';

import { HEIGHT, PROTOCOL, STATUS_SIZE, WIDTH, WS_API_URL } from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.SPECTRUM;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const SpectrumPlot = () => {
  const [socketStatus, setSocketStatus] = useState('unknown');

  const cardTitle = () => { 
    return `Socket: ${  socketStatus  }, Serialisation: ${  PROTOCOL}`;
  }

  const getSocketStatus = () => {
    switch (socketStatus) {
      case 'connected': return 0;
      case 'unknown' : return 3;
      default : return 1;
    }
  }

  const connectToWebSocket = useCallback(async () => {
    const spectrumPlot = new SpectrumPlotSvg('#sPlotId', WIDTH, HEIGHT);
    const ws = new WebSocket(WS_API);

    ws.onerror = function oneError(e) {
      /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error('SpectrumPage: ws onerror, error = ', e);
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
        }
        // - Removing Protobuff for now.
        //  else if (data instanceof Blob) {
        //   decodeSpectrum(data).then((decoded: object) => {
        //     // DEBUG console.log("SpectrumPage: received type = Blob, decoded = ", decoded);
        //     window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
        //   });
        // }
        else {
          const decoded = decodeJson(data);
          if (decoded && decoded.status) {
            setSocketStatus(decoded.status);
          } else {
            // DEBUG console.log("SpectrumPage: received type = text, decoded = ", decoded);
            window.requestAnimationFrame(() => spectrumPlot?.draw(decoded));
          }
        }
      } catch (e) {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error('SpectrumPage: received, decoding error = ', e);
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
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: WIDTH }}>
        <CardHeader
          title="Spectrum Plot"
          action={(
            <Tooltip title={cardTitle()}>
              <Button>
                <Status level={getSocketStatus()} size={STATUS_SIZE} />
              </Button>
            </Tooltip>
          )}
        />
        <CardContent>
          <div id="sPlotId" data-testid="sPlotId" />
        </CardContent>
      </Card>
    </Box>
  );
};
export default SpectrumPlot;
