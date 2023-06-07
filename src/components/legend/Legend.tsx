/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SignalCard from '../SignalCard/SignalCard';
import { PROTOCOL } from '../../utils/constants';
import { colorFlip } from '../../utils/colorFlip';

interface LegendProps {
  resize: number;
  socketStatus: string;
  data: any;
  onClick: Function;
}

const Legend = ({ resize, socketStatus, data, onClick }: LegendProps) => {
  const { t } = useTranslation();
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const cardTitle = () => {
    return `${t('label.socket')}: ${socketStatus}, ${t('label.serialisation')}: ${PROTOCOL}`;
  };

  const canShow = () => {
    return data !== null;
  };

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  React.useEffect(() => {
    setShowContent(canShow());
  }, [data]);

  React.useEffect(() => {
    if (showContent && data) {
    }
  }, [showContent]);

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
      title={t('label.legend')}
      actionTitle={cardTitle()}
      showContent={showContent}
      setShowContent={showToggle}
    >
      <>
        {data &&
          data.map(function(item: { active: boolean; color: string; text: string }, i: any) {
            return (
              <Button
                key={i}
                onClick={e => {
                  onClick(e.currentTarget.innerText);
                }}
                size="small"
                sx={{
                  m: 1,
                  '&:hover': item.active ? item.color : 'inherited',
                  backgroundColor: item.active ? item.color : 'inherited',
                  color: item.active ? colorFlip(item.color, true) : 'inherited'
                }}
                variant="contained"
              >
                {item.text}
              </Button>
            );
          })}
      </>
    </SignalCard>
  );
};
export default Legend;
