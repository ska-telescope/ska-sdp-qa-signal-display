import React from 'react';
import {Footer} from '@ska-telescope/ska-gui-components';
import { Grid, Typography } from '@mui/material';


interface SKAOFooterProps {
    version: string
    config: any
}


const SKAOFooter = ({version, config}: SKAOFooterProps) => {

    var api_version_number = "API Version Number: API Unreachable"

    React.useEffect(() => {
        if (config === null) {
          return;
        }
    }, [config]);

    if (config != null) {
        api_version_number = `API Version Number: ${config.app_version}`
    }

    return (
        <Footer testId="footerId" version={version}>
          <Grid item>
          <Typography variant='body1'>{api_version_number}</Typography>
          </Grid>
          <Grid/>
        </Footer>
        )
    }


export default SKAOFooter;