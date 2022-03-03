import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimelineIcon from '@mui/icons-material/Timeline';
import Head from 'next/head';

import { DashboardLayout } from "src/components/dashboard-layout/dashboard-layout";
import Spectrum from "../../components/plots/Spectrum";
import mockSpectrumDataPayload from "../../mock/mockSpectrumData";

const WS_API = `${process.env.NEXT_PUBLIC_WS_API}/spectrum`;

const SpectrumPage = () => {
  console.log("SpectrumPage:");
  const [data, setData] = useState([]); // mockSpectrumDataPayload.body
  const [socketStatus, setSocketStatus] = useState(Date().toLocaleString());
  
  useEffect(() => {
    console.log("spectrum: useEffect1:")
    const ws = new WebSocket(WS_API);

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      console.log("spectrum: onMessage: received payload = ", payload);
  
      if ("status" in payload) {
        console.log(payload.status);
        setSocketStatus(payload.status);
      }
  
      if ("body" in payload) {
        setData(payload.body);
        setSocketStatus(payload.timestamp);
      }
    };

    return () => {
      // TODO
      // ws.close();
    };
  }, []);

  useEffect(() => {
    console.log("spectrum: useEffect2");
  }, [data, socketStatus]);


  return (
    <>
      <Head>
        <title>
          Spectrum Plot
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
                      <TimelineIcon />
                    </Avatar>
                  }
                  title="Spectrum Plot"
                  subheader={socketStatus}
                />

                <CardContent sx={{ pt: "8px" }}>
                  <Spectrum width={1000} height={500} data={data} />
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
