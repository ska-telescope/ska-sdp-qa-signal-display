/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import SignalCard from '../SignalCard/SignalCard';
import { QASettings } from '../Settings/qaSettings';

interface MaskLegendProps {
  displaySettings: typeof QASettings;
}

const MaskLegend = ({ displaySettings }: MaskLegendProps) => {
  const { t } = useTranslation('signalDisplay');
  const [showContent, setShowContent] = React.useState(false);

  const canShowLegend = () =>
    displaySettings.showPolarizationAmplitudeXX ||
    displaySettings.showPolarizationPhaseXX ||
    displaySettings.showPolarizationAmplitudeXY ||
    displaySettings.showPolarizationPhaseXY ||
    displaySettings.showPolarizationAmplitudeYX ||
    displaySettings.showPolarizationPhaseYX ||
    displaySettings.showPolarizationAmplitudeYY ||
    displaySettings.showPolarizationPhaseYY;

  const showToggle = () => {
    setShowContent(!showContent);
  };

  return (
    <>
      {canShowLegend() && (
        <SignalCard title={t('label.maskLegend')} showContent setShowContent={showToggle}>
          <Box>
            <Typography data-testid="maskLegend1" variant="body1" display="block">
              Grey Mask - Missing Data
            </Typography>
            <Typography data-testid="maskLegend2" variant="body1" display="block">
              Red Mask - Invalid Data
            </Typography>
          </Box>
        </SignalCard>
      )}
    </>
  );
};
export default MaskLegend;
