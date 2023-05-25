/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from "@mui/material";
import SignalCard  from '../signalCard/SignalCard';
import LineChart from '../d3/lineChart/LineChart';

import { storageObject } from '../../services/stateStorage';

import { PROTOCOL } from '../../utils/constants';

interface PolarizationProps {
  polarization: string;
  resize: number;
  socketStatus: string; 
  data: object;
}

const Polarization = ({ polarization, resize, socketStatus, data }: PolarizationProps) => {
  const { t } = useTranslation();
  const [showContent, setShowContent] = React.useState(false);
  const [d3Chart0, setD3Chart0] = React.useState(null);
  const [d3Chart1, setD3Chart1] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();
  const divId0 = `polar0${  polarization  }Svg`;
  const divId1 = `polar1${  polarization  }Svg`;
  const divId0hash = `#polar0${  polarization  }Svg`;
  const divId1hash = `#polar1${  polarization  }Svg`;

  const polar0Ref = React.useRef(null);
  const polar1Ref = React.useRef(null);

  const xLabel = () => {
    return `${t('label.frequency')} (${t('units.frequency')})`;
  }

  const yLabel = (amplitude: boolean) => {
    if (amplitude)
      return `${t('label.amplitude')}`;
    return `${t('label.phase')}`;
  }

  const cardTitle = () => {
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  const chartTitle = (amplitude: boolean) => {
    return t((amplitude) ? 'label.amplitude' : 'label.phase');
  }

  const getChart = (id: string, amplitude: boolean) => {
    return new LineChart(id, chartTitle(amplitude), xLabel(), yLabel(amplitude), darkMode);
  }

  function getYData(inData: any, polarisation: string, amplitude: boolean) {
    console.log(inData);
    const arr = [];
    for (let i = 0; i < inData.length; i += 1) {
      if (inData[i].polarisation === polarisation) {
        arr.push(amplitude ? inData[i].amplitudes : inData[i].phases);
      }
    }
    return arr;
  }

  function getChartData(usedData: any, amplitude: boolean) {
    const yData = getYData(usedData.complex_numbers, polarization, amplitude);
    const yValues = [];
    for (let i = 0; i < yData.length; i++) {
      yValues.push(Math.min(...yData[i]));
      yValues.push(Math.max(...yData[i]));
    }
    const chartData = {
      x_min: Math.min(...usedData.channels),
      x_max: Math.max(...usedData.channels),
      y_min: Math.min(...yValues),
      y_max: Math.round(Math.max(...yValues) + 1),
      xData: usedData.channels,
      yData
    }
    return chartData;
  }

  React.useEffect(() => {
    setShowContent(true);
  }, []);

  React.useEffect(() => {
    setD3Chart0(showContent ? getChart(divId0hash, true) : null);
    setD3Chart1(showContent ? getChart(divId1hash, false) : null);
  }, [showContent]);

  React.useEffect(() => {
    if (showContent) {
      window.requestAnimationFrame(() => d3Chart0.draw(getChartData(data, true)));
      window.requestAnimationFrame(() => d3Chart1.draw(getChartData(data, false)));
    }
  }, [data]);

  React.useEffect(() => {
    if (!refresh) 
      setShowContent(true);
    else
      setRefresh(false);
  }, [refresh]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [resize]);

  return (
    <SignalCard
      title={`${t('label.polarization')  } ${  polarization}`}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={setShowContent}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Grid item md={6} xs={12}>
          <div id={divId0} data-testid={divId0} ref={polar0Ref} />
        </Grid>
        <Grid item md={6} xs={12}>
          <div id={divId1} data-testid={divId1} ref={polar1Ref} />
        </Grid>
      </Grid>
    </SignalCard>
  );
};
export default Polarization;
