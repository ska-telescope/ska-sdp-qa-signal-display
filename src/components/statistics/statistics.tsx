import {useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material';

const DATA_API_URL = process.env.NEXT_PUBLIC_DATA_API_URL;
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

    useEffect(() => {
        retrieveWorkflowData();
        let interval = setInterval(async () => {
            if (workflowData){
            await retrieveWorkflowData();
            }
        }, 20000);
        retrieveWorkflowStatisticsData();
        let interval_2 = setInterval(async () => {
            if (workflowStatisticsData){
            await retrieveWorkflowStatisticsData();
            }
        }, 10000);
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
                <Typography paragraph>
                    success: {workflowData.success}
                </Typography>
                <Typography paragraph>
                    time: {workflowData.time}
                </Typography>
                <Typography paragraph>
                    workflow: {workflowData.workflow}
                </Typography>
                <div id="statistics-basics-Id" />
              </CardContent>
            </Card>
            <Card sx={{ minWidth: WIDTH }}>
              <CardHeader
                title="Statistics - Detailed"
              />
              <CardContent sx={{ pt: '8px' }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                </Typography>
                <div id="statistics-detailed-Id" />
              </CardContent>
            </Card>
        </Container>
    );
}
export default Statistics;