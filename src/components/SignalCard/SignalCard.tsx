/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Alert, ButtonColorTypes } from '@ska-telescope/ska-gui-components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SOCKET_STATUS } from '../../utils/constants';

export interface SignalCardProps {
  children?: JSX.Element;
  socketStatus?: string;
  title: string;
  showContent: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setShowContent: Function;
}

const SignalCard = ({
  children,
  socketStatus,
  title,
  showContent,
  setShowContent
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

  return (
    <Alert testId="signalCardId" key="alerts" severity={0}>
      <>
        <Grid container spacing={0} justifyContent="justify-left">
          <Grid item>
            <Typography variant="h4">{title}</Typography>
          </Grid>
          <Grid item>
            {!isDisabled() && (
              <Tooltip title={t('label.settings')}>
                <IconButton
                  aria-label={t('label.settings')}
                  sx={{ '&:hover': { backgroundColor: 'primary.dark' }, ml: 1 }}
                  onClick={handleToggle}
                  color={ButtonColorTypes.Inherit}
                >
                  {showContent ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
        {showContent && <Box sx={{ width: '80vw' }}>{children}</Box>}
      </>
    </Alert>
  );
};

SignalCard.defaultProps = {
  children: null,
  socketStatus: null
};

export default SignalCard;
