import * as React from 'react';
import { Box } from '@mui/material';
import { Progress } from '@ska-telescope/ska-gui-components';

export default function Loader() {
  return (
    <Box>
      <Progress size={100} testId="progressTestId" />
    </Box>
  );
}
