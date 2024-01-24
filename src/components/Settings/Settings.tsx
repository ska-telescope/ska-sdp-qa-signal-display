/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Drawer, Grid, Typography } from '@mui/material';
import HideShowToggle from '../HideShowToggle/HideShowToggle';
import YAxisToggle from '../YAxisToggle/YAxisToggle';
import { QASettings } from './qaSettings';

export interface SettingsProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  openToggle: Function;
  displaySettings: typeof QASettings;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSettings: Function;
}

export default function Settings({
  open,
  openToggle,
  displaySettings,
  setSettings
}: SettingsProps) {
  const { t } = useTranslation('signalDisplay');

  function settingsToggle() {
    openToggle();
  }

  function setValue(e: typeof QASettings) {
    setSettings(e);
  }

  const headerRow = (title: string, level: 'h5' | 'h6') => (
    <Grid item xs={12}>
      <Typography variant={level}>{title}</Typography>
    </Grid>
  );

  const basicToggle = (title: string, value: string) => (
    <Grid item xs={4}>
      <HideShowToggle
        label={t(title)}
        testId={`${value}ButtonTestId`}
        displaySettings={displaySettings}
        value={value}
        setValue={setValue}
      />
    </Grid>
  );

  const basicRow = (title: string, value: string) => (
    <>
      {basicToggle(title, value)}
      <Grid item xs={8} />
    </>
  );

  const complexRow = (title: string, value: string, value2: string, type: string) => (
    <>
      {basicToggle(title, value)}
      <Grid item xs={4}>
        <YAxisToggle
          disabled={!displaySettings[value]}
          setValue={setValue}
          testId={`${value2}ButtonTestId`}
          type={type}
          value={value2}
          displaySettings={displaySettings}
        />
      </Grid>
      <Grid item xs={4} />
    </>
  );

  const phaseRow = (title: string, value: string, value2: string) =>
    complexRow(title, value, value2, 'phase');
  const amplitudeRow = (title: string, value: string, value2: string) =>
    complexRow(title, value, value2, 'amplitude');

  return (
    <Drawer anchor="right" open={open} onClose={settingsToggle}>
      <Box m={1} sx={{ width: '25vw' }}>
        <Grid container p={0} m={0} spacing={1}>
          {headerRow(t('label.settings'), 'h5')}

          {headerRow(t('label.statistics'), 'h6')}

          {basicRow('label.detailed', 'showStatisticsDetailed')}
          {basicRow('label.receiver', 'showStatisticsReceiver')}

          {headerRow(t('label.spectrumPlot'), 'h6')}

          {amplitudeRow('XX', 'showSpectrumPlotXX', 'showSpectrumPlotXXaxisY')}
          {amplitudeRow('XY', 'showSpectrumPlotXY', 'showSpectrumPlotXYaxisY')}
          {amplitudeRow('YX', 'showSpectrumPlotYX', 'showSpectrumPlotYXaxisY')}
          {amplitudeRow('YY', 'showSpectrumPlotYY', 'showSpectrumPlotYYaxisY')}

          {basicRow("Grid View", 'gridView')}

          {headerRow(`${t('label.polarization')} / ${t('label.amplitude')}`, 'h6')}

          {amplitudeRow('XX', 'showPolarizationAmplitudeXX', 'showPolarizationAmplitudeXXaxisY')}
          {amplitudeRow('XY', 'showPolarizationAmplitudeXY', 'showPolarizationAmplitudeXYaxisY')}
          {amplitudeRow('YX', 'showPolarizationAmplitudeYX', 'showPolarizationAmplitudeYXaxisY')}
          {amplitudeRow('YY', 'showPolarizationAmplitudeYY', 'showPolarizationAmplitudeYYaxisY')}

          {headerRow(`${t('label.polarization')} / ${t('label.phase')}`, 'h6')}

          {phaseRow('XX', 'showPolarizationPhaseXX', 'showPolarizationPhaseXXaxisY')}
          {phaseRow('XY', 'showPolarizationPhaseXY', 'showPolarizationPhaseXYaxisY')}
          {phaseRow('YX', 'showPolarizationPhaseYX', 'showPolarizationPhaseYXaxisY')}
          {phaseRow('YY', 'showPolarizationPhaseYY', 'showPolarizationPhaseYYaxisY')}

          {headerRow(t('label.spectrograms'), 'h6')}

          {basicRow('label.spectrograms', 'showSpectrograms')}

          {headerRow(t('label.lagplots'), 'h6')}

          {basicRow('label.lagplots', 'showLagPlots')}

          {headerRow(t('label.pointingOffsets'), 'h6')}

          {basicRow('label.cross', 'showCrossElevationOffset')}
          {basicRow('label.elevation', 'showElevationOffset')}
          {basicRow('label.expectedH', 'showHBeamWidths')}
          {basicRow('label.expectedV', 'showVBeamWidths')}
          {basicRow('label.tolerance', 'showToleranceVHWidths')}
          {basicRow('label.fitted', 'showFittedHeight')}

        </Grid>
      </Box>
    </Drawer>
  );
}
