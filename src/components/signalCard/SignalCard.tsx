import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormGroup, FormControlLabel, Grid, Tooltip } from '@mui/material';
import { Status } from '@ska-telescope/ska-gui-components';

const STATUS_SIZE = 25;
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
    const [showLocalContent, setShowLocalContent] = React.useState(true);
    const handleToggle = () => {
        if (setShowContent) {
          setShowContent(!showContent);
        } else {
          setShowLocalContent(!showLocalContent);
        }
      };

      const getSocketStatus = () => {
        switch (socketStatus) {
          case 'connected': return 0;
          case 'unknown' : return 3;
          default : return 1;
        }
      }

  return (
    <Box m={1}>
      <Card style={{backgroundColor: "primary"}} variant="outlined">
        <CardHeader 
          action={(
            <Grid container>
              <Grid item>
                {socketStatus && (
                  <Tooltip title={actionTitle}>
                    <Button>
                      <Status level={getSocketStatus()} size={STATUS_SIZE} />
                    </Button>
                  </Tooltip>
            )}
              </Grid>
              <Grid item>
                <FormGroup>
                  <FormControlLabel 
                    control={
                      <Checkbox checked={setShowContent ? showContent : showLocalContent} color="secondary" onChange={handleToggle} />
                    }
                    label="Show"
                  />
                </FormGroup>
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
