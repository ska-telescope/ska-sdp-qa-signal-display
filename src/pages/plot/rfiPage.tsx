import { Box } from '@mui/material';
import Head from 'next/head';

import { DashboardLayout } from 'src/components/dashboard-layout/dashboard-layout';
import Rfi from "../../components/rfi/rfi";

const SIDEBAR_WIDTH = 250;

const RfiPage = () => (
  <>
    <Head>
      <title>RFI QA</title>
    </Head>
    <DashboardLayout>
      <Box
        sx={{
          position: 'fixed',
          overflow: 'visible',
          bottom: 0,
          left: { xs: 0, md: SIDEBAR_WIDTH },
          top: 5,
          margin: 2,
          right: 0
        }}
      >
        <Rfi />
      </Box>
    </DashboardLayout>
  </>
);

export default RfiPage;