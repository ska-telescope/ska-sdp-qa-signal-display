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
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import Head from 'next/head';

import { DashboardLayout } from "src/components/dashboard-layout/dashboard-layout";
import { RfiDetailsPlot } from "src/components/plots/RfiDetailsPlot";
import { RfiTable } from "src/components/plots/RfiTable";

const rfiSummaryApi = `${process.env.NEXT_PUBLIC_WS_API}/rfi_summary`;
const rfiDetailsApi = `${process.env.NEXT_PUBLIC_WS_API}/rfi_xx_00_01`;

const Rfi = () => {
  console.log("Rfi:");
  const [data, setData] = useState(null);
  const [socketStatus, setSocketStatus] = useState(Date().toLocaleString());


  useEffect(() => {
    console.log("Rfi: useEffect: 1");

    const rfiTable = new RfiTable("rfi-table");
    const rfiDetailsPlot = new RfiDetailsPlot("rfi-details-plot");
    const rfiSummaryWs = new WebSocket(rfiSummaryApi);
    const rfiDetailsWs = new WebSocket(rfiDetailsApi);

    rfiDetailsWs.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      // console.log("Rfi:onMessage: received payload = ", payload);
  
      if ("status" in payload) {
        console.log(payload.status);
        setSocketStatus(payload.status);
      }
  
      if ("body" in payload) {
        setData(payload.body);
        setSocketStatus(payload.timestamp);
  
        if ("topic" in payload && payload?.topic === "rfi_summary") rfiTable.draw(payload.body);
        if ("topic" in payload && payload?.topic === "rfi_xx_00_01") rfiDetailsPlot.draw(payload.body);
      }
    };

    rfiSummaryWs.onmessage = (event) => {
    const payload = JSON.parse(event.data);
    console.log("Rfi:onMessage: received payload = ", payload);

    if ("status" in payload) {
      console.log(payload.status);
      setSocketStatus(payload.status);
    }

    if ("body" in payload) {
      setData(payload.body);
      setSocketStatus(payload.timestamp);

      if ("topic" in payload && payload?.topic === "rfi_summary") rfiTable.draw(payload.body);
      if ("topic" in payload && payload?.topic === "rfi_xx_00_01") rfiDetailsPlot.draw(payload.body);
    }
  };

    return () => {
      // TODO
      // ws.close();
    };
  });

  // useEffect(() => {
  //   console.log("Rfi: useEffect: 2");
  //   // console.log("Rfi: data = ", JSON.stringify(data));
  // }, [data, socketStatus]);

  return (
    <>
      <Head>
        <title>
          RFI Quality
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
                      <SignalCellularAltIcon />
                    </Avatar>
                  }
                  title="RFI: Summary"
                  subheader={socketStatus}
                />

                <CardContent sx={{ pt: "8px" }}>
                  <div id="rfi-table"></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  avatar={
                    <Avatar>
                      <SignalCellularAltIcon />
                    </Avatar>
                  }
                  title="RFI: (XX, s0000-s0001)"
                  subheader={socketStatus}
                />

                <CardContent sx={{ pt: "8px" }}>
                  <div id="rfi-details-plot"></div>
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
