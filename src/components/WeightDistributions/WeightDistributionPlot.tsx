/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';
import { QASettings } from '../Settings/qaSettings';
import { COLOR_RANGE } from '../../utils/divergentColors';

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

  const canShow = () => data?.length > 0;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  function parentWidth() {
    const width = window.innerWidth;
    return displaySettings.gridView ? Math.min(700, width) : Math.min(1400, width);
  }

  function calculateMidFrequency(usedData: any) {
    const minFreq = usedData.spectral_window.freq_min;
    const maxFreq = usedData.spectral_window.freq_max;
    return Math.round((minFreq + (maxFreq - minFreq)) / (2 * 1000000));
  }

  function getUVWData(usedData: any, polar: string) {
    const uValues = [];
    const vValues = [];
    const colors = [];

    const filteredData = usedData.filter(e => e.polarisation === polar);
    filteredData.forEach((datum: any) => {
      uValues.push(datum.u);
      uValues.push(-1 * datum.u);
      vValues.push(datum.v);
      vValues.push(-1 * datum.v);
      // Weight pushed twice to cater for both positive and negative values
      colors.push(datum.weight);
      colors.push(datum.weight);
    });
    return [uValues, vValues, colors];
  }

  function getChartData(usedData: any) {
    const uvwData = getUVWData(usedData, polarization);
    return [
      {
        x: uvwData[0],
        y: uvwData[1],
        marker: {
          color: uvwData[2],
          colorscale: COLOR_RANGE,
          colorbar: {
            title: 'Weight',
            thickness: 25,
            tick0: 0,
            dtick: 0.1
          }
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
    if (data?.data?.length > 0) {
      setChartData(getChartData(data?.data));
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
    if (data?.data?.length > 0) {
      setMidFreq(calculateMidFrequency(data));
    }
  });

  return (
    <>
      {canShowChart() && (
        <SignalCard
          action={<></>}
          data-testid="uvCoverageCard"
          title={`${t('label.weightDistribution')} ${polarization} - ${midFreq} MHz Mid Frequency`}
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
