import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { DATA_API_URL } from '../../utils/constants';


interface LogLinksProps {
    subArray: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: any;
}
  
const LogLinks = ({ subArray, config }: LogLinksProps) => {
  const [kibanaLink, setKibanaLink] = React.useState('');
  const [grafanaLink, setGrafanaLink] = React.useState('');

  const openLink = (link) => {
    if (link === ''){
      alert('Logs Unavailable');
    } else {
      window.open(link, "_blank");
    }
  }

  React.useEffect( () => {
    const fetchData = async () => {
      await fetch(`${DATA_API_URL }${config.paths.log_url}/${subArray}`)
      .then(response => response.json())
      .then(data => {
        setKibanaLink(data.kibana);
        setGrafanaLink(data.grafana);
      })
    .catch(() => null);
    }
    if (subArray){
      fetchData().catch(() => null);
    }

  },[subArray])

  return (
    <Box>
      <Typography color="inherit">
        <td onClick={()=> openLink(grafanaLink)}><u>Grafana Dashboard</u></td>
        <br />
        <td onClick={()=> openLink(kibanaLink)}><u>Kibana Logs</u></td>
      </Typography>
    </Box>
  );
};
export default LogLinks;