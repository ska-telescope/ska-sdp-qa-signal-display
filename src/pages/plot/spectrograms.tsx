import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WaterfallChart from "@mui/icons-material/WaterfallChart";
import Head from 'next/head';

import { DashboardLayout } from "src/components/dashboard-layout/dashboard-layout";
import SpectrogramTable from "src/components/plots/SpectrogramTable";

const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/phase`;

const Spectrograms = () => {
  console.log("Spectrograms:");
  const [data, setData] = useState(null);
  const [socketStatus, setSocketStatus] = useState(Date().toLocaleString());

  const spectrogramTable = new SpectrogramTable("phase-display-table");

  useEffect(() => {
    console.log("Spectrograms: useEffect1");
    const ws = new WebSocket(WS_API);

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      console.log("Spectrograms:onMessage: received event.data = ", event.data, typeof event.data);
      console.log("Spectrograms:onMessage: received event.data = ", payload);
  
      if ("status" in payload) {
        console.log(payload.status);
        setSocketStatus(payload.status);
      }
  
      if ("body" in payload) {
        setData(payload.body);
        setSocketStatus(payload.timestamp);
        spectrogramTable.draw(payload.body);
      }
    };

    return () => {
      // TODO
      // ws.close();
    };
  }, []);

  useEffect(() => {
    console.log("Spectrograms: useEffect2");
  }, [data, socketStatus]);

  return (
    <>
      <Head>
        <title>
          Phase Spectrograms
        </title>
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
              <Card>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  avatar={
                    <Avatar>
                      <WaterfallChart />
                    </Avatar>
                  }
                  title="Phase Display"
                  subheader={socketStatus}
                />

                <CardContent sx={{ pt: "8px" }}>
                  <div id="phase-display-table"></div>
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

export default Spectrograms;
