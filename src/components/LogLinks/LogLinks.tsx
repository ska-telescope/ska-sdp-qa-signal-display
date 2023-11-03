import * as React from 'react';
import { Box, Typography, Grid, Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { DATA_API_URL } from '../../utils/constants';


interface LogLinksProps {
    subArray: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: any;
}
  
interface LogLink{
  link: string; 
  title: string; 
  description: string;
}

const LinkElement = ({link, title, description}: LogLink) => {
  const openLink = (navLink) => {
    if (navLink === ''){
      alert('Logs Unavailable');
    } else {
      window.open(navLink, "_blank");
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4} onClick={()=> openLink(link)}>
      <Card style={{ backgroundColor: 'primary' }} variant="outlined">
        <CardHeader avatar={<Avatar variant="square">G</Avatar>} title={title} />
        <CardContent>
          <Typography variant="body1" component="div">
            <Typography variant="body1" component="div">
              {description}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

const LogLinks = ({ subArray, config }: LogLinksProps) => {
  const [kibanaLink, setKibanaLink] = React.useState('');
  const [grafanaSDPLink, setGrafanaSDPLink] = React.useState('');
  const [grafanaPipelineLink, setGrafanaPipelineLink] = React.useState('');

  React.useEffect( () => {
    const fetchData = async () => {
      await fetch(`${DATA_API_URL }${config.paths.log_url}/${subArray}`)
      .then(response => response.json())
      .then(data => {
        setKibanaLink(data.kibana);
        setGrafanaSDPLink(data.grafana.sdp);
        setGrafanaPipelineLink(data.grafana.pipeline);
      })
    .catch(() => null);
    }
    if (subArray){
      fetchData().catch(() => null);
    }

  },[subArray])
 
  return (
    <Box m={1}>
      <Grid container direction="row" justifyContent="space-evenly" spacing={6}>
        <LinkElement 
          link={grafanaSDPLink} 
          title="SDP Control" 
          description="The grafana dashboard shows the current resource usage of the kubernetes namespace the SDP Control is deployed in."
        />
        <LinkElement 
          link={grafanaPipelineLink} 
          title="SDP Pipeline" 
          description="The grafana dashboard shows the current resource usage of the kubernetes namespace the SDP Workflow Pipeline is deployed in."
        />
        <LinkElement 
          link={kibanaLink} 
          title="SDP Logs" 
          description="View the system logs, filtered to both the SDP Control system as well as the SDP Workflow Pipeline."
        />
      </Grid>
    </Box>
  );
};
export default LogLinks;

