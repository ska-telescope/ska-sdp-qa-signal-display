/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Footer } from '@ska-telescope/ska-gui-components';
import { Grid, Typography } from '@mui/material';
import Config from '../../services/types/Config';

interface SKAOFooterProps {
  version: string;
  config: Config;
}

const SKAOFooter = ({ version, config }: SKAOFooterProps) => {
  let apiVersionNumber = 'API Version Number: API Unreachable';

  React.useEffect(() => {
    if (config === null) {
    }
  }, [config]);

  if (config != null) {
    apiVersionNumber = `API Version Number: ${config.app_version}`;
  }

  return (
    <Footer testId="footerId" version={version}>
      <Grid item>
        <Typography variant="body1">{apiVersionNumber}</Typography>
      </Grid>
      <Grid />
    </Footer>
  );
};

export default SKAOFooter;
