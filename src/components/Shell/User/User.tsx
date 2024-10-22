import React from 'react';
import { Box, Drawer, Grid, Stack } from '@mui/material';

import MSEntraSignOutButton from '@components/Auth/MSEntraAuth/MSEntraSignOutButton/MSEntraSignOutButton';

export interface UserProps {
  open: boolean;
  toggleDrawer: Function;
}

export default function User({ open, toggleDrawer }: UserProps) {
  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box m={1} sx={{ minWidth: '25vw' }}>
          <Stack sx={{ height: '95%' }} spacing={2}>
            <Grid container direction="row" justifyContent="space-evenly">
              <Grid item>
                <MSEntraSignOutButton />
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
}
