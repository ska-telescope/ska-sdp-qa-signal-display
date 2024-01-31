/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';
import { COLOR } from '../../utils/constants';

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

  const yLabel = () => `${t('label.gains')}`;

  const canShow = () => data !== null;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  function parentWidth() {
    // TODO : Make this responsive
    if (displaySettings.gridView) {
    return 700;
    } 
      return 1400
    
  }

  function getYData(inData: any, gainStr: string, subarray: string) {
    return inData[gainStr][subarray]
  }
  function getChartData(usedData: any) {
    const xValues = usedData.times;
    const chartDataTmp = [
      {
        x: xValues,
        y: getYData(usedData, gain, "m033"),
        marker: {
          color: COLOR[0]
        }
      }
    ];
    return chartDataTmp;
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
    if (data) {
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
          showInfoModal='true'
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
            yLabel={yLabel()}
          />
        </SignalCard>
      )}
    </>
  );
};
export default GainCalibration;