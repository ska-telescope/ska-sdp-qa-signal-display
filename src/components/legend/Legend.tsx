/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SignalCard  from '../signalCard/SignalCard';
import D3Legend from '../d3/legend/D3Legend';

import { MessageTopic } from '../../models/message-topic';
import { decodeJson } from '../../utils/decoder';
import LocalData from '../../mockData/webSocket/phase.json';

import { DATA_LOCAL, PROTOCOL, WS_API_URL } from '../../utils/constants';

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
  const legendRef = React.useRef(null);

  const cardTitle = () => { 
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  const getLegend = (id: string) => {
    return new D3Legend(id);
  }

  function getBData(data: any) {
    const arr = [];
    for (let i = 0; i < data.length; i += 1) {
      arr.push(data[i].baseline);
    }
    return arr;
  }

  function getLegendData(usedData: any) {
    const values = getBData(usedData.data);
    const elements = values.filter((value, index, array) => array.indexOf(value) === index);
    return elements;
  }

  const connectToWebSocket = React.useCallback(async () => {
    const d3Legend = getLegend('#legendSvg');
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
          window.requestAnimationFrame(() => d3Legend?.draw(getLegendData(decoded)));
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
        const d3Legend = getLegend('#legendSvg');
        window.requestAnimationFrame(() => d3Legend?.draw(getLegendData(LocalData)));
      } else {
        connectToWebSocket();
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
      title={t('label.legend')}
      actionTitle={cardTitle()}
      showContent={showContent}
      setShowContent={setShowContent}
    >
      <div id="legendSvg" data-testid="legendSvg" ref={legendRef} />
    </SignalCard>
  );
};
export default Legend;
