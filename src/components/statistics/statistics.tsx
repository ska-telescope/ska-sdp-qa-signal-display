import {useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';

const DATA_API_URL = process.env.NEXT_PUBLIC_DATA_API_URL;
const WORKFLOW_INTERVAL_SECONDS = Number(process.env.NEXT_PUBLIC_WORKFLOW_INTERVAL_SECONDS);
const WORKFLOW_STATISTICS_INTERVAL_SECONDS = Number(process.env.NEXT_PUBLIC_WORKFLOW_STATISTICS_INTERVAL_SECONDS);
const WIDTH = 1200;

const Statistics = () => {
    const [workflowData, setWorkflowData] = useState(null);
    const [workflowStatisticsData, setWorkflowStatisticsData] = useState(null);
    
    async function retrieveWorkflowData() {
        await fetch(`${DATA_API_URL}/stats/workflow`)
            .then((response) => response.json())
            .then((data)=> {
            setWorkflowData(data);
      });
    }

    async function retrieveWorkflowStatisticsData() {
        await fetch(`${DATA_API_URL}/stats/workflow/statistics`)
            .then((response) => response.json())
            .then((data)=> {
            setWorkflowStatisticsData(data);
      });
    }

    function epochToDateString(timeInMilliseconds: number){
        let date = new Date(0);
        date.setMilliseconds(timeInMilliseconds*1000);
        return date.toISOString();
    }

    useEffect(() => {
        const workflowInterval = 1000*WORKFLOW_INTERVAL_SECONDS;
        const workflowStatisticsInterval = 1000*WORKFLOW_STATISTICS_INTERVAL_SECONDS;
        retrieveWorkflowData();
        let interval = setInterval(async () => {
            if (workflowData){
            await retrieveWorkflowData();
            }
        }, workflowInterval);
        retrieveWorkflowStatisticsData();
        let interval_2 = setInterval(async () => {
            if (workflowStatisticsData){
            await retrieveWorkflowStatisticsData();
            }
        }, workflowStatisticsInterval);
        return () => {
            clearInterval(interval);
            clearInterval(interval_2);
        };
    }, []);

    return (
        <Container>
            <Card sx={{ minWidth: WIDTH }}>
              <CardHeader
                title="Statistics - Basic"
              />
              <CardContent sx={{ pt: '8px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography paragraph>
                            Success: {workflowData && JSON.stringify(workflowData.success)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography paragraph>
                            Time:
                        </Typography>
                        <Typography paragraph>
                            Now: {workflowData && epochToDateString(workflowData.time.now)}
                        </Typography>
                        <Typography paragraph>
                            Last Updated: {workflowData && epochToDateString(workflowData.time.last_update)}
                        </Typography>
                        <Typography paragraph>
                            Start: {workflowData && epochToDateString(workflowData.time.start)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography paragraph>
                            Workflow:
                        </Typography>
                        <Typography paragraph>
                            State: {workflowData && JSON.stringify(workflowData.workflow.state)}
                        </Typography>
                        <Typography paragraph>
                            Scan: {workflowData && JSON.stringify(workflowData.workflow.scan)}
                        </Typography>
                        <Typography paragraph>
                            Processing block: {workflowData && JSON.stringify(workflowData.workflow.processing_block)}
                        </Typography>
                        <Typography paragraph>
                            Scan ID: {workflowData && JSON.stringify(workflowData.workflow.scan_id)}
                        </Typography>
                        <Typography paragraph>
                            Time Since Last Payload: {workflowData && JSON.stringify(workflowData.workflow.time_since_last_payload)}
                        </Typography>
                    </Grid>
                </Grid>
                <div id="statistics-basics-Id" />
              </CardContent>
            </Card>
            <Card sx={{ minWidth: WIDTH }}>
              <CardHeader
                title="Statistics - Detailed"
              />
              <CardContent sx={{ pt: '8px' }}>
              <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography paragraph>
                            Time:
                        </Typography>
                        <Typography paragraph>
                            Now: {workflowStatisticsData && epochToDateString(workflowStatisticsData.time.now)}
                        </Typography>
                        <Typography paragraph>
                            Last Updated: {workflowStatisticsData && epochToDateString(workflowStatisticsData.time.last_update)}
                        </Typography>
                        <Typography paragraph>
                            Start: {workflowStatisticsData && epochToDateString(workflowStatisticsData.time.start)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography paragraph>
                            Statistics:
                        </Typography>
                        <Typography paragraph>
                            Ingestion Rate: {workflowStatisticsData && JSON.stringify(workflowStatisticsData.statistics.ingestion_rate)}
                        </Typography>
                        <Typography paragraph>
                            Error Count: {workflowStatisticsData && JSON.stringify(workflowStatisticsData.statistics.error_count)}
                        </Typography>
                        <Typography paragraph>
                            Packet Count: {workflowStatisticsData && JSON.stringify(workflowStatisticsData.statistics.packet_count)}
                        </Typography>
                        <Typography paragraph>
                            Payloads Received: {workflowStatisticsData && JSON.stringify(workflowStatisticsData.statistics.payloads_received)}
                        </Typography>
                    </Grid>
                </Grid>
                <div id="statistics-detailed-Id" />
              </CardContent>
            </Card>
        </Container>
    );
}
export default Statistics;