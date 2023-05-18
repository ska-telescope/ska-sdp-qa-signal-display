/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SignalCard  from '../signalCard/SignalCard';
import D3Legend from '../d3/legend/D3Legend';

import { MessageTopic } from '../../models/message-topic';
import { storageObject } from '../../services/stateStorage';
import { decodeJson } from '../../utils/decoder';
import LocalData from '../../mockData/webSocket/phase.json';

import { DATA_LOCAL, POLARIZATIONS, PROTOCOL, WS_API_URL } from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.AMP_FREQ;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;

interface LegendProps {
  resize: number;
}

const Legend = ({ resize }: LegendProps) => {
  const { t } = useTranslation();
  const [socketStatus, setSocketStatus] = React.useState('unknown');
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();
  const legendRef = React.useRef(null);

  const xLabel = () => { 
    return `${t('label.frequency')} (${t('units.frequency')})`;
  }

  const yLabel = () => { 
    return `${t('label.phase')}`; //  (${t('units.phase')})`;
  }

  const cardTitle = () => { 
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  const getChart = (id: string) => {
    return new D3Legend(id, '', xLabel(), yLabel(), darkMode);
  }

  function getBData(data: any) {
    const arr = [];
    for (let i = 0; i < data.length; i += 1) {
      arr.push(data[i].baseline);
    }
    return arr;
  }

  function getYData(data: any, polarisation: string) {
    const arr = [];
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].polarisation === polarisation) {
        arr.push(data[i].phases);
      }
    }
    return arr;
  }

  function getChartData(usedData: any, offset: number) {
    const bData = getBData(usedData.data);
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
      y_max: Math.max(...yValues),
      xData: usedData.frequencies,
      bData,
      yData
    }
    return chartData;
  }

  const connectToWebSocket = React.useCallback(async () => {
    const d3Chart0 = getChart('#legendSvg');
    const ws = new WebSocket(WS_API);

    ws.onerror = function oneError(e) {
      console.error('Legend: ws onerror, error = ', e);
    };

    ws.onmessage = function onMessage(msg) {
      const data = msg?.data;
      try {
        const decoded = decodeJson(data);
        if (decoded && decoded.status) {
          setSocketStatus(decoded.status);
        } else {
          window.requestAnimationFrame(() => d3Chart0?.draw(getChartData(decoded, 0)));
        }
      } catch (e) {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error('Legend: received, decoding error = ', e);
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
    if (showContent)
      if (DATA_LOCAL) {
        const d3Chart0 = getChart('#legendSvg');
        window.requestAnimationFrame(() => d3Chart0?.draw(getChartData(LocalData, 0)));
      } else {
        connectToWebSocket();
      }
  }, [showContent]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [darkMode]);

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
      title={t('label.legend')}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={setShowContent}
    >
      <div id="legendSvg" data-testid="legendSvg" ref={legendRef} />
    </SignalCard>
  );
};
export default Legend;
