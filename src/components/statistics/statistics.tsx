import React, { useState } from 'react';
import { Box, Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { DATA_API_URL, WIDTH } from '../../utils/constants';

const CONVERT = 1000;
const WORKFLOW_INTERVAL_SECONDS = Number(process.env.REACT_APP_WORKFLOW_INTERVAL_SECONDS) * CONVERT;
const WORKFLOW_STATISTICS_INTERVAL_SECONDS =
  Number(process.env.REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS) * CONVERT;

const Statistics = () => {
  const [processingBlockData, setProcessingBlockData] = useState(null);
  const [processingBlockStatisticsData, setProcessingBlockStatisticsData] = useState(null);

  function epochToDateString(timeInMilliseconds: number) {
    if (timeInMilliseconds === undefined || timeInMilliseconds === null) {
      return null;
    }
    const date = new Date(0);
    date.setMilliseconds(timeInMilliseconds * 1000);
    return date.toISOString();
  }

  async function retrieveProcessingBlockData() {
    await fetch(`${DATA_API_URL}/stats/processing_block`)
      .then((response) => response.json())
      .then((data) => {
        setProcessingBlockData(data);
        setTimeout( retrieveProcessingBlockData, WORKFLOW_INTERVAL_SECONDS);
      })
      .catch(() => null);
  };

  async function retrieveProcessingBlockStatisticsData() {
    await fetch(`${DATA_API_URL}/stats/processing_block/statistics`)
      .then((response) => response.json())
      .then((data) => {
        setProcessingBlockStatisticsData(data);
        setTimeout( retrieveProcessingBlockStatisticsData, WORKFLOW_STATISTICS_INTERVAL_SECONDS);
      })
      .catch(() => null);
  }

  retrieveProcessingBlockData();
  retrieveProcessingBlockStatisticsData();

  return (
    <Box>
      <Container sx={{ py: '8px' }}>
        <Card variant="outlined" sx={{ minWidth: WIDTH }}>
          <CardHeader title="Statistics - Basic" />
          <CardContent sx={{ pt: '8px' }}>
            <div id="statistics-basics-Id">
              {processingBlockData?.time && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography paragraph>
                      Success:
                      {JSON.stringify(processingBlockData?.success)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography paragraph>Time:</Typography>
                    <Typography paragraph>
                      Now: {epochToDateString(processingBlockData?.time?.now)}
                    </Typography>
                    <Typography paragraph>
                      Last Updated: {epochToDateString(processingBlockData?.time?.last_update)}
                    </Typography>
                    <Typography paragraph>
                      Start: {epochToDateString(processingBlockData?.time?.start)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography paragraph>Workflow:</Typography>
                    <Typography paragraph>
                      State: {JSON.stringify(processingBlockData?.processing_block?.state)}
                    </Typography>
                    <Typography paragraph>
                      Processing ID:{' '}
                      {JSON.stringify(processingBlockData?.processing_block?.processing_id)}
                    </Typography>
                    <Typography paragraph>
                      Scan ID: {JSON.stringify(processingBlockData?.processing_block?.scan_id)}
                    </Typography>
                    <Typography paragraph>
                      Time Since Last Payload:{' '}
                      {JSON.stringify(
                        processingBlockData?.processing_block?.time_since_last_payload
                      )}
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
          <CardHeader title="Statistics - Detailed" />
          <CardContent sx={{ pt: '8px' }}>
            <div id="statistics-detailed-Id">
              {processingBlockStatisticsData?.time && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography paragraph>Time:</Typography>
                    <Typography paragraph>
                      Now: {epochToDateString(processingBlockStatisticsData?.time?.now)}
                    </Typography>
                    <Typography paragraph>
                      Last Updated:{' '}
                      {epochToDateString(processingBlockStatisticsData?.time?.last_update)}
                    </Typography>
                    <Typography paragraph>
                      Start: {epochToDateString(processingBlockStatisticsData?.time?.start)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography paragraph>Statistics:</Typography>
                    <Typography paragraph>
                      Ingestion Rate:{' '}
                      {JSON.stringify(processingBlockStatisticsData?.statistics?.ingestion_rate)}
                    </Typography>
                    <Typography paragraph>
                      Error Count:{' '}
                      {JSON.stringify(processingBlockStatisticsData?.statistics?.error_count)}
                    </Typography>
                    <Typography paragraph>
                      Packet Count:{' '}
                      {JSON.stringify(processingBlockStatisticsData?.statistics?.packet_count)}
                    </Typography>
                    <Typography paragraph>
                      Payloads Received:{' '}
                      {JSON.stringify(processingBlockStatisticsData?.statistics?.payloads_received)}
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
