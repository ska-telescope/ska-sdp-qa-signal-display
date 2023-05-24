/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, CardHeader, Grid, IconButton, Tooltip } from '@mui/material';
import { Status } from '@ska-telescope/ska-gui-components';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const STATUS_SIZE = 20;
export interface SignalCardProps {
    actionTitle?: string;
    children?: JSX.Element;
    socketStatus?: string,
    subheader?: string;
    title: string;
    showContent?: boolean, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    setShowContent?: Function
  }

const SignalCard = ({ actionTitle, children, socketStatus, subheader, title, showContent, setShowContent }: SignalCardProps) => {
  const { t } = useTranslation();
  const [showLocalContent, setShowLocalContent] = React.useState(true);
  const isProvided = setShowContent;

  const handleToggle = () => {
      if (isProvided) {
        setShowContent(!showContent);
      } else {
        setShowLocalContent(!showLocalContent);
      }
    };

    const getSocketStatus = () => {
      switch (socketStatus) {
        case 'connected': return 0;
        case 'local': return 9;     // This value suppresses the Status Component
        case 'unknown' : return 3;
        default : return 1;
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
                    {(isProvided ? showContent : showLocalContent) ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )}
          subheader={subheader} 
          title={title} 
        />
        {(setShowContent ? showContent : showLocalContent) && (
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
    subheader: null,
    showContent: null, 
    setShowContent: null
  };

export default SignalCard;
