/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Plot from 'react-plotly.js';

import { Grid } from '@mui/material';
import SignalCard from '../SignalCard/SignalCard';
import { storageObject } from '../../services/stateStorage';
import { COLOR, PROTOCOL } from '../../utils/constants';

interface PolarizationProps {
  polarization: string;
  resize: number;
  socketStatus: string;
  data: any;
  legend: any;
}

const RATIO = 2;

const Polarization = ({ polarization, resize, socketStatus, data, legend }: PolarizationProps) => {
  const { t } = useTranslation();

  const [showContent, setShowContent] = React.useState(false);
  const [chartData1, setChartData1] = React.useState(null);
  const [chartData2, setChartData2] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const xLabel = () => `${t('label.frequency')} (${t('units.frequency')})`;

  const yLabel = (amplitude: boolean) => `${t(amplitude ? 'label.amplitude' : 'label.phase')}`;

  const cardTitle = () =>
    `${t('label.socket')}: ${socketStatus}, ${t('label.serialisation')}: ${PROTOCOL}`;

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
    if (!legend) {
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
    if (!usedData.channels) {
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

  const canShow = () => data !== null;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  React.useEffect(() => {
    if (data && data.data) {
      setChartData1(getChartData(data, true));
      setChartData2(getChartData(data, false));
    }
    setShowContent(canShow());
  }, [data, legend]);

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
    <SignalCard
      title={`${t('label.polarization')} ${polarization}`}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={showToggle}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Grid item md={6} xs={12}>
          <Plot
            data={chartData1}
            layout={{
              autosize: false,
              title: chartTitle(true),
              plot_bgcolor: darkMode ? 'black' : 'white',
              paper_bgcolor: darkMode ? 'black' : 'white',
              width: parentWidth(),
              height: parentWidth() / RATIO,
              xaxis: {
                title: xLabel(),
                color: darkMode ? 'white' : 'black',
                automargin: true
              },
              yaxis: {
                title: yLabel(true),
                color: darkMode ? 'white' : 'black',
                automargin: true
              }
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Plot
            data={chartData2}
            layout={{
              autosize: false,
              title: chartTitle(false),
              plot_bgcolor: darkMode ? 'black' : 'white',
              paper_bgcolor: darkMode ? 'black' : 'white',
              width: parentWidth(),
              height: parentWidth() / RATIO,
              xaxis: {
                title: xLabel(),
                color: darkMode ? 'white' : 'black',
                automargin: true
              },
              yaxis: {
                title: yLabel(false),
                color: darkMode ? 'white' : 'black',
                automargin: true
              }
            }}
          />
        </Grid>
      </Grid>
    </SignalCard>
  );
};
export default Polarization;
