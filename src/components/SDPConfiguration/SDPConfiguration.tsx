/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Card, CardHeader, CardContent, Box, Stack } from '@mui/material';
import { StatusIcon } from '@ska-telescope/ska-gui-components';
import SignalCard from '../SignalCard/SignalCard';
import { DATA_API_URL, SOCKET_STATUS, DATA_LOCAL } from '../../utils/constants';
import {
  processingBlockDetail,
  processingBlockDetailState,
  executionBlockDetail,
  subarrayDetail
} from '../../mockData/Statistics/configEndpoints';

interface SubarrayProps {
  subarray: any;
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
      <Typography data-testid={`${eId}Label`} id={`${eId}Label`} sx={{ align: 'left', fontWeight: 'bold' }} variant="body1">
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

const SDPConfiguration = ({ subarray }: SubarrayProps) => {
  const { t } = useTranslation('signalDisplay');

  const [showDetailContent, setShowDetailContent] = React.useState(false);
  const [subarrayDetails, setSubarrayDetails] = React.useState(null);
  const [executionBlockDetails, setExecutionBlockDetails] = React.useState(null);
  const [processingBlockDetails, setProcessingBlockDetails] = React.useState(null);
  const [processingBlockState, setProcessingBlockState] = React.useState(null);

  const showDetailToggle = () => {
    setShowDetailContent(!showDetailContent);
  };

  /* Check for changes in subarray: */
  React.useEffect(() => {
    async function fetchProcessingBlockDetails(processingBlock) {
      await fetch(`${DATA_API_URL}/config/processing_blocks/${processingBlock}`)
        .then(response => response.json())
        .then(data => {
          setProcessingBlockDetails(data);
        })
        .catch(() => null);
      await fetch(`${DATA_API_URL}/config/processing_blocks/${processingBlock}/state`)
        .then(response => response.json())
        .then(data => {
          setProcessingBlockState(data);
        })
        .catch(() => null);
    }

    async function fetchExecutionBlockDetails(executionBlock) {
      await fetch(`${DATA_API_URL}/config/execution_blocks/${executionBlock}`)
        .then(response => response.json())
        .then(data => {
          setExecutionBlockDetails(data);
          fetchProcessingBlockDetails(data.pb_realtime[0]);
        })
        .catch(() => null);
    }

    async function fetchSubarrayDetails() {
      await fetch(`${DATA_API_URL}/config/subarrays/${subarray}`)
        .then(response => response.json())
        .then(data => {
          setSubarrayDetails(data);
          fetchExecutionBlockDetails(data.eb_id);
          setTimeout(fetchSubarrayDetails, 30000);
        })
        .catch(() => null);
    }

    if (DATA_LOCAL) {
      setShowDetailContent(true);
      setProcessingBlockDetails(processingBlockDetail);
      setProcessingBlockState(processingBlockDetailState);
      setExecutionBlockDetails(executionBlockDetail);
      setSubarrayDetails(subarrayDetail);
    } else {
      if (subarray !== '') {
        setShowDetailContent(true);
        fetchSubarrayDetails();
      }
    }
  }, [subarray]);

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
                testId="statusId"
                icon
                level={READY_STATUS[subarrayDetails?.state_commanded === 'ON' ? 1 : 0]}
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
              t('label.currently_running.last_command'),
              subarrayDetails?.last_command,
              'subarray_last_command'
            )}
            {displayElement(
              t('label.currently_running.last_command_time'),
              subarrayDetails?.last_command_time,
              'subarray_last_command_time'
            )}
            {displayElement(
              t('label.currently_running.subarray_state'),
              subarrayDetails?.obs_state_commanded,
              'subarray_subarray_state'
            )}
            {displayElement(
              t('label.currently_running.subarray_state_current'),
              subarrayDetails?.state_commanded,
              'subarray_subarray_state_current'
            )}
            {displayElement(
              t('label.currently_running.configured_nodes'),
              subarrayDetails?.resources?.receive_nodes,
              'subarray_configured_nodes'
            )}
            {displayElement(
              t('label.currently_running.receptors'),
              subarrayDetails?.resources?.receptors.join(', '),
              'subarray_receptors'
            )}
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader
            component={Box}
            title={`${t('label.execution_block')}: ${subarrayDetails?.eb_id}`}
            avatar={
              <StatusIcon
                ariaTitle=""
                ariaDescription=""
                testId="statusId"
                icon
                level={READY_STATUS[executionBlockDetails?.status === 'ACTIVE' ? 1 : 0]}
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
              executionBlockDetails?.status,
              'eb_status'
            )}
            {displayElement(
              t('label.currently_running.scan_type'),
              executionBlockDetails?.current_scan_type,
              'eb_scan_type'
            )}
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardHeader
            component={Box}
            title={`${t('label.processing_block')}: ${executionBlockDetails?.pb_realtime}`}
            avatar={
              <StatusIcon
                ariaTitle=""
                ariaDescription=""
                testId="statusId"
                icon
                level={
                  READY_STATUS[
                    processingBlockState?.status === 'READY' &&
                    processingBlockState?.resources_available &&
                    processingBlockState?.deployments_ready
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
              processingBlockState?.status,
              'pb_status'
            )}
            {displayElement(
              t('label.currently_running.processing_block_state_last_update'),
              processingBlockState?.last_updated,
              'pb_status_last_update'
            )}
            {displayElement(
              t('label.currently_running.resources_available'),
              processingBlockState?.resources_available ? 'yes' : 'no',
              'pb_resources_available'
            )}
            {displayElement(
              t('label.currently_running.deployments_ready'),
              processingBlockState?.deployments_ready ? 'yes' : 'no',
              'pb_deployments_ready'
            )}
            {displayElement(
              t('label.currently_running.processing_block_deployments'),
              objectToString(processingBlockState?.deployments),
              'pb_deployments'
            )}
            {displayElement(
              t('label.currently_running.script'),
              `${processingBlockDetails?.script?.kind}/${processingBlockDetails?.script?.name}/${processingBlockDetails?.script?.version}`,
              'pb_script'
            )}
            {displayElement(
              t('label.currently_running.processors'),
              processingBlockDetails?.processors.join(', '),
              'pb_processors'
            )}
          </CardContent>
        </Card>
      </Stack>
    </SignalCard>
  );
};
export default SDPConfiguration;
