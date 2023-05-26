/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SignalCard  from '../signalCard/SignalCard';
import D3Legend from '../d3/legend/Legend';

import { PROTOCOL } from '../../utils/constants';

interface LegendProps {
  resize: number;  
  socketStatus: string; 
  data: any;
}

const Legend = ({ resize, socketStatus, data }: LegendProps) => {
  const { t } = useTranslation();
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const legendRef = React.useRef(null);

  const cardTitle = () => { 
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  const canShow = () => { 
    return data !== null;
  }

  const showToggle = () => { 
    setShowContent(showContent ? false : canShow());
  }

  React.useEffect(() => {
    setShowContent(canShow());
  }, [data]);

  React.useEffect(() => {
    if (showContent && data) {
      const d3LegendLocal = new D3Legend('#legendSvg');
      window.requestAnimationFrame(() => d3LegendLocal.draw(data));
    }
  }, [showContent]);

  React.useEffect(() => {
    if (!refresh) 
      setShowContent(canShow());
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
      setShowContent={showToggle}
    >
      <div id="legendSvg" data-testid="legendSvg" ref={legendRef} />
    </SignalCard>
  );
};
export default Legend;
