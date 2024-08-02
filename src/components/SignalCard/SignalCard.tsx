/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Alert, ButtonColorTypes } from '@ska-telescope/ska-gui-components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SOCKET_STATUS } from '../../utils/constants';
import InfoModal from '../InfoModal/InfoModal';

export interface SignalCardProps {
  children?: JSX.Element;
  action?: JSX.Element;
  action2?: JSX.Element;
  socketStatus?: string;
  title: string;
  showContent: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setShowContent: Function;
  showInfoModal?: string;
  infoTitle?: string;
  infoContent?: string;
  infoSite?: string;
}

const SignalCard = ({
  action = null,
  action2,
  children = null,
  socketStatus = null,
  title,
  showContent,
  setShowContent,
  showInfoModal,
  infoTitle,
  infoContent,
  infoSite
}: SignalCardProps) => {
  const { t } = useTranslation('signalDisplay');

  const handleToggle = () => {
    setShowContent(!showContent);
  };

  const getSocketStatus = () => {
    switch (socketStatus) {
      case SOCKET_STATUS[2]:
        return 0;
      case SOCKET_STATUS[3]:
        return 9; // This value suppresses the Status Component
      case SOCKET_STATUS[0]:
        return 3;
      default:
        return 1; // Everything else shown as an error
    }
  };

  const isDisabled = () => {
    const status = getSocketStatus();
    return status > 1 && status < 4;
  };

  const actionButtons = () => (
    <>
      {!isDisabled() && (
        <Grid container spacing={0} justifyContent="justify-right">
          {action2 && <Grid item>{action2}</Grid>}
          {action && <Grid item>{action}</Grid>}
          <Grid item>
            {showInfoModal === 'true' && (
              <InfoModal title={infoTitle} content={infoContent} site={infoSite} />
            )}
          </Grid>
          <Grid item>
            <Tooltip title={t('label.settings')}>
              <IconButton
                aria-label={t('label.settings')}
                data-testid="hideShowToggle"
                sx={{ '&:hover': { backgroundColor: 'primary.dark' }, ml: 1 }}
                onClick={handleToggle}
                color={ButtonColorTypes.Inherit}
              >
                {showContent ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      )}
    </>
  );

  return (
    <Alert action={actionButtons()} testId="signalCardId" key="alerts" severity={0}>
      <Box width="80vw">
        <Typography data-testid="sectionHeader" variant="h5">
          {title}
        </Typography>
        {showContent && <>{children}</>}
      </Box>
    </Alert>
  );
};

export default SignalCard;
