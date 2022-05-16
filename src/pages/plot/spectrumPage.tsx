import Head from 'next/head';
import { Box } from '@mui/system';

import { DashboardLayout } from 'src/components/dashboard-layout/dashboard-layout';
import SpectrumPlot from "../../components/spectrumPlot/spectrumPlot";

const SIDEBAR_WIDTH = 250;

const SpectrumPage = () => (
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
        <SpectrumPlot />
      </Box>
    </DashboardLayout>
  </>
);

export default SpectrumPage;
