import { Box } from '@mui/system';
import Head from 'next/head';

import { DashboardLayout } from 'src/components/dashboard-layout/dashboard-layout';
import Spectrogram from "../../components/spectrogram/spectrogram";

const SIDEBAR_WIDTH = 250;

const SpectrogramTable = () => (
  <>
    <Head>
      <title>Spectrum Plot</title>
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
        <Spectrogram />
      </Box>
    </DashboardLayout>
  </>
);

export default SpectrogramTable;
