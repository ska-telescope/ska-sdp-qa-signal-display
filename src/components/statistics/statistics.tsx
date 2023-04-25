import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { DATA_API_URL, WIDTH } from '../../utils/constants';

const CONVERT = 1000;
const WORKFLOW_STATISTICS_INTERVAL_SECONDS =
  Number(process.env.REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS) * CONVERT;

function epochToDateString(timeInMilliseconds: number) {
  if (timeInMilliseconds === undefined || timeInMilliseconds === null) {
    return null;
  }
  const date = new Date(0);
  date.setMilliseconds(timeInMilliseconds * 1000);
  return date.toISOString();
}

const Statistics = () => {
  const [processingBlockStatisticsData, setProcessingBlockStatisticsData] = useState(null);
  const [receiverEventsData, setReceiverEventsData] = useState(null);
  const [counter, setCounter] = useState(0);

  async function retrieveProcessingBlockStatisticsData() {
    await fetch(`${DATA_API_URL}/stats/processing_block/blocks/latest/statistics`)
      .then((response) => response.json())
      .then((data) => {
        setProcessingBlockStatisticsData(data);
        setTimeout(retrieveProcessingBlockStatisticsData, WORKFLOW_STATISTICS_INTERVAL_SECONDS);
      })
      .catch(() => null);
  }

  async function retrieveReceiverEventData() {
    await fetch(`${DATA_API_URL}/stats/spead2/scans/latest/latest_event`)
      .then((response) => response.json())
      .then((data) => {
        setReceiverEventsData(data);
        setTimeout(retrieveReceiverEventData, WORKFLOW_STATISTICS_INTERVAL_SECONDS);
      })
      .catch(() => null);
  }

  useEffect(() => {
    if (counter === 0) {
      retrieveProcessingBlockStatisticsData();
      retrieveReceiverEventData();
    }
    setCounter(1);
  });

  return (
    <Box>
      <Container sx={{ py: '8px' }}>
        <Card variant="outlined" sx={{ minWidth: WIDTH, py: '8px' }}>
          <CardHeader title="Statistics - Detailed" />
          <CardContent sx={{ pt: '8px' }}>
            <div id="statistics-detailed-Id" data-testid="statistics-detailed-Id">
              {processingBlockStatisticsData?.time && (
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography paragraph>Time:</Typography>
                    <Typography paragraph>
                      Last Refresh from API:
                      {' '}
                      {epochToDateString(processingBlockStatisticsData?.time?.now)}
                    </Typography>
                    <Typography paragraph>
                      Last Updated:
                      {' '}
                      {epochToDateString(processingBlockStatisticsData?.time?.last_update)}
                    </Typography>
                    <Typography paragraph>
                      Start:
                      {' '}
                      {epochToDateString(processingBlockStatisticsData?.time?.start)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography paragraph>Statistics:</Typography>
                    <Typography paragraph>
                      Ingestion Rate:
                      {' '}
                      {Math.round((processingBlockStatisticsData?.statistics?.ingestion_rate || 0) * 100) /
                        100}
                      {' '}
                      p/s
                    </Typography>
                    <Typography paragraph>
                      Payloads Received:
                      {' '}
                      {processingBlockStatisticsData?.statistics?.payloads_received}
                    </Typography>
                    <Typography paragraph>
                      Visibility Receive Still Active:
                      {' '}
                      {processingBlockStatisticsData?.statistics?.receive_active ? "Yes" : "No"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography paragraph>Workflow:</Typography>
                    <Typography paragraph>
                      State:
                      {' '}
                      {processingBlockStatisticsData?.processing_block?.state}
                    </Typography>
                    <Typography paragraph>
                      Scan ID:
                      {' '}
                      {processingBlockStatisticsData?.processing_block?.scan_id}
                    </Typography>
                    <Typography paragraph>
                      Processing Block ID:
                      {' '}
                      {processingBlockStatisticsData?.processing_block?.processing_block_id}
                    </Typography>
                    <Typography paragraph>
                      Execution Block ID:
                      {' '}
                      {processingBlockStatisticsData?.processing_block?.execution_block_id}
                    </Typography>
                    <Typography paragraph>
                      Sub-Array:
                      {' '}
                      {processingBlockStatisticsData?.processing_block?.subarray}
                    </Typography>
                    <Typography paragraph>
                      Time Since Last Payload:
                      {' '}
                      {processingBlockStatisticsData?.processing_block?.time_since_last_payload}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </div>
          </CardContent>
        </Card>
      </Container>
      <Container sx={{ py: '8px' }}>
        <Card variant="outlined" sx={{ minWidth: WIDTH, py: '8px' }}>
          <CardHeader title="Statistics - Receiver" />
          <CardContent sx={{ pt: '8px' }}>
            <div id="statistics-receiver-events" data-testid='statistics-receiver-events'>
              {receiverEventsData?.time && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography paragraph>
                      Last Update:
                      {' '}
                      {epochToDateString(receiverEventsData?.time)}
                    </Typography>
                    <Typography paragraph>
                      Current Scan ID:
                      {' '}
                      {receiverEventsData?.scan_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography paragraph>
                      Total Data Received:
                      {' '}
                      {Math.round((receiverEventsData?.total_megabytes || 0) * 100) / 100}
                      {' '}
                      MB
                    </Typography>
                    <Typography paragraph>
                      Current speed:
                      {' '}
                      {Math.round(
                        ((receiverEventsData?.total_megabytes || 0) / (receiverEventsData?.duration || 1)) * 100
                      ) / 100}
                      {' '}
                      MB/s
                    </Typography>
                    <Typography paragraph>
                      Number of Heaps:
                      {' '}
                      {receiverEventsData?.num_heaps}
                    </Typography>
                    <Typography paragraph>
                      Number of Incomplete Heaps:
                      {' '}
                      {receiverEventsData?.num_incomplete}
                    </Typography>
                    <Typography paragraph>
                      Duration of Current Transfer:
                      {' '}
                      {Math.round(receiverEventsData?.duration)}
                      {' '}
                      s
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
export default Statistics;
