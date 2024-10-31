/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';

interface GainCalibrationProps {
  data: object;
  displaySettings: any;
  gain: string;
  redraw: boolean;
  resize: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  socketStatus: string;
}

const RATIO = 2;

const GainCalibration = ({
  data,
  displaySettings,
  gain,
  redraw,
  resize,
  socketStatus
}: GainCalibrationProps) => {
  const { t } = useTranslation('signalDisplay');

  const [chartData, setChartData] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const chartTitle = () => '';

  const xLabel = () => `${t('label.time')}`;

  const selector = React.useMemo(() => {
    switch (gain) {
      case 'amplitudeH':
        return ['gains', 0];
      case 'amplitudeV':
        return ['gains', 3];
      case 'phaseH':
        return ['phases', 0];
      case 'phaseV':
        return ['phases', 3];
      default:
        return ['', null];
    }
  }, [gain]);

  const yLabel = React.useMemo(() => selector[0], [selector]);

  const getChartData = (usedData: any) => {
    const [selection, index] = selector;
    return usedData[0][selection].map((_: any, i: number) => ({
      x: usedData.map((datum: any) => datum.time[0]),
      y: usedData.map((datum: any) => datum[selection][i][index]),
      mode: 'markers+lines'
    }));
  };

  const canShow = () => data && data[0];

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  function parentWidth() {
    const width = window.innerWidth;
    return displaySettings.gridView ? Math.min(700, width) : Math.min(1400, width);
  }

  function canShowChart() {
    switch (gain) {
      case 'amplitudeH':
        return displaySettings.showGainCalibrationAmplitudeH;
      case 'amplitudeV':
        return displaySettings.showGainCalibrationAmplitudeV;
      case 'phaseH':
        return displaySettings.showGainCalibrationPhaseH;
      case 'phaseV':
        return displaySettings.showGainCalibrationPhaseV;
      default:
        return false;
    }
  }

  React.useEffect(() => {
    const firstRender = chartData === null;
    if (data[0] != null) {
      setChartData(getChartData(data));
    }
    if (firstRender) {
      setShowContent(canShow());
    }
  }, [data, redraw]);

  React.useEffect(() => {
    if (!refresh) setShowContent(canShow());
    else setRefresh(false);
  }, [refresh]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [resize]);

  return (
    <>
      {canShowChart() && (
        <SignalCard
          action={<></>}
          data-testid="signalCardId"
          title={`${t(`label.${gain}`)}`}
          socketStatus={socketStatus}
          showContent={showContent}
          setShowContent={showToggle}
          showInfoModal="true"
          infoTitle={t(`modalInfo.${gain}.title`)}
          infoContent={t(`modalInfo.${gain}.content`)}
          infoSite={t(`modalInfo.${gain}.site`)}
        >
          <Plotly
            darkMode={darkMode}
            data={showContent ? chartData : null}
            height={parentWidth() / RATIO}
            title={chartTitle()}
            width={parentWidth()}
            xLabel={xLabel()}
            yLabel={yLabel}
          />
        </SignalCard>
      )}
    </>
  );
};
export default GainCalibration;
