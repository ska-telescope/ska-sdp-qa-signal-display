/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';
import { COLOR } from '../../utils/constants';
import { QASettings } from '../Settings/qaSettings';

interface WeightDistributionPlotProps {
  data: Array<any>;
  displaySettings: typeof QASettings;
  polarization: string;
  redraw: boolean;
  resize: number;
  socketStatus: string;
}

const RATIO = 2;

const WeightDistributionPlot = ({
  data,
  displaySettings,
  polarization,
  redraw,
  resize,
  socketStatus
}: WeightDistributionPlotProps) => {
  const { t } = useTranslation('signalDisplay');

  const [chartData, setChartData] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();
  const [midFreq, setMidFreq] = React.useState(null);

  const chartTitle = () => '';

  const xLabel = () => `${t('label.u')} (${t('units.numberOfWavelengths')})`;

  const yLabel = () => `${t('label.v')} (${t(`units.numberOfWavelengths`)})`;

  const canShow = () => data !== null;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  function parentWidth() {
    // TODO : Make this responsive
    if (displaySettings.gridView) {
      return 700;
    }
    return 1400;
  }

  function calculateMidFrequency(usedData: any) {
    const minFreq = usedData.spectral_window.freq_min;
    const maxFreq = usedData.spectral_window.freq_max;
    return minFreq + (maxFreq - minFreq) / 2;
  }

  function getUVWData(usedData: any, polar: string) {
    const uValues = [];
    const vValues = [];
    function extractValues(element) {
      const filteredData = element.data.filter(
        uvCoveragePayload => uvCoveragePayload.polarisation === polar
      );
      filteredData.forEach((datum: any) => {
        uValues.push(datum.u * datum.weight);
        uValues.push(-1 * datum.u * datum.weight);
        vValues.push(datum.v * datum.weight);
        vValues.push(-1 * datum.v * datum.weight);
      });
    }
    usedData.forEach(extractValues);
    return [uValues, vValues];
  }

  function getChartData(usedData: any) {
    const uvwData = getUVWData(usedData, polarization);
    return [
      {
        x: uvwData[0],
        y: uvwData[1],
        marker: {
          color: COLOR[2]
        },
        mode: 'markers+text',
        type: 'scatter'
      }
    ];
  }

  function canShowChart() {
    switch (polarization) {
      case 'XX':
        return displaySettings.showWeightDistributionXX;
      case 'XY':
        return displaySettings.showWeightDistributionXY;
      case 'YX':
        return displaySettings.showWeightDistributionYX;
      case 'YY':
        return displaySettings.showWeightDistributionYY;
      default:
        return false;
    }
  }

  React.useEffect(() => {
    const firstRender = chartData === null;
    if (data.length > 0) {
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

  React.useEffect(() => {
    if (data.length > 0) {
      setMidFreq(calculateMidFrequency(data[0]));
    }
  });

  return (
    <>
      {canShowChart() && (
        <SignalCard
          action={<></>}
          data-testid="signalCardId"
          title={`${t('label.weightDistribution')} ${polarization} ${midFreq}`}
          socketStatus={socketStatus}
          showContent={showContent}
          setShowContent={showToggle}
          showInfoModal="true"
          infoTitle={t('modalInfo.uvCoverage.title')}
          infoContent={t('modalInfo.uvCoverage.content')}
          infoSite={t('modalInfo.uvCoverage.site')}
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
export default WeightDistributionPlot;
