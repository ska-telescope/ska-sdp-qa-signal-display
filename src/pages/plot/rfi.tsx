import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import Head from "next/head";

import { Protocol } from "src/models/protocol";
import { MessageTopic } from "src/models/message-topic";
import { decodeJson } from "src/libs/decoder";
import { DashboardLayout } from "src/components/dashboard-layout/dashboard-layout";
import { RfiQaPixelTable } from "src/libs/rfi-qa-pixel-table";
import { RfiDetailPlots } from "src/libs/rfi-detail-plots";

const WIDTH = 1600;
const PROTOCOL = Protocol.JSON;
const MESSAGE_TOPIC = MessageTopic.RFI;
const RFI_SUBTOPIC = "xx-00-01";
const RFI_API = `${process.env.NEXT_PUBLIC_WS_API}/${PROTOCOL}_${MESSAGE_TOPIC}`;
const RFI_DETAILS_API = `${process.env.NEXT_PUBLIC_WS_API}/${PROTOCOL}_${MESSAGE_TOPIC}_${RFI_SUBTOPIC}`;

const Rfi = () => {
  const theme = useTheme();

  const [data, setData] = useState(null);
  const [socketStatus, setSocketStatus] = useState(Date().toLocaleString());

  useEffect(() => {
    const rfiQaPixelTable = new RfiQaPixelTable("rfi-table-id", WIDTH);
    const rfiDetailPlots = new RfiDetailPlots("rfi-details-id", WIDTH);

    const rfiWs = new WebSocket(RFI_API);
    const rfiDetailsWs = new WebSocket(RFI_DETAILS_API);
    // prettier-ignore
    console.log(`RfiPage: connecting to RFI_SUMMARY_API = ${RFI_API}, RFI_DETAILS_API = ${RFI_DETAILS_API}`);

    rfiWs.onmessage = (event) => {
      const payload = decodeJson(event.data);
      console.log("Rfi:onMessage: rfiWs received payload = ", payload);

      if ("status" in payload) {
        console.log(payload.status);
        setSocketStatus(payload.status);
      }

      if ("body" in payload) {
        setData(payload.body);
        rfiQaPixelTable.draw(payload.body);
      }
    };

    rfiDetailsWs.onmessage = (event) => {
      const payload = decodeJson(event.data);
      console.log("Rfi:onMessage: rfiDetailsWs received payload = ", payload);

      if ("status" in payload) {
        console.log(payload.status);
        setSocketStatus(payload.status);
      }

      if ("body" in payload) {
        setData(payload.body);
        rfiDetailPlots.draw(payload.body);
      }
    };

    return () => {
      rfiDetailsWs.close();
      rfiWs.close();
    };
  }, []);

  return (
    <>
      <Head>
        <title>RFI Quality</title>
      </Head>

      <DashboardLayout>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 8,
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
                        <SignalCellularAltIcon />
                      </Avatar>
                    }
                    title="RFI"
                    subheader={`Socket: ${socketStatus}`}
                  />

                  <CardContent sx={{ pt: "8px" }}>
                    <div id="rfi-table-id"></div>
                  </CardContent>
                </Card>

                <Card sx={{ minWidth: WIDTH }}>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <SignalCellularAltIcon />
                      </Avatar>
                    }
                    title={`RFI: ${RFI_SUBTOPIC}`}
                    subheader={`Socket: ${socketStatus}`}
                  />

                  <CardContent sx={{ pt: "8px" }}>
                    <div id="rfi-details-id"></div>
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

export default Rfi;
