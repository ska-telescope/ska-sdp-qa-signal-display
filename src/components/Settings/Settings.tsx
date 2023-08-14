/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Drawer, Grid, Stack, Typography } from '@mui/material';
import HideShowToggle from '../HideShowToggle/HideShowToggle';
import { QASettings } from '../../services/types/qaSettings';

export interface SettingsProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  openToggle: Function;
  displaySettings: QASettings;
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

  function setValue(e: QASettings) {
    setSettings(e);
  }

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={settingsToggle}>
        <Box m={1} sx={{ minWidth: '25vw' }}>
          <Stack sx={{ height: '95%' }} spacing={0}>
            <Typography variant="h4">{t('label.settings')}</Typography>
            <Typography variant="h5">{t('label.statistics')}</Typography>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label={t('label.detailed')}
                  testId="statisticsDetailedButtonTestId"
                  displaySettings={displaySettings}
                  value="showStatisticsDetailed"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label={t('label.receiver')}
                  testId="statisticsReceiverButtonTestId"
                  displaySettings={displaySettings}
                  value="showStatisticsReceiver"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Typography variant="h5">{t('label.spectrumPlot')}</Typography>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="XX"
                  testId="spectrumPlotXXButtonTestId"
                  displaySettings={displaySettings}
                  value="showSpectrumPlotXX"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="XY"
                  testId="spectrumPlotXYButtonTestId"
                  displaySettings={displaySettings}
                  value="showSpectrumPlotXY"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="YX"
                  testId="spectrumPlotYXButtonTestId"
                  displaySettings={displaySettings}
                  value="showSpectrumPlotYX"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="YY"
                  testId="spectrumPlotYYButtonTestId"
                  displaySettings={displaySettings}
                  value="showSpectrumPlotYY"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Typography variant="h5">
              {`${t('label.polarization')} / ${t('label.amplitude')}`}
            </Typography>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="XX"
                  testId="polarizationAmplitudeXXButtonTestId"
                  displaySettings={displaySettings}
                  value="showPolarizationAmplitudeXX"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="XY"
                  testId="polarizationAmplitudeXYButtonTestId"
                  displaySettings={displaySettings}
                  value="showPolarizationAmplitudeXY"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="YX"
                  testId="polarizationAmplitudeYXButtonTestId"
                  displaySettings={displaySettings}
                  value="showPolarizationAmplitudeYX"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="YY"
                  testId="polarizationAmplitudeYYButtonTestId"
                  displaySettings={displaySettings}
                  value="showPolarizationAmplitudeYY"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Typography variant="h5">
              {`${t('label.polarization')} / ${t('label.phase')}`}
            </Typography>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="XX"
                  testId="polarizationPhaseXXButtonTestId"
                  displaySettings={displaySettings}
                  value="showPolarizationPhaseXX"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="XY"
                  testId="polarizationPhaseXYButtonTestId"
                  displaySettings={displaySettings}
                  value="showPolarizationPhaseXY"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="YX"
                  testId="polarizationPhaseYXButtonTestId"
                  displaySettings={displaySettings}
                  value="showPolarizationPhaseYX"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Grid container m={0}>
              <Grid item xs={3}>
                <HideShowToggle
                  label="YY"
                  testId="polarizationPhaseYYButtonTestId"
                  displaySettings={displaySettings}
                  value="showPolarizationPhaseYY"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
            <Typography variant="h5">{t('label.spectrograms')}</Typography>
            <Grid container m={0}>
              <Grid item>
                <HideShowToggle
                  label={t('label.spectrograms')}
                  testId="spectrogramsButtonTestId"
                  displaySettings={displaySettings}
                  value="showSpectrograms"
                  setValue={setValue}
                />
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
}
