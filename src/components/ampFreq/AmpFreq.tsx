/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import SignalCard  from '../signalCard/SignalCard';
import D3LineChart from '../d3/lineChart/D3LineChart';

import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../libs/decoder';

import { PROTOCOL, WS_API_URL } from '../../utils/constants';

const MESSAGE_TOPIC = MessageTopic.AMP_FREQ;
const WS_API = `${WS_API_URL}/${PROTOCOL}_${MESSAGE_TOPIC}`;

const AmpFreq = () => {
  const { t } = useTranslation();
  const [socketStatus, setSocketStatus] = React.useState('unknown');
  const [showContent, setShowContent] = React.useState(false);

  const xLabel = () => { 
    return `${t('label.frequency')} (${t('units.frequency')})`;
  }

  const yLabel = () => { 
    return `${t('label.amplitude')} (${t('units.amplitude')})`;
  }

  const cardTitle = () => { 
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  function getYData(data: any, startPos: number) {
    const arr = [];
    for (let i = startPos; i < data.length; i += 4) {
      arr.push(data[i].amplitudes);
    }
    return arr;
  }

  const connectToWebSocket = React.useCallback(async () => {
    const d3ChartXX = new D3LineChart('#ampFreqXXSvg', xLabel(), yLabel());
    const d3ChartXY = new D3LineChart('#ampFreqXYSvg', xLabel(), yLabel());
    const d3ChartYX = new D3LineChart('#ampFreqYXSvg', xLabel(), yLabel());
    const d3ChartYY = new D3LineChart('#ampFreqYYSvg', xLabel(), yLabel());
    const ws = new WebSocket(WS_API);

    ws.onerror = function oneError(e) {
      console.error('AmpFreq: ws onerror, error = ', e);
    };

    ws.onmessage = function onMessage(msg) {

      // TODO : The y_min & y_max should cover all arrays and not just the first one

      const data = msg?.data;
      try {
        const decoded = decodeJson(data);
        if (decoded && decoded.status) {
          setSocketStatus(decoded.status);
        } else {
          let offset = 0;
          let chartData = {
            x_min: Math.min(...decoded.frequencies),
            x_max: Math.max(...decoded.frequencies),
            y_min: Math.min(...decoded.data[offset].amplitudes),
            y_max: Math.max(...decoded.data[offset].amplitudes),
            xData: decoded.frequencies,
            yData: getYData(decoded.data, offset)
          }
          window.requestAnimationFrame(() => d3ChartXX?.draw(chartData));

          // TODO : The y_min & y_max should cover all arrays and not just the first one
          offset = 1;
          chartData = {
            x_min: Math.min(...decoded.frequencies),
            x_max: Math.max(...decoded.frequencies),
            y_min: Math.min(...decoded.data[offset].amplitudes),
            y_max: Math.max(...decoded.data[offset].amplitudes),
            xData: decoded.frequencies,
            yData: getYData(decoded.data, offset)
          }
          window.requestAnimationFrame(() => d3ChartXY?.draw(chartData));

          offset = 2;
          chartData = {
            x_min: Math.min(...decoded.frequencies),
            x_max: Math.max(...decoded.frequencies),
            y_min: Math.min(...decoded.data[offset].amplitudes),
            y_max: Math.max(...decoded.data[offset].amplitudes),
            xData: decoded.frequencies,
            yData: getYData(decoded.data, offset)
          }
          window.requestAnimationFrame(() => d3ChartYX?.draw(chartData));

          offset = 3;
          chartData = {
            x_min: Math.min(...decoded.frequencies),
            x_max: Math.max(...decoded.frequencies),
            y_min: Math.min(...decoded.data[offset].amplitudes),
            y_max: Math.max(...decoded.data[offset].amplitudes),
            xData: decoded.frequencies,
            yData: getYData(decoded.data, offset)
          }
          window.requestAnimationFrame(() => d3ChartYY?.draw(chartData));
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
    if (showContent)
    connectToWebSocket();
  }, [showContent]);

  return (
    <SignalCard
      title={t('label.ampVFreq')}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={setShowContent}
    >
      <>
        <Typography variant="subtitle2" paragraph>XX</Typography>
        <div id="ampFreqXXSvg" data-testid="ampFreqXXSvg" />
        <Typography variant="subtitle2" paragraph>XY</Typography>
        <div id="ampFreqXYSvg" data-testid="ampFreqXYSvg" />
        <Typography variant="subtitle2" paragraph>YX</Typography>
        <div id="ampFreqYXSvg" data-testid="ampFreqYXSvg" />    
        <Typography variant="subtitle2" paragraph>YY</Typography>
        <div id="ampFreqYYSvg" data-testid="ampFreqYYSvg" />
      </>
    </SignalCard>
  );
};
export default AmpFreq;
