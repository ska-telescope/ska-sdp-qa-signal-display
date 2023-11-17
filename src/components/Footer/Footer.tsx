import React from 'react';
import {Footer} from '@ska-telescope/ska-gui-components';
import { Grid, Typography } from '@mui/material';

/* tslint:disable:no-empty */


interface SKAOFooterProps {
    version: string
    config: any
}


const SKAOFooter = ({version, config}: SKAOFooterProps) => {

    let apiVersionNumber = "API Version Number: API Unreachable"

    React.useEffect(() => {
        if (config === null) {
          return;
        }
    }, [config]);

    if (config != null) {
        apiVersionNumber = `API Version Number: ${config.app_version}`
    }

    return (
      <Footer testId="footerId" version={version}>
        <Grid item>
          <Typography variant='body1'>{apiVersionNumber}</Typography>
        </Grid>
        <Grid />
      </Footer>
        )
    }


export default SKAOFooter;