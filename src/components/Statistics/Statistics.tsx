/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import SignalCard from '../SignalCard/SignalCard';
import { QASettings } from '../Settings/qaSettings';

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
  displaySettings: typeof QASettings;
  socketStatusProcessingBlockStatistics: string;
  socketStatusReceiverEvents: string;
}

const Statistics = ({
  processingBlockStatisticsData,
  receiverEventsData,
  displaySettings,
  socketStatusProcessingBlockStatistics,
  socketStatusReceiverEvents
}: StatisticsProps) => {
  const { t } = useTranslation('signalDisplay');

  const [showBasicContent, setShowBasicContent] = React.useState(false);
  const [showDetailContent, setShowDetailContent] = React.useState(false);
  const [startTime, setStartTime] = React.useState(null);
  const [ingestionRate, setIngestionRate] = React.useState(null);
  const [receiveActive, setReceiveActive] = React.useState(false);

  const showBasicToggle = () => {
    setShowBasicContent(!showBasicContent);
  };

  const showDetailToggle = () => {
    setShowDetailContent(!showDetailContent);
  };

  React.useEffect(() => {
    if (processingBlockStatisticsData?.state === 'new') {
      setStartTime(processingBlockStatisticsData.time);
    }
    const time = processingBlockStatisticsData?.time;

    if (time !== null) {
      if (startTime > 0 && time > 0 && time > startTime) {
        const payloadsReceived = processingBlockStatisticsData.payloads_received
          ? processingBlockStatisticsData.payloads_received
          : 0;
        const rate = payloadsReceived / (time - startTime);
        setIngestionRate(Math.round(rate * 100) / 100);
      }
      if (Date.now() - time > 10) {
        setReceiveActive(true);
      }
    }
  }, [processingBlockStatisticsData]);

  return (
    <>
      {displaySettings.showStatisticsDetailed && (
        <SignalCard
          title={`${t('label.statistics')} - ${t('label.detailed')}`}
          socketStatus={socketStatusProcessingBlockStatistics}
          showContent={showBasicContent}
          setShowContent={showBasicToggle}
        >
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
                  date: epochToDate(Date.now() / CONVERT)
                })}
              </Typography>
              <Typography variant="subtitle1">
                {t('label.lastUpdated')}
                {': '}
                {t('date_time', {
                  date: epochToDate(processingBlockStatisticsData?.time)
                })}
              </Typography>
              <Typography variant="subtitle1">
                {t('label.start')}
                {': '}
                {t('date_time', {
                  date: epochToDate(startTime)
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
                {ingestionRate} {t('units.ingestionRate')}
              </Typography>
              <Typography variant="subtitle1">
                {t('label.payloadsReceived')}
                {': '}
                {processingBlockStatisticsData?.payloads_received}
              </Typography>
              <Typography variant="subtitle1">
                {t('label.visibilityReceiveActive')}
                {': '}
                {t(receiveActive ? 'label.yes' : 'label.no')}
              </Typography>
            </Grid>
            <Grid data-testid="workflowDetails" item md={4} sm={6} xs={12}>
              <Typography variant="h6" paragraph>
                {t('label.workflow')}
              </Typography>
              <Typography variant="subtitle1">
                {t('label.state')}
                {': '}
                {processingBlockStatisticsData?.state}
              </Typography>
              <Typography variant="subtitle1">
                {t('label.scanId')}
                {': '}
                {processingBlockStatisticsData?.scan_id}
              </Typography>
              <Typography variant="subtitle1">
                {t('label.processingBlockId')}
                {': '}
                {processingBlockStatisticsData?.processing_block_id}
              </Typography>
              <Typography variant="subtitle1">
                {t('label.executingBlockId')}
                {': '}
                {processingBlockStatisticsData?.execution_block_id}
              </Typography>
              <Typography variant="subtitle1">
                {t('label.subArray')}
                {': '}
                {processingBlockStatisticsData?.subarray}
              </Typography>
              <Typography variant="subtitle1">
                {t('label.timeSincePayload')}
                {': '}
                {processingBlockStatisticsData?.time_since_last_payload}
              </Typography>
            </Grid>
          </Grid>
        </SignalCard>
      )}
      {displaySettings.showStatisticsReceiver && (
        <SignalCard
          title={`${t('label.statistics')} - ${t('label.receiver')}`}
          socketStatus={socketStatusReceiverEvents}
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
                    {Math.round((receiverEventsData?.total_megabytes || 0) * 100) / 100}{' '}
                    {t('units.totalDataReceived')}
                  </Typography>
                  <Typography variant="subtitle1">
                    {t('label.currentSpeed')}
                    {': '}
                    {Math.round(
                      ((receiverEventsData?.total_megabytes || 0) /
                        (receiverEventsData?.duration || 1)) *
                        100
                    ) / 100}{' '}
                    {t('units.currentSpeed')}
                  </Typography>
                  <Typography variant="subtitle1">
                    {t('label.durationCurrentTransfer')}
                    {': '}
                    {Math.round(receiverEventsData?.duration)} {t('units.durationCurrentTransfer')}
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
