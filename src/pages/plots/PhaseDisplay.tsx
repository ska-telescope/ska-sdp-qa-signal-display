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
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import SpectrogramTable from 'src/components/plots/SpectrogramTable';
import useSettings from '../../hooks/useSettings';

const { REACT_APP_WS } = process.env;
const phaseAPI = `${REACT_APP_WS}/consumer/phase`;
const ws = new WebSocket(phaseAPI);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
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

const PhaseDisplay: FC = () => {
  const { settings } = useSettings();
  const classes = useStyles();

  console.log('PhaseDisplay: phaseAPI = ', phaseAPI);

  const [data, setData] = React.useState(null);
  const [socketStatus, setSocketStatus] = React.useState(Date().toLocaleString());

  const spectrogramTable = new SpectrogramTable('phase-display-table');

  const onMessage = (event) => {
    const payload = JSON.parse(event.data);
    console.log('PhaseDisplay:onMessage: received event.data = ', event.data, typeof event.data);
    console.log('PhaseDisplay:onMessage: received event.data = ', payload);

    if ('status' in payload) {
      console.log(payload.status);
      setSocketStatus(payload.status);
    }

    if ('body' in payload) {
      setData(payload.body);
      setSocketStatus(payload.timestamp);
      spectrogramTable.draw(payload.body);
    }
  };

  React.useEffect(() => {
    console.log('PhaseDisplay: useEffect: 1');

    ws.onmessage = onMessage;

    return () => {
      // TODO :  ws.close();
    };
  }, [onMessage]);

  React.useEffect(() => {
    console.log('PhaseDisplay: useEffect: 2');
    // console.log("PhaseDisplay: data = ", JSON.stringify(data));
  }, [data, socketStatus]);

  return (
    <>
      <Helmet>
        <title>Phase Display</title>
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
                      <WaterfallChartIcon />
                    </Avatar>
                  }
                  title="Phase Display"
                  subheader={socketStatus}
                />

                <CardContent sx={{ pt: '8px' }}>
                  <div id="phase-display-table" />
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
