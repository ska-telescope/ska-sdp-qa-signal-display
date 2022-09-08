import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
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
    const date = new Date(0);
    date.setMilliseconds(timeInMilliseconds * 1000);
    return date.toISOString();
  }

  useEffect(() => {
    async function retrieveProcessingBlockData() {
      await fetch(`${DATA_API_URL}/stats/processing_block`)
        .then((response) => response.json())
        .then((data) => {
          // console.log("hello");
          setProcessingBlockData(data);
        })
        .catch(() => null);
    }
    async function retrieveProcessingBlockStatisticsData() {
      await fetch(`${DATA_API_URL}/stats/processing_block/statistics`)
        .then((response) => response.json())
        .then((data) => {
          setProcessingBlockStatisticsData(data);
        })
        .catch(() => null);
    }
    retrieveProcessingBlockData();
    const interval = setInterval(async () => {
      if (processingBlockData) {
        await retrieveProcessingBlockData();
      }
    }, WORKFLOW_INTERVAL_SECONDS);
    retrieveProcessingBlockStatisticsData();
    const interval2 = setInterval(async () => {
      if (processingBlockStatisticsData) {
        await retrieveProcessingBlockStatisticsData();
      }
    }, WORKFLOW_STATISTICS_INTERVAL_SECONDS);
    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  });

  return (
    <Container>
      <Card sx={{ minWidth: WIDTH }}>
        <CardHeader title="Statistics - Basic" />
        <CardContent sx={{ pt: '8px' }}>
          <div id="statistics-basics-Id">
            {processingBlockData && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography paragraph>
                    Success:
                    {processingBlockData && JSON.stringify(processingBlockData.success)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography paragraph>Time:</Typography>
                  <Typography paragraph>
                    Now:
                    {' '}
                    {processingBlockData &&
                      processingBlockData.time &&
                      epochToDateString(processingBlockData.time.now)}
                  </Typography>
                  <Typography paragraph>
                    Last Updated:
                    {' '}
                    {processingBlockData &&
                      processingBlockData.time &&
                      epochToDateString(processingBlockData.time.last_update)}
                  </Typography>
                  <Typography paragraph>
                    Start:
                    {' '}
                    {processingBlockData &&
                      processingBlockData.time &&
                      epochToDateString(processingBlockData.time.start)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography paragraph>Workflow:</Typography>
                  <Typography paragraph>
                    State:
                    {' '}
                    {processingBlockData &&
                      processingBlockData.processing_block &&
                      JSON.stringify(processingBlockData.processing_block.state)}
                  </Typography>
                  <Typography paragraph>
                    Processing ID:
                    {' '}
                    {processingBlockData &&
                      processingBlockData.processing_block &&
                      JSON.stringify(processingBlockData.processing_block.processing_id)}
                  </Typography>
                  <Typography paragraph>
                    Scan ID:
                    {' '}
                    {processingBlockData &&
                      processingBlockData.processing_block &&
                      JSON.stringify(processingBlockData.processing_block.scan_id)}
                  </Typography>
                  <Typography paragraph>
                    Time Since Last Payload:
                    {' '}
                    {processingBlockData &&
                      processingBlockData.processing_block &&
                      JSON.stringify(processingBlockData.processing_block.time_since_last_payload)}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </div>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: WIDTH }}>
        <CardHeader title="Statistics - Detailed" />
        <CardContent sx={{ pt: '8px' }}>
          <div id="statistics-detailed-Id">
            {processingBlockStatisticsData && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography paragraph>Time:</Typography>
                  <Typography paragraph>
                    Now:
                    {' '}
                    {processingBlockStatisticsData &&
                      processingBlockStatisticsData.time &&
                      epochToDateString(processingBlockStatisticsData.time.now)}
                  </Typography>
                  <Typography paragraph>
                    Last Updated:
                    {' '}
                    {processingBlockStatisticsData &&
                      processingBlockStatisticsData.time &&
                      epochToDateString(processingBlockStatisticsData.time.last_update)}
                  </Typography>
                  <Typography paragraph>
                    Start:
                    {' '}
                    {processingBlockStatisticsData &&
                      processingBlockStatisticsData.time &&
                      epochToDateString(processingBlockStatisticsData.time.start)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography paragraph>Statistics:</Typography>
                  <Typography paragraph>
                    Ingestion Rate:
                    {' '}
                    {processingBlockStatisticsData &&
                      processingBlockStatisticsData.statistics &&
                      JSON.stringify(processingBlockStatisticsData.statistics.ingestion_rate)}
                  </Typography>
                  <Typography paragraph>
                    Error Count:
                    {' '}
                    {processingBlockStatisticsData &&
                      processingBlockStatisticsData.statistics &&
                      JSON.stringify(processingBlockStatisticsData.statistics.error_count)}
                  </Typography>
                  <Typography paragraph>
                    Packet Count:
                    {' '}
                    {processingBlockStatisticsData &&
                      processingBlockStatisticsData.statistics &&
                      JSON.stringify(processingBlockStatisticsData.statistics.packet_count)}
                  </Typography>
                  <Typography paragraph>
                    Payloads Received:
                    {' '}
                    {processingBlockStatisticsData &&
                      processingBlockStatisticsData.statistics &&
                      JSON.stringify(processingBlockStatisticsData.statistics.payloads_received)}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};
export default Statistics;
