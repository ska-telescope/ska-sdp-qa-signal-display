/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Footer, CopyrightModal } from '@ska-telescope/ska-gui-components';
import { Grid, Typography } from '@mui/material';
import Config from '../../services/types/Config';

interface SKAOFooterProps {
  version: string;
  config: Config;
}

const SKAOFooter = ({ version, config }: SKAOFooterProps) => {
  let apiVersionNumber = 'API Version Number: API Unreachable';

  const [showCopyright, setShowCopyright] = React.useState(false);

  React.useEffect(() => {
    if (config === null) {
    }
  }, [config]);

  if (config != null) {
    apiVersionNumber = `API Version Number: ${config.app_version}`;
  }

  return (
    <Footer copyrightFunc={setShowCopyright} testId="footerId" version={version}>
      <Grid item>
        <Typography variant="body1">{apiVersionNumber}</Typography>
      </Grid>
      <Grid />
      <CopyrightModal copyrightFunc={setShowCopyright} show={showCopyright} />
    </Footer>
  );
};

export default SKAOFooter;
