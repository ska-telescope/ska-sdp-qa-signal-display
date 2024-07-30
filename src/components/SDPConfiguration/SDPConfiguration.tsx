/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Card, CardHeader, CardContent, Box, Stack } from '@mui/material';
import { StatusIcon } from '@ska-telescope/ska-gui-components';
import SignalCard from '../SignalCard/SignalCard';
import { SOCKET_STATUS } from '../../utils/constants';

interface SubarrayProps {
  subarray: Any;
  subarrayDetails: any;
}

function objectToString(obj) {
  if (obj === undefined) {
    return '';
  }
  return Object.keys(obj)
    .map(key => `${key} => ${obj[key]}`)
    .join(', ');
}

const displayElement = (eLabel: string, eValue: any, eId: string) => (
  <Grid container direction="row" justifyContent="space-around" alignItems="center">
    <Grid item xs={3}>
      <Typography id={eId} sx={{ align: 'right', fontWeight: 'normal' }} variant="body1">
        {eLabel}
      </Typography>
    </Grid>
    <Grid item xs={9}>
      <Typography
        data-testid={`${eId}Label`}
        id={`${eId}Label`}
        sx={{ align: 'left', fontWeight: 'bold' }}
        variant="body1"
      >
        {eValue}
      </Typography>
    </Grid>
  </Grid>
);

const SIZE = 30;
const STATUS_OK = 0;
const STATUS_ERROR = 1;
// const STATUS_PARTIAL = 3;
// const STATUS_INITIAL = 5;
const READY_STATUS = [STATUS_ERROR, STATUS_OK];

const SDPConfiguration = ({ subarray, subarrayDetails }: SubarrayProps) => {
  const { t } = useTranslation('signalDisplay');

  const [showDetailContent, setShowDetailContent] = React.useState(false);

  const showDetailToggle = () => {
    setShowDetailContent(!showDetailContent);
  };

  function getDeploymentNames() {
    if (subarrayDetails?.deployments == null) {
      return '';
    }
    const names = [];
    const metrics = [];
    let version = '';

    Object.entries(subarrayDetails?.deployments).forEach(([_key, deployments]) => {
      deployments?.deployment?.args?.values?.processors.forEach(processor => {
        if (processor.name.startsWith('signal-display-metrics-')) {
          metrics.push(processor.command[processor.command.length - 1]);
          version = processor.version;
        } else {
          names.push(`${processor.name}: ${processor.version}`);
        }
      });
    });

    if (metrics.length > 0) {
      names.push(`Signal Display Metrics [${metrics.join(',')}]: ${version}`);
    }
    return names.join(', ');
  }

  return (
    <SignalCard
      title={`${t('label.currently_running.title')}`}
      socketStatus={SOCKET_STATUS[subarrayDetails === null ? 1 : 2]}
      showContent={showDetailContent}
      setShowContent={showDetailToggle}
    >
      <Stack spacing={1}>
        <Card variant="outlined">
          <CardHeader
            component={Box}
            title={`${t('label.subArray')}: ${subarray}`}
            avatar={
              <StatusIcon
                ariaTitle=""
                ariaDescription=""
                testId="statusIdSubarray"
                icon
                level={READY_STATUS[subarrayDetails?.subarray?.state_commanded === 'ON' ? 1 : 0]}
                size={SIZE}
                text=""
              />
            }
            titleTypographyProps={{
              align: 'center',
              fontWeight: 'bold',
              variant: 'h5'
            }}
          />
          <CardContent>
            {displayElement(
              t('label.currently_running.configured_nodes'),
              subarrayDetails?.subarray?.resources?.receive_nodes,
              'subarray_configured_nodes'
            )}
            {displayElement(
              t('label.currently_running.receptors'),
              subarrayDetails?.subarray?.resources?.receptors?.join(', '),
              'subarray_receptors'
            )}
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader
            component={Box}
            title={`${t('label.execution_block')}: ${subarrayDetails?.execution_block?.eb_id}`}
            avatar={
              <StatusIcon
                ariaTitle=""
                ariaDescription=""
                testId="statusIdExecutionBlock"
                icon
                level={READY_STATUS[subarrayDetails?.execution_block?.status === 'ACTIVE' ? 1 : 0]}
                size={SIZE}
                text=""
              />
            }
            titleTypographyProps={{
              align: 'center',
              fontWeight: 'bold',
              variant: 'h5'
            }}
          />
          <CardContent>
            {displayElement(
              t('label.currently_running.status'),
              subarrayDetails?.execution_block?.status,
              'eb_status'
            )}
            {displayElement(
              t('label.currently_running.scan_type'),
              subarrayDetails?.execution_block?.current_scan_type,
              'eb_scan_type'
            )}
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader
            component={Box}
            title={`${t('label.processing_block')}: ${
              subarrayDetails?.execution_block?.pb_realtime
            }`}
            avatar={
              <StatusIcon
                ariaTitle=""
                ariaDescription=""
                testId="statusIdProcessingBLock"
                icon
                level={
                  READY_STATUS[
                    subarrayDetails?.processing_block_state?.status === 'READY' &&
                    subarrayDetails?.processing_block_state?.resources_available &&
                    subarrayDetails?.processing_block_state?.deployments_ready
                      ? 1
                      : 0
                  ]
                }
                size={SIZE}
                text=""
              />
            }
            titleTypographyProps={{
              align: 'center',
              fontWeight: 'bold',
              variant: 'h5'
            }}
          />
          <CardContent>
            {displayElement(
              t('label.currently_running.processing_block_state'),
              subarrayDetails?.processing_block_state?.status,
              'pb_status'
            )}
            {displayElement(
              t('label.currently_running.processing_block_state_last_update'),
              subarrayDetails?.processing_block_state?.last_updated,
              'pb_status_last_update'
            )}
            {displayElement(
              t('label.currently_running.resources_available'),
              subarrayDetails?.processing_block_state?.resources_available ? 'yes' : 'no',
              'pb_resources_available'
            )}
            {displayElement(
              t('label.currently_running.deployments_ready'),
              subarrayDetails?.processing_block_state?.deployments_ready ? 'yes' : 'no',
              'pb_deployments_ready'
            )}
            {displayElement(
              t('label.currently_running.processing_block_deployments'),
              objectToString(subarrayDetails?.processing_block_state?.deployments),
              'pb_deployments'
            )}
            {displayElement(
              t('label.currently_running.script'),
              `${subarrayDetails?.processing_block?.script?.kind}/${subarrayDetails?.processing_block?.script?.name}/${subarrayDetails?.processing_block?.script?.version}`,
              'pb_script'
            )}
            {displayElement(
              t('label.currently_running.processors_configured'),
              subarrayDetails?.processing_block?.processors.join(', '),
              'pb_processors'
            )}
            {displayElement(
              t('label.currently_running.processors_running'),
              getDeploymentNames(),
              'pb_processors_deployed'
            )}
          </CardContent>
        </Card>
      </Stack>
    </SignalCard>
  );
};
export default SDPConfiguration;
