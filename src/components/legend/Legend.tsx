/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SignalCard  from '../signalCard/SignalCard';
import D3Legend from '../d3/legend/D3Legend';

import { PROTOCOL } from '../../utils/constants';

interface LegendProps {
  resize: number;  
  socketStatus: string; 
  data: any;
}

const Legend = ({ resize, socketStatus, data }: LegendProps) => {
  const { t } = useTranslation();
  const [d3Legend, setD3Legend] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const legendRef = React.useRef(null);

  const cardTitle = () => { 
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  const getLegend = (id: string) => {
    return new D3Legend(id);
  }

  function getBData(inData: any) {
    const arr = [];
    for (let i = 0; i < inData.length; i += 1) {
      arr.push(inData[i].baseline);
    }
    return arr;
  }

  function getLegendData(usedData: any) {
    const values = getBData(usedData?.complex_numbers);
    const elements = values.filter((value, index, array) => array.indexOf(value) === index);
    return elements;
  }

  React.useEffect(() => {
    setD3Legend(showContent ? getLegend('#legendSvg') : null);
  }, [showContent]);

  React.useEffect(() => {
    setShowContent(true);
  }, []);

  React.useEffect(() => {
    if (showContent) {
      window.requestAnimationFrame(() => d3Legend?.draw(getLegendData(data)));
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
