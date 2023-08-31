/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import SignalCard from '../SignalCard/SignalCard';
import { SOCKET_STATUS } from '../../utils/constants';

const CONVERT = 1000;

function epochToDate(timeInMilliseconds: number) {
  if (timeInMilliseconds === undefined || timeInMilliseconds === null) {
    return null;
  }
  return new Date(timeInMilliseconds * CONVERT);
}

interface StatisticsProps {
  processingBlockStatisticsData: any;
  receiverEventsData: any;
  displaySettings: any;
}

const Statistics = ({
  processingBlockStatisticsData,
  receiverEventsData,
  displaySettings
}: StatisticsProps) => {
  const { t } = useTranslation('signalDisplay');

  const [showBasicContent, setShowBasicContent] = React.useState(false);
  const [showDetailContent, setShowDetailContent] = React.useState(false);

  const canShowBasic = () => processingBlockStatisticsData !== null;

  const canShowDetail = () => receiverEventsData !== null;

  const showBasicToggle = () => {
    setShowBasicContent(showBasicContent ? false : canShowBasic());
  };

  const showDetailToggle = () => {
    setShowDetailContent(showDetailContent ? false : canShowDetail());
  };

  return (
    <>
      {displaySettings.showStatisticsDetailed && (
        <SignalCard
          testId="statDetailed"
          title={`${t('label.statistics')} - ${t('label.detailed')}`}
          socketStatus={SOCKET_STATUS[processingBlockStatisticsData === null ? 1 : 2]}
          showContent={showBasicContent}
          setShowContent={showBasicToggle}
        >
          {processingBlockStatisticsData?.time && (
            <Grid
              data-testid="statistics-detailed-Id"
              container
              direction="row"
              justifyContent="space-between"
              width="100%"
            >
              <Grid data-testid="timeDetails" item md={4} sm={6} xs={12}>
                <Typography variant="h6" paragraph>
                  {t('label.time')}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.lastAPIRefresh')}
                  {': '}
                  {t('date_time', {
                    date: epochToDate(processingBlockStatisticsData?.time?.now)
                  })}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.lastUpdated')}
                  {': '}
                  {t('date_time', {
                    date: epochToDate(processingBlockStatisticsData?.time?.last_update)
                  })}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.start')}
                  {': '}
                  {t('date_time', {
                    date: epochToDate(processingBlockStatisticsData?.time?.start)
                  })}
                </Typography>
              </Grid>
              <Grid data-testid="statisticsDetails" item md={4} sm={6} xs={12}>
                <Typography variant="h6" paragraph>
                  {t('label.statistics')}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.ingestionRate')}
                  {': '}
                  {Math.round(
                    (processingBlockStatisticsData?.statistics?.ingestion_rate || 0) * 100
                  ) / 100}
                  {' '}
                  {t('units.ingestionRate')}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.payloadsReceived')}
                  {': '}
                  {processingBlockStatisticsData?.statistics?.payloads_received}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.visibilityReceiveActive')}
                  {': '}
                  {t(
                    processingBlockStatisticsData?.statistics?.receive_active
                      ? 'label.yes'
                      : 'label.no'
                  )}
                </Typography>
              </Grid>
              <Grid data-testid="workflowDetails" item md={4} sm={6} xs={12}>
                <Typography variant="h6" paragraph>
                  {t('label.workflow')}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.state')}
                  {': '}
                  {processingBlockStatisticsData?.processing_block?.state}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.scanId')}
                  {': '}
                  {processingBlockStatisticsData?.processing_block?.scan_id}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.processingBlockId')}
                  {': '}
                  {processingBlockStatisticsData?.processing_block?.processing_block_id}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.executingBlockId')}
                  {': '}
                  {processingBlockStatisticsData?.processing_block?.execution_block_id}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.subArray')}
                  {': '}
                  {processingBlockStatisticsData?.processing_block?.subarray}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.timeSincePayload')}
                  {': '}
                  {processingBlockStatisticsData?.processing_block?.time_since_last_payload}
                </Typography>
              </Grid>
            </Grid>
          )}
        </SignalCard>
      )}
      {displaySettings.showStatisticsReceiver && (
        <SignalCard
          testId="statReceiver"
          title={`${t('label.statistics')} - ${t('label.receiver')}`}
          socketStatus={SOCKET_STATUS[receiverEventsData === null ? 1 : 2]}
          showContent={showDetailContent}
          setShowContent={showDetailToggle}
        >
          <div id="statistics-receiver-events" data-testid="statistics-receiver-events">
            {receiverEventsData?.time && (
              <Grid container spacing={2}>
                <Grid data-testid="currentScanDetails" item sm={4} xs={12}>
                  <Typography variant="subtitle1">
                    {t('label.state')}
                    {': '}
                    {t('date_time', { date: epochToDate(receiverEventsData?.time) })}
                  </Typography>
                  <Typography variant="subtitle1">
                    {t('label.currentScanId')}
                    {': '}
                    {receiverEventsData?.scan_id}
                  </Typography>
                </Grid>
                <Grid data-testid="heapDetails" item sm={4} xs={12}>
                  <Typography variant="subtitle1">
                    {t('label.numberHeaps')}
                    {': '}
                    {receiverEventsData?.num_heaps}
                  </Typography>
                  <Typography variant="subtitle1">
                    {t('label.numberHeapsIncomplete')}
                    {': '}
                    {receiverEventsData?.num_incomplete}
                  </Typography>
                </Grid>
                <Grid data-testid="dataReceivedDetails" item sm={4} xs={12}>
                  <Typography variant="subtitle1">
                    {t('label.totalDataReceived')}
                    {': '}
                    {Math.round((receiverEventsData?.total_megabytes || 0) * 100) / 100}
                    {' '}
                    {t('units.totalDataReceived')}
                  </Typography>
                  <Typography variant="subtitle1">
                    {t('label.currentSpeed')}
                    {': '}
                    {Math.round(
                      ((receiverEventsData?.total_megabytes || 0) /
                        (receiverEventsData?.duration || 1)) *
                        100
                    ) / 100}
                    {' '}
                    {t('units.currentSpeed')}
                  </Typography>
                  <Typography variant="subtitle1">
                    {t('label.durationCurrentTransfer')}
                    {': '}
                    {Math.round(receiverEventsData?.duration)} 
                    {' '}
                    {t('units.durationCurrentTransfer')}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </div>
        </SignalCard>
      )}
    </>
  );
};
export default Statistics;
