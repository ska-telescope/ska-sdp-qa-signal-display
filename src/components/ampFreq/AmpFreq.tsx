/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SignalCard  from '../signalCard/SignalCard';
import D3LineChart from '../d3/lineChart/D3LineChart';

import { MessageTopic } from '../../models/message-topic';
import { storageObject } from '../../services/stateStorage';
import { decodeJson } from '../../utils/decoder';
import LocalData from '../../mockData/webSocket/phase.json';

import { DATA_LOCAL, POLARIZATIONS, PROTOCOL, WS_API_URL } from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.AMP_FREQ;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;

interface AmpFreqProps {
  resize: number;
}

const AmpFreq = ({ resize }: AmpFreqProps) => {
  const { t } = useTranslation();
  const [socketStatus, setSocketStatus] = React.useState('unknown');
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();
  const ampFreq0Ref = React.useRef(null);
  const ampFreq1Ref = React.useRef(null);
  const ampFreq2Ref = React.useRef(null);
  const ampFreq3Ref = React.useRef(null);

  const xLabel = () => {
    return `${t('label.frequency')} (${t('units.frequency')})`;
  }

  const yLabel = () => {
    return `${t('label.amplitude')} (${t('units.amplitude')})`;
  }

  const cardTitle = () => {
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  const getChart = (id: string, width: number) => {
    return new D3LineChart(id, '', xLabel(), yLabel(), darkMode, width);
  }

  function getYData(data: any, polarisation: string) {
    const arr = [];
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].polarisation === polarisation) {
        arr.push(data[i].amplitudes);
      }
    }
    return arr;
  }

  function getChartData(usedData: any, offset: number) {
    const yData = getYData(usedData.data, POLARIZATIONS[offset]);
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
    const d3Chart0 = getChart('#ampFreq0Svg', ampFreq0Ref.current.offsetWidth);
    const d3Chart1 = getChart('#ampFreq1Svg', ampFreq1Ref.current.offsetWidth);
    const d3Chart2 = getChart('#ampFreq2Svg', ampFreq2Ref.current.offsetWidth);
    const d3Chart3 = getChart('#ampFreq3Svg', ampFreq3Ref.current.offsetWidth);
    const ws = new WebSocket(WS_API);

    ws.onerror = function oneError(e) {
      console.error('AmpFreq: ws onerror, error = ', e);
    };

    ws.onmessage = function onMessage(msg) {
      const data = msg?.data;
      try {
        const decoded = decodeJson(data);
        if (decoded && decoded.status) {
          setSocketStatus(decoded.status);
        } else {
          window.requestAnimationFrame(() => d3Chart0?.draw(getChartData(decoded, 0)));
          window.requestAnimationFrame(() => d3Chart1?.draw(getChartData(decoded, 1)));
          window.requestAnimationFrame(() => d3Chart2?.draw(getChartData(decoded, 2)));
          window.requestAnimationFrame(() => d3Chart3?.draw(getChartData(decoded, 3)));
        }
      } catch (e) {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error('AmpFreq: received, decoding error = ', e);
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
        const d3Chart0 = getChart('#ampFreq0Svg', ampFreq0Ref.current.offsetWidth);
        const d3Chart1 = getChart('#ampFreq1Svg', ampFreq1Ref.current.offsetWidth);
        const d3Chart2 = getChart('#ampFreq2Svg', ampFreq2Ref.current.offsetWidth);
        const d3Chart3 = getChart('#ampFreq3Svg', ampFreq3Ref.current.offsetWidth);
        window.requestAnimationFrame(() => d3Chart0?.draw(getChartData(LocalData, 0)));
        window.requestAnimationFrame(() => d3Chart1?.draw(getChartData(LocalData, 1)));
        window.requestAnimationFrame(() => d3Chart2?.draw(getChartData(LocalData, 2)));
        window.requestAnimationFrame(() => d3Chart3?.draw(getChartData(LocalData, 3)));
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
      title={t('label.ampVFreq')}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={setShowContent}
    >
      <>
        <div id="ampFreq0Svg" data-testid="ampFreq0Svg" ref={ampFreq0Ref} />
        <div id="ampFreq1Svg" data-testid="ampFreq1Svg" ref={ampFreq1Ref} />
        <div id="ampFreq2Svg" data-testid="ampFreq2Svg" ref={ampFreq2Ref} />
        <div id="ampFreq3Svg" data-testid="ampFreq3Svg" ref={ampFreq3Ref} />
      </>
    </SignalCard>
  );
};
export default AmpFreq;
