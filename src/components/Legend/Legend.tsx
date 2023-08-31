/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button, Grid } from '@mui/material';
import { ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import SignalCard from '../SignalCard/SignalCard';
import { colorFlip } from '../../utils/colorFlip';

interface LegendProps {
  resize: number;
  data: any;
  displaySettings: any;
  onClick: Function;
  pole: any;
  poleUpdate: Function;
}

const Legend = ({ resize, data, displaySettings, onClick, pole, poleUpdate }: LegendProps) => {
  const { t } = useTranslation('signalDisplay');
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const canShow = () => data !== null;

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
    setShowContent(showContent ? false : canShow());
  };

  React.useEffect(() => {
    if (!refresh) setShowContent(canShow());
    else setRefresh(false);
  }, [refresh]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [resize]);

  return (
    <>
      {canShowLegend() && (
        <SignalCard testId="legend" title={t('label.legend')} showContent={showContent} setShowContent={showToggle}>
          <Grid container direction="column">
            <Grid item>
              {pole &&
                pole.map((item: { active: boolean; color: string; text: string }) => (
                  <Button
                    data-testid="legendGroupingId"
                    key={item.text}
                    onClick={e => {
                      poleUpdate(e.currentTarget.innerText);
                    }}
                    size="small"
                    sx={{
                      m: 1,
                      '&:hover': item.active ? item.color : 'inherited',
                      backgroundColor: item.active ? item.color : 'inherited',
                      color: item.active ? colorFlip(item.color, true) : 'inherited'
                    }}
                    variant={ButtonVariantTypes.Contained}
                  >
                    {item.text}
                  </Button>
                ))}
            </Grid>
            <Grid item>
              {data &&
                data.map(
                  (
                    item: { active: boolean; color: string; self: boolean; text: string },
                    i: any
                  ) => (
                    <Button
                      data-testid="legendKey"
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      onClick={e => {
                        onClick(e.currentTarget.innerText);
                      }}
                      size="small"
                      sx={{
                        m: 1,
                        '&:hover': item.active ? item.color : 'inherited',
                        backgroundColor: item.active ? item.color : 'inherited',
                        color: item.active ? colorFlip(item.color, true) : 'inherited'
                      }}
                      variant="contained"
                    >
                      {item.text}
                    </Button>
                  )
                )}
            </Grid>
          </Grid>
        </SignalCard>
      )}
    </>
  );
};
export default Legend;
