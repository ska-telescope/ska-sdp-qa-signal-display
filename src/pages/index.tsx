import React from 'react';
import { DashboardLayout } from 'src/components/dashboard-layout/dashboard-layout';
import Rfi from "../components/rfi/rfi";
import Spectrogram from "../components/spectrogram/spectrogram";
import SpectrumPlot from "../components/spectrumPlot/spectrumPlot";

function Home() {
  return (
    <DashboardLayout>
      <SpectrumPlot />
      <Spectrogram />
      <Rfi />
    </DashboardLayout>
  );
}

export default Home;
