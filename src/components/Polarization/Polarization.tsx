/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid } from '@mui/material';
import { InfoCard } from '@ska-telescope/ska-gui-components';
import Plotly from '../Plotly/Plotly';
import SignalCard from '../SignalCard/SignalCard';
import { storageObject } from '../../services/stateStorage';
import { COLOR } from '../../utils/constants';

const RATIO = 2;
interface PolarizationProps {
  polarization: string;
  resize: number;
  socketStatus: string;
  config: any;
  data: any;
  legend: any;
}

const Polarization = ({
  polarization,
  resize,
  socketStatus,
  config,
  data,
  legend
}: PolarizationProps) => {
  const { t } = useTranslation('signalDisplay');

  const [chartData1, setChartData1] = React.useState(null);
  const [chartData2, setChartData2] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const apiFormat = config ? config.api_format : '?????';
  const xLabel = () => `${t('label.frequency')} (${t('units.frequency')})`;

  const yLabel = (amplitude: boolean) => `${t(amplitude ? 'label.amplitude' : 'label.phase')}`;

  const cardTitle = () =>
    `${t('label.socket')}: ${socketStatus}, ${t('label.serialisation')}: ${apiFormat}`;

  const chartTitle = (amplitude: boolean) => t(amplitude ? 'label.amplitude' : 'label.phase');

  function getBaseData(inData: any, polarisation: string, amplitude: boolean) {
    const tmp = [];
    for (let i = 0; i < inData.length; i += 1) {
      if (inData[i].polarisation === polarisation) {
        tmp.push({
          name: inData[i].baseline,
          data: amplitude ? inData[i].amplitudes : inData[i].phases
        });
      }
    }
    if (!legend || legend.length === 0) {
      return tmp;
    }

    const arr = [];
    for (let i = 0; i < tmp.length; i += 1) {
      if (tmp[i].name === legend[i].text && legend[i].active) {
        arr.push(tmp[i]);
      }
    }

    return arr;
  }

  function parentWidth() {
    return 600;
  }

  function getLegendColor(name: string) {
    if (legend) {
      for (let i = 0; i < legend.length; i++) {
        if (legend[i].text === name) {
          return legend[i].color;
        }
      }
    }
    return COLOR[0]; // Only here for completeness.
  }

  function getChartData(usedData: any, amplitude: boolean) {
    const chartData = [];
    if (!usedData.channels || !legend) {
      return chartData;
    }
    const baseData = getBaseData(usedData.data, polarization, amplitude);
    for (let i = 0; i < baseData.length; i++) {
      chartData.push({
        x: usedData.channels,
        y: baseData[i].data,
        name: baseData[i].name,
        marker: {
          color: getLegendColor(baseData[i].name)
        }
      });
    }
    return chartData;
  }

  const canShow = () => data && data.data;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

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
    const firstRender = chartData1 === null;
    if (data && legend) {
      setChartData1(canShow() ? getChartData(data, true) : null);
      setChartData2(canShow() ? getChartData(data, false) : null);
    }
    if (firstRender) {
      setShowContent(canShow());
    }
  }, [data, legend]);

  return (
    <SignalCard
      title={`${t('label.polarization')} ${polarization}`}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={showToggle}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Grid item md={6} xs={12}>
          {(!legend || !chartData1 || chartData1.length === 0) && (
            <Box m={1}>
              <InfoCard
                testId="noChartData1Card"
                fontSize={25}
                level={1}
                message={t('error.noData')}
              />
            </Box>
          )}
          {legend && chartData1 && chartData1.length > 0 && (
            <Plotly
              darkMode={darkMode}
              data={showContent ? chartData1 : null}
              height={parentWidth() / RATIO}
              title={chartTitle(true)}
              width={parentWidth()}
              xLabel={xLabel()}
              yLabel={yLabel(true)}
            />
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          {(!chartData2 || chartData2.length === 0) && (
            <Box m={1}>
              <InfoCard
                testId="noChartData2Card"
                fontSize={25}
                level={1}
                message={t('error.noData')}
              />
            </Box>
          )}
          {chartData2 && chartData2.length > 0 && (
            <Plotly
              darkMode={darkMode}
              data={showContent ? chartData2 : null}
              height={parentWidth() / RATIO}
              title={chartTitle(false)}
              width={parentWidth()}
              xLabel={xLabel()}
              yLabel={yLabel(true)}
            />
          )}
        </Grid>
      </Grid>
    </SignalCard>
  );
};
export default Polarization;
