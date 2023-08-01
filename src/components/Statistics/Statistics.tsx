import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import mockStatisticsProcessingBlock from '../../mockData/Statistics/processingBlock';
import mockStatisticsReceiverEvents from '../../mockData/Statistics/receiverEvents';
import SignalCard from '../SignalCard/SignalCard';
import { DATA_LOCAL, DATA_API_URL, SOCKET_STATUS } from '../../utils/constants';

const CONVERT = 1000;
const WORKFLOW_STATISTICS_INTERVAL_SECONDS =
  Number(process.env.REACT_APP_WORKFLOW_STATISTICS_INTERVAL_SECONDS) * CONVERT;

function epochToDate(timeInMilliseconds: number) {
  if (timeInMilliseconds === undefined || timeInMilliseconds === null) {
    return null;
  }
  return new Date(timeInMilliseconds * CONVERT);
}

interface StatisticsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
}

const Statistics = ({ config }: StatisticsProps) => {
  const { t } = useTranslation('signalDisplay');

  const [showBasicContent, setShowBasicContent] = React.useState(false);
  const [showDetailContent, setShowDetailContent] = React.useState(false);
  const [processingBlockStatisticsData, setProcessingBlockStatisticsData] = React.useState(null);
  const [receiverEventsData, setReceiverEventsData] = React.useState(null);

  async function retrieveProcessingBlockStatisticsData() {
    await fetch(`${DATA_API_URL}${config.paths.processing_blocks}/latest/statistics`)
      .then(response => response.json())
      .then(data => {
        setProcessingBlockStatisticsData(data);
        setTimeout(retrieveProcessingBlockStatisticsData, WORKFLOW_STATISTICS_INTERVAL_SECONDS);
      })
      .catch(() => null);
  }

  async function retrieveReceiverEventData() {
    await fetch(`${DATA_API_URL}${config.paths.spead2_scans}/latest/latest_event`)
      .then(response => response.json())
      .then(data => {
        setReceiverEventsData(data);
        setTimeout(retrieveReceiverEventData, WORKFLOW_STATISTICS_INTERVAL_SECONDS);
      })
      .catch(() => null);
  }

  const canShowBasic = () => processingBlockStatisticsData !== null;

  const canShowDetail = () => receiverEventsData !== null;

  const showBasicToggle = () => {
    setShowBasicContent(showBasicContent ? false : canShowBasic());
  };

  const showDetailToggle = () => {
    setShowDetailContent(showDetailContent ? false : canShowDetail());
  };

  React.useEffect(() => {
    if (DATA_LOCAL) {
      setProcessingBlockStatisticsData(mockStatisticsProcessingBlock);
      setReceiverEventsData(mockStatisticsReceiverEvents);
    } else if (config !== null) {
      retrieveProcessingBlockStatisticsData();
      retrieveReceiverEventData();
    }
  }, [config]);

  return (
    <>
      <SignalCard
        title={t('label.statisticsDetailed')}
        socketStatus={SOCKET_STATUS[processingBlockStatisticsData === null ? 1 : 2]}
        showContent={showBasicContent}
        setShowContent={showBasicToggle}
      >
        <div id="statistics-detailed-Id" data-testid="statistics-detailed-Id">
          {processingBlockStatisticsData?.time && (
            <Grid container direction="row" justifyContent="space-between">
              <Grid data-testid="timeDetails" item md={4} sm={6} xs={12}>
                <Typography variant="h5" paragraph>
                  {t('label.time')}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.lastAPIRefresh')}
                  {': '}
                  {t('date_time', { date: epochToDate(processingBlockStatisticsData?.time?.now) })}
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
                <Typography variant="h5" paragraph>
                  {t('label.statistics')}
                </Typography>
                <Typography variant="subtitle1">
                  {t('label.ingestionRate')}
                  {': '}
                  {Math.round(
                    (processingBlockStatisticsData?.statistics?.ingestion_rate || 0) * 100
                  ) / 100}{' '}
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
                <Typography variant="h5" paragraph>
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
        </div>
      </SignalCard>
      <SignalCard
        title={t('label.statisticsReceiver')}
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
    </>
  );
};
export default Statistics;
