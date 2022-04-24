import { Card, CardContent, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Head from 'next/head';
import { DashboardLayout } from 'src/components/dashboard-layout/dashboard-layout';

function Home() {
  return (
    <>
      <Head>
        <title>QA Display</title>
      </Head>
      <DashboardLayout>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 8,
          }}
        >
          <Container>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5">Welcome to QA Metrics Visualization Dashboard!</Typography>
                <br />
              </CardContent>
            </Card>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
}

export default Home;
