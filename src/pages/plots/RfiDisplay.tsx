import React from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { RfiDetailsPlot } from 'src/components/plots/RfiDetailsPlot';
import { RfiTable } from 'src/components/plots/RfiTable';
import useSettings from '../../hooks/useSettings';

const { REACT_APP_WS } = process.env;
const rfiDetailsApi = `${REACT_APP_WS}/consumer/rfi_xx_00_01`;
const rfiSummaryApi = `${REACT_APP_WS}/consumer/rfi_summary`;
const rfiDetailsWs = new WebSocket(rfiDetailsApi);
const rfiSummaryWs = new WebSocket(rfiSummaryApi);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
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

  console.log('RfiDisplay: rfiApi = ', rfiDetailsApi);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = React.useState(null);
  const [socketStatus, setSocketStatus] = React.useState(Date().toLocaleString());

  const rfiTable = new RfiTable('rfi-table');
  const rfiDetailsPlot = new RfiDetailsPlot('rfi-details-plot');

  //
  // generate random data to test locally
  //
  /*
  React.useEffect(() => {
    let i = 1;
    function myLoop() {
      setTimeout(function () {
        // randomly generated N = 100 length array 0 <= A[N] <= 360
        const data1 = {
          polarisation: ["XX"],
          baseline: ["00"],
          description: "Spectrum",
          xLabel: "Frequency (MHz)",
          yLabel: "Power (dB)",
          xMin: 0,
          xMax: 100,
          yMin: 0,
          yMax: 360,
          frequencies: Array.from({ length: 100 }, (_, i) => i + 1),
          values: [[Array.from({ length: 100 }, () => Math.floor(Math.random() * 361))]],
          flags: [[Array.from({ length: 100 }, () => Math.floor(Math.random() * 2))]],
          rfis: [[Array.from({ length: 100 }, () => Math.floor(Math.random() * 11))]],
        };

        setData(data1);
        setSocketStatus(Date().toLocaleString());
        console.log("RfiDisplay: data = ", data1);

        if (data1) rfiTable.draw(data1);

        i++;
        if (i < 2) {
          myLoop();
        }
      }, 10000);
    }

    myLoop(); //  start the loop
  });
  */

  const onMessage = (event) => {
    const payload = JSON.parse(event.data);
    console.log('RfiDisplay:onMessage: received payload = ', payload);

    if ('status' in payload) {
      console.log(payload.status);
      setSocketStatus(payload.status);
    }

    if ('body' in payload) {
      setData(payload.body);
      setSocketStatus(payload.timestamp);

      if ('topic' in payload && payload?.topic === 'rfi_summary') rfiTable.draw(payload.body);
      if ('topic' in payload && payload?.topic === 'rfi_xx_00_01')
        rfiDetailsPlot.draw(payload.body);
    }
  };

  React.useEffect(() => {
    console.log('RfiDisplay: useEffect: 1');
    rfiDetailsWs.onmessage = onMessage;
    rfiSummaryWs.onmessage = onMessage;

    return () => {
      // TODO : ws.close();
    };
  });

  // useEffect(() => {
  //   console.log("RfiDisplay: useEffect: 2");
  //   // console.log("RfiDisplay: data = ", JSON.stringify(data));
  // }, [data, socketStatus]);

  return (
    <>
      <Helmet>
        <title>RFI Quality Metrics</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
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
                  title="RFI: Summary"
                  subheader={socketStatus}
                />

                <CardContent sx={{ pt: '8px' }}>
                  <div id="rfi-table" />
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
                    <Avatar className={classes.avatar}>
                      <SignalCellularAltIcon />
                    </Avatar>
                  }
                  title="RFI: (XX, s0000-s0001)"
                  subheader={socketStatus}
                />

                <CardContent sx={{ pt: '8px' }}>
                  <div id="rfi-details-plot" />
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
