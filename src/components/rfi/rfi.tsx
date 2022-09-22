/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Container, Grid } from '@mui/material';

import { MessageTopic } from 'src/models/message-topic';
import { decodeJson } from 'src/libs/decoder';
import RfiQaPixelTable from 'src/libs/rfi-qa-pixel-table';
import RfiDetailPlots from 'src/libs/rfi-detail-plots';

import { PROTOCOL, WIDTH, WS_API_URL } from 'src/utils/constants';

const MESSAGE_TOPIC = MessageTopic.RFI;
const RFI_SUBTOPIC = 'xx-00-01';
const RFI_API = `${process.env.REACT_APP_WS_API}/${PROTOCOL}_${MESSAGE_TOPIC}`;
const RFI_DETAILS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}_${RFI_SUBTOPIC}`;

const Rfi = () => {
  const [socketStatus, setSocketStatus] = useState(Date().toLocaleString());

  useEffect(() => {
    const rfiQaPixelTable = new RfiQaPixelTable('rfi-table-id', WIDTH);
    const rfiDetailPlots = new RfiDetailPlots('rfi-details-id', WIDTH);

    const rfiWs = new WebSocket(RFI_API);
    const rfiDetailsWs = new WebSocket(RFI_DETAILS_API);
    // DEBUG console.log(`RfiPage: connecting to RFI_SUMMARY_API = ${RFI_API}, RFI_DETAILS_API = ${RFI_DETAILS_API}`);

    rfiWs.onmessage = (event) => {
      const payload = decodeJson(event.data);
      // console.log("Rfi:onMessage: rfiWs received payload = ", payload);

      if ('status' in payload) {
        // DEBUG console.log(payload.status);
        setSocketStatus(payload.status);
      }

      if ('body' in payload) {
        rfiQaPixelTable.draw(payload.body);
      }
    };

    rfiDetailsWs.onmessage = (event) => {
      const payload = decodeJson(event.data);
      // console.log("Rfi:onMessage: rfiDetailsWs received payload = ", payload);

      if ('status' in payload) {
        // DEBUG console.log(payload.status);
        setSocketStatus(payload.status);
      }

      if ('body' in payload) {
        rfiDetailPlots.draw(payload.body);
      }
    };

    return () => {
      rfiDetailsWs.close();
      rfiWs.close();
    };
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ minWidth: WIDTH }}>
            <CardHeader title="RFI" subheader={`Socket: ${socketStatus}`} />

            <CardContent sx={{ pt: '8px' }}>
              <div id="rfi-table-id" />
            </CardContent>
          </Card>

          <Card sx={{ minWidth: WIDTH }}>
            <CardHeader title={`RFI: ${RFI_SUBTOPIC}`} subheader={`Socket: ${socketStatus}`} />

            <CardContent sx={{ pt: '8px' }}>
              <div id="rfi-details-id" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Rfi;
