import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import { DATA_API_URL, WIDTH } from '../../utils/constants'

const CONVERT = 1000;
const WORKFLOW_INTERVAL_SECONDS = Number(process.env.REACT_APP_WORKFLOW_INTERVAL_SECONDS) * CONVERT;
const WORKFLOW_STATISTICS_INTERVAL_SECONDS = Number(process.env.REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS) * CONVERT;

const Statistics = () => {
    const [workflowData, setWorkflowData] = useState(null);
    const [workflowStatisticsData, setWorkflowStatisticsData] = useState(null);

    async function retrieveWorkflowData() {
        await fetch(`${DATA_API_URL}/stats/workflow`)
            .then((response) => response.json())
            .then((data) => {
                console.log("hello");
                setWorkflowData(data);
            }).catch(() => null);
    }

    async function retrieveWorkflowStatisticsData() {
        await fetch(`${DATA_API_URL}/stats/workflow/statistics`)
            .then((response) => response.json())
            .then((data) => {
                setWorkflowStatisticsData(data);
            }).catch(() => null);
    }

    function epochToDateString(timeInMilliseconds: number) {
        const date = new Date(0);
        date.setMilliseconds(timeInMilliseconds * 1000);
        return date.toISOString();
    }

    useEffect(() => {
        retrieveWorkflowData();
        const interval = setInterval(async () => {
            if (workflowData) {
                await retrieveWorkflowData();
            }
        }, WORKFLOW_INTERVAL_SECONDS);
        retrieveWorkflowStatisticsData();
        const interval2 = setInterval(async () => {
            if (workflowStatisticsData) {
                await retrieveWorkflowStatisticsData();
            }
        }, WORKFLOW_STATISTICS_INTERVAL_SECONDS);
        return () => {
            clearInterval(interval);
            clearInterval(interval2);
        };
    }, []);

    return (
        <Container>
            <Card sx={{ minWidth: WIDTH }}>
                <CardHeader
                    title="Statistics - Basic"
                />
                <CardContent sx={{ pt: '8px' }}>
                    <div id="statistics-basics-Id" >
                        {workflowData &&
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
                                        Now: {workflowData && workflowData.time && epochToDateString(workflowData.time.now)}
                                    </Typography>
                                    <Typography paragraph>
                                        Last Updated: {workflowData && workflowData.time && epochToDateString(workflowData.time.last_update)}
                                    </Typography>
                                    <Typography paragraph>
                                        Start: {workflowData && workflowData.time && epochToDateString(workflowData.time.start)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography paragraph>
                                        Workflow:
                                    </Typography>
                                    <Typography paragraph>
                                        State: {workflowData && workflowData.workflow && JSON.stringify(workflowData.workflow.state)}
                                    </Typography>
                                    <Typography paragraph>
                                        Scan: {workflowData && workflowData.workflow && JSON.stringify(workflowData.workflow.scan)}
                                    </Typography>
                                    <Typography paragraph>
                                        Processing block: {workflowData && workflowData.workflow && JSON.stringify(workflowData.workflow.processing_block)}
                                    </Typography>
                                    <Typography paragraph>
                                        Scan ID: {workflowData && workflowData.workflow && JSON.stringify(workflowData.workflow.scan_id)}
                                    </Typography>
                                    <Typography paragraph>
                                        Time Since Last Payload: {workflowData && workflowData.workflow && JSON.stringify(workflowData.workflow.time_since_last_payload)}
                                    </Typography>

                                </Grid>

                            </Grid>
                        }
                    </div>
                </CardContent>
            </Card>
            <Card sx={{ minWidth: WIDTH }}>
                <CardHeader
                    title="Statistics - Detailed"
                />
                <CardContent sx={{ pt: '8px' }}>
                    <div id="statistics-detailed-Id">
                        {workflowStatisticsData &&
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography paragraph>
                                        Time:
                                    </Typography>
                                    <Typography paragraph>
                                        Now: {workflowStatisticsData && workflowStatisticsData.time && epochToDateString(workflowStatisticsData.time.now)}
                                    </Typography>
                                    <Typography paragraph>
                                        Last Updated: {workflowStatisticsData && workflowStatisticsData.time && epochToDateString(workflowStatisticsData.time.last_update)}
                                    </Typography>
                                    <Typography paragraph>
                                        Start: {workflowStatisticsData && workflowStatisticsData.time && epochToDateString(workflowStatisticsData.time.start)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography paragraph>
                                        Statistics:
                                    </Typography>
                                    <Typography paragraph>
                                        Ingestion Rate: {workflowStatisticsData && workflowStatisticsData.statistics && JSON.stringify(workflowStatisticsData.statistics.ingestion_rate)}
                                    </Typography>
                                    <Typography paragraph>
                                        Error Count: {workflowStatisticsData && workflowStatisticsData.statistics && JSON.stringify(workflowStatisticsData.statistics.error_count)}
                                    </Typography>
                                    <Typography paragraph>
                                        Packet Count: {workflowStatisticsData && workflowStatisticsData.statistics && JSON.stringify(workflowStatisticsData.statistics.packet_count)}
                                    </Typography>
                                    <Typography paragraph>
                                        Payloads Received: {workflowStatisticsData && workflowStatisticsData.statistics && JSON.stringify(workflowStatisticsData.statistics.payloads_received)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}
export default Statistics;