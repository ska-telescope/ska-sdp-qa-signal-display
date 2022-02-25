import React from 'react';
import type { FC } from 'react';
import { Box, Container, Typography } from '@material-ui/core';

const Footer: FC = (props) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      pb: 6,
      pt: {
        md: 15,
        xs: 6,
      },
    }}
    {...props}
  >
    <Container maxWidth="lg">
      <Typography color="textSecondary" variant="caption">
        All Rights Reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
