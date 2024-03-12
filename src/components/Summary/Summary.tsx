/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardHeader, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { ButtonColorTypes, Status } from '@ska-telescope/ska-gui-components';
import SummaryIcon from '@mui/icons-material/Settings';
import Config from '../../services/types/Config';
import { SOCKET_STATUS } from '../../utils/constants';

const STATUS_SIZE = 20;

interface SummaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: Config;
  status1: string;
  status2: string;
  status3: string;
  status4: string;
  status5: string;
  status6: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  clickFunction: Function;
}

const Summary = ({ config, status1, status2, status3, status4, status5, status6, clickFunction }: SummaryProps) => {
  const { t } = useTranslation('signalDisplay');

  const handleClick = () => {
    clickFunction();
  };

  const apiFormat = config ? config.api_format : '?????';
  const toolTipFormat = (label: string, statusType: string, status) => (
    <>
      <Typography color="inherit">
        <u>{t(label)}</u>
      </Typography>
      <Typography color="inherit">
        {t(statusType)}
        :
        <b>{status}</b>
      </Typography>
      <Typography color="inherit">
        {t('label.serialisation')}
        :
        <b>{apiFormat}</b>
      </Typography>
    </>
  );
  const toolTip1 = () => toolTipFormat('label.polarization', 'label.socket', status1);
  const toolTip2 = () => toolTipFormat('label.spectrumPlot', 'label.socket', status2);
  const toolTip3 = () => toolTipFormat('label.detailed', 'label.api', status3);
  const toolTip4 = () => toolTipFormat('label.receiver', 'label.api', status4);
  const toolTip5 = () => toolTipFormat('label.GainStability', 'label.socket', status5)
  const toolTip6 = () => toolTipFormat('label.pointingOffsets', 'label.socket', status6)

  const getSocketStatus = (status: string) => {
    switch (status) {
      case SOCKET_STATUS[2]:
        return 0;
      case SOCKET_STATUS[3]:
        return 4; // This value suppresses the Status Component
      case SOCKET_STATUS[0]:
        return 3;
      default:
        return 1; // Everything else shown as an error
    }
  };

  return (
    <Box m={1}>
      <Card style={{ backgroundColor: 'primary' }} variant="outlined">
        <CardHeader
          data-testid="sectionHeader"
          action={(
            <Grid container spacing={0}>
              <Grid item>
                <Tooltip title={toolTip1()}>
                  <IconButton
                    aria-label={t('label.socketStatus')}
                    sx={{ '&:hover': { backgroundColor: 'primary.dark' }, p: 1.3 }}
                    color={ButtonColorTypes.Inherit}
                  >
                    <Status
                      testId="status1Id"
                      level={getSocketStatus(status1)}
                      size={STATUS_SIZE}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={toolTip2()}>
                  <IconButton
                    aria-label={t('label.socketStatus')}
                    sx={{ '&:hover': { backgroundColor: 'primary.dark' }, p: 1.3 }}
                    color={ButtonColorTypes.Inherit}
                  >
                    <Status
                      testId="status2Id"
                      level={getSocketStatus(status2)}
                      size={STATUS_SIZE}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={toolTip3()}>
                  <IconButton
                    aria-label={t('label.socketStatus')}
                    sx={{ '&:hover': { backgroundColor: 'primary.dark' }, p: 1.3 }}
                    color={ButtonColorTypes.Inherit}
                  >
                    <Status
                      testId="status3Id"
                      level={getSocketStatus(status3)}
                      size={STATUS_SIZE}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={toolTip4()}>
                  <IconButton
                    aria-label={t('label.socketStatus')}
                    sx={{ '&:hover': { backgroundColor: 'primary.dark' }, p: 1.3 }}
                    color={ButtonColorTypes.Inherit}
                  >
                    <Status
                      testId="status4Id"
                      level={getSocketStatus(status4)}
                      size={STATUS_SIZE}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={t('label.settings')}>
                  <IconButton
                    aria-label={t('label.settings')}
                    sx={{ '&:hover': { backgroundColor: 'primary.dark' }, ml: 1 }}
                    color={ButtonColorTypes.Inherit}
                    onClick={handleClick}
                  >
                    <SummaryIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )}
        />
      </Card>
    </Box>
  );
};

Summary.defaultProps = {};

export default Summary;
