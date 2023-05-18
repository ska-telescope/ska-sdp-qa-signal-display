/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from "@mui/material";
import SignalCard  from '../signalCard/SignalCard';
import D3LineChart from '../d3/lineChart/D3LineChart';

import { MessageTopic } from '../../models/message-topic';
import { storageObject } from '../../services/stateStorage';
import { decodeJson } from '../../utils/decoder';
import LocalData from '../../mockData/webSocket/phase.json';

import { DATA_LOCAL, PROTOCOL, WS_API_URL } from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.AMP_FREQ;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;

interface PolarizationProps {
  polarization: string;
  resize: number;
}

const Polarization = ({ polarization, resize }: PolarizationProps) => {
  const { t } = useTranslation();
  const [socketStatus, setSocketStatus] = React.useState('unknown');
  const [showContent, setShowContent] = React.useState(false);
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
    return new D3LineChart(id, chartTitle(amplitude), xLabel(), yLabel(amplitude), darkMode);
  }

  function getYData(data: any, polarisation: string, amplitude: boolean) {
    const arr = [];
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].polarisation === polarisation) {
        arr.push(amplitude ? data[i].amplitudes : data[i].phases);
      }
    }
    return arr;
  }

  function getChartData(usedData: any, amplitude: boolean) {
    const yData = getYData(usedData.data, polarization, amplitude);
    const yValues = [];
    for (let i = 0; i < yData.length; i++) {
      yValues.push(Math.min(...yData[i]));
      yValues.push(Math.max(...yData[i]));
    }
    const chartData = {
      x_min: Math.min(...usedData.frequencies),
      x_max: Math.max(...usedData.frequencies),
      y_min: Math.min(...yValues),
      y_max: Math.round(Math.max(...yValues) + 1),
      xData: usedData.frequencies,
      yData
    }
    return chartData;
  }

  const connectToWebSocket = React.useCallback(async () => {
    const d3Chart0 = getChart(divId0hash, true);
    const d3Chart1 = getChart(divId1hash, false);
    const ws = new WebSocket(WS_API);

    ws.onerror = function oneError(e) {
      console.error('Polarization: ws onerror, error = ', e);
    };

    ws.onmessage = function onMessage(msg) {
      const data = msg?.data;
      try {
        const decoded = decodeJson(data);
        if (decoded && decoded.status) {
          setSocketStatus(decoded.status);
        } else {
          window.requestAnimationFrame(() => d3Chart0?.draw(getChartData(decoded, true)));
          window.requestAnimationFrame(() => d3Chart1?.draw(getChartData(decoded, false)));
        }
      } catch (e) {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error('Polarization: received, decoding error = ', e);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  React.useEffect(() => {
    setShowContent(true);
  }, []);

  React.useEffect(() => {
    if (showContent) {
      if (DATA_LOCAL) {
        const d3Chart0 = getChart(divId0hash, true);
        const d3Chart1 = getChart(divId1hash, false);
        window.requestAnimationFrame(() => d3Chart0?.draw(getChartData(LocalData, true)));
        window.requestAnimationFrame(() => d3Chart1?.draw(getChartData(LocalData, false)));
      } else {
        connectToWebSocket();
      }
    }
  }, [showContent]);

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
