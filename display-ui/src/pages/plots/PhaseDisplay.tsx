/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
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
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TimelineIcon from "@material-ui/icons/Timeline";

import useSettings from "../../hooks/useSettings";
import mockPhaseData from "../../mock/mockPhaseData";
import SpectrogramTable from "src/components/plots/SpectrogramTable";

const { REACT_APP_WS } = process.env;
const phaseAPI = `${REACT_APP_WS}/consumer/phase`;
const ws = new WebSocket(phaseAPI);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: blue[500],
  },
  icon: {
    fill: blue[500],
  },
}));

const PhaseDisplay: FC = () => {
  const { settings } = useSettings();
  const classes = useStyles();

  console.log("PhaseDisplay: phaseAPI = ", phaseAPI);

  const [data, setData] = useState(null);
  const [socketStatus, setSocketStatus] = useState(Date().toLocaleString());

  useEffect(() => {
    const spectrogramTable = new SpectrogramTable("phase-display-table");

    let i = 1;
    function myLoop() {
      setTimeout(function () {
        // randomly generated N = 100 length array 0 <= A[N] <= 39
        const data1 = {
          baseline: ["XX", "XY"],
          polarisation: ["00", "01", "10"],
          phase_values: [
            [
              Array.from({ length: 100 }, () => Math.floor(Math.random() * 360)),
              Array.from({ length: 100 }, () => Math.floor(Math.random() * 270)),
            ],
            [
              Array.from({ length: 100 }, () => Math.floor(Math.random() * 300)),
              Array.from({ length: 100 }, () => Math.floor(Math.random() * 120)),
            ],
            [
              Array.from({ length: 100 }, () => Math.floor(Math.random() * 180)),
              Array.from({ length: 100 }, () => Math.floor(Math.random() * 90)),
            ],
          ],
        };

        setData(data1);
        setSocketStatus(Date().toLocaleString());
        console.log("data = ", data);

        if (data1) spectrogramTable.draw(data1);

        i++;
        if (i < 10000) {
          myLoop();
        }
      }, 1000);
    }

    myLoop(); //  start the loop
  }, []);

  //  const spectrogramTable = new SpectrogramTable("phase-display-table");

  // const onMessage = (event) => {
  //   const payload = JSON.parse(event.data);
  //   console.log("PhaseDisplay:onMessage: received event.data = ", event.data, typeof event.data);
  //   console.log("PhaseDisplay:onMessage: received event.data = ", payload);

  //   if ("status" in payload) {
  //     console.log(payload.status);
  //     setSocketStatus(payload.status);
  //   }

  //   if ("body" in payload) {
  //     setData(payload.body);
  //     setSocketStatus(payload.timestamp);
  //     spectrogramTable.draw(payload.body);
  //   }
  // };

  // useEffect(() => {
  //   console.log("PhaseDisplay: useEffect: 1");

  //   ws.onmessage = onMessage;

  //   return () => {
  //     // TODO
  //     // ws.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("PhaseDisplay: useEffect: 2");
  //   // console.log("PhaseDisplay: data = ", JSON.stringify(data));
  // }, [data, socketStatus]);

  return (
    <>
      <Helmet>
        <title>Phase Display</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? "xl" : false}>
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
                    <Avatar className={classes.avatar}>
                      <TimelineIcon />
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
    </>
  );
};

export default PhaseDisplay;
