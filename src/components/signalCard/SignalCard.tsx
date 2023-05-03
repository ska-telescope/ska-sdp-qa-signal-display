import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormGroup, FormControlLabel, Grid, Tooltip } from '@mui/material';
import { Status } from '@ska-telescope/ska-gui-components';
import { STATUS_SIZE } from '../../utils/constants';

export interface SignalCardProps {
    actionTitle?: string;
    children?: JSX.Element;
    socketStatus?: string,
    subHeader?: string;
    title: string;
  }

const SignalCard = ({ actionTitle, children, socketStatus, subHeader, title }: SignalCardProps) => {
    const [showContent, setShowContent] = React.useState(true);
    const handleToggle = () => {
        setShowContent(!showContent);
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
                      <Checkbox checked={showContent} color="secondary" onChange={handleToggle} />
                    }
                    label="Show"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          )}
          subHeader={subHeader} 
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
    subHeader: null
  };

export default SignalCard;
