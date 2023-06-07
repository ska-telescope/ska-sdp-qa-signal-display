/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, CardHeader, Grid, IconButton, Tooltip } from '@mui/material';
import { Status } from '@ska-telescope/ska-gui-components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SOCKET_STATUS } from '../../Utils/constants';

const STATUS_SIZE = 20;
export interface SignalCardProps {
    actionTitle?: string;
    children?: JSX.Element;
    socketStatus?: string,
    subheader?: string;
    title: string;
    showContent: boolean, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    setShowContent: Function
  }

const SignalCard = ({ actionTitle, children, socketStatus, subheader, title, showContent, setShowContent }: SignalCardProps) => {
  const { t } = useTranslation();

  const handleToggle = () => {
      setShowContent(!showContent);
    };

    const getSocketStatus = () => {
      switch (socketStatus) {
        case SOCKET_STATUS[2]: return 0;
        case SOCKET_STATUS[3]: return 9;      // This value suppresses the Status Component
        case SOCKET_STATUS[0]: return 3;
        default : return 1;                   // Everything else shown as an error
      }
    }

  return (
    <Box m={1}>
      <Card style={{backgroundColor: "primary"}} variant="outlined">
        <CardHeader 
          action={(
            <Grid container spacing={0}>
              <Grid item>
                {socketStatus && (
                  <Tooltip title={actionTitle}>
                    <IconButton
                      aria-label={t('label.socketStatus')}
                      sx={{ '&:hover': { backgroundColor: 'primary.dark' }, p: 1.3 }}
                      onClick={handleToggle}
                      color="inherit"
                    >
                      <Status level={getSocketStatus()} size={STATUS_SIZE} />
                    </IconButton>
                  </Tooltip>
            )}
              </Grid>
              <Grid item>
                <Tooltip title={t('label.hideShowToggle')}>
                  <IconButton
                    aria-label={t('label.hideShowToggle')}
                    sx={{ '&:hover': { backgroundColor: 'primary.dark' }, ml: 1 }}
                    onClick={handleToggle}
                    color="inherit"
                  >
                    {showContent ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )}
          subheader={subheader} 
          title={title} 
        />
        {showContent && (
        <CardContent>
          {children}
        </CardContent>
)}
      </Card>
    </Box>
  );
};

SignalCard.defaultProps = {
    actionTitle: null,
    children: null,
    socketStatus: null,
    subheader: null
  };

export default SignalCard;
