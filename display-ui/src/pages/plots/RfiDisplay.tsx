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
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import useSettings from "../../hooks/useSettings";
import RfiTable from "src/components/plots/RfiTable";

const { REACT_APP_WS } = process.env;
const rfiApi = `${REACT_APP_WS}/consumer/rfi`;
const ws = new WebSocket(rfiApi);

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

const RfiDisplay: FC = () => {
  const { settings } = useSettings();
  const classes = useStyles();

  console.log("RfiDisplay: rfiApi = ", rfiApi);

  const [data, setData] = useState(null);
  const [socketStatus, setSocketStatus] = useState(Date().toLocaleString());

  const rfiTable = new RfiTable("rfi-display-table");

  //
  // generate random data to test locally
  //

  useEffect(() => {
    let i = 1;
    function myLoop() {
      setTimeout(function () {
        // randomly generated N = 100 length array 0 <= A[N] <= 39
        const data1 = {
          polarisation: ["XX"],
          baseline: ["00"],
          values: [[Array.from({ length: 100 }, () => Math.floor(Math.random() * 360))]],
        };

        setData(data1);
        setSocketStatus(Date().toLocaleString());
        console.log("data = ", data);

        if (data1) rfiTable.draw(data1);

        i++;
        if (i < 10000) {
          myLoop();
        }
      }, 1000);
    }

    myLoop(); //  start the loop
  }, []);

  /*
  const onMessage = (event) => {
    const payload = JSON.parse(event.data);
    console.log("RfiDisplay:onMessage: received event.data = ", event.data, typeof event.data);
    console.log("RfiDisplay:onMessage: received event.data = ", payload);

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

  useEffect(() => {
    console.log("RfiDisplay: useEffect: 1");

    ws.onmessage = onMessage;

    return () => {
      // TODO
      // ws.close();
    };
  }, []);

  useEffect(() => {
    console.log("RfiDisplay: useEffect: 2");
    // console.log("RfiDisplay: data = ", JSON.stringify(data));
  }, [data, socketStatus]);
*/

  return (
    <>
      <Helmet>
        <title>RFI Display</title>
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
                      <SignalCellularAltIcon />
                    </Avatar>
                  }
                  title="RFI Display"
                  subheader={socketStatus}
                />

                <CardContent sx={{ pt: "8px" }}>
                  <div id="rfi-display-table"></div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default RfiDisplay;
