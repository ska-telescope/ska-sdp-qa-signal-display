/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Grid } from '@mui/material';
import SKAOModal from '../Modal/Modal';
import SignalCard from '../SignalCard/SignalCard';
import SpectrogramImage from '../SpectrogramImage/SpectrogramImage';
import { DATA_LOCAL, DATA_API_URL } from '../../utils/constants';

interface SpectrogramProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: any;
}

const Spectrogram = ({ config, legend }: SpectrogramProps) => {
  const { t } = useTranslation('signalDisplay');

  const [showContent, setShowContent] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [baseData, setBaseData] = React.useState(null);
  const [chartData, setChartData] = React.useState(null);

  const PATH_SUFFIX = '/latest/baselines';

  const showToggle = () => {
    setShowContent(showContent ? false : chartData !== null);
  };

  React.useEffect(() => {
    if (config === null) {
      return;
    }

    const abortController = new AbortController();
    async function retrieveBaseData() {
      await fetch(`${DATA_API_URL}${config.paths.processing_blocks}${PATH_SUFFIX}`, {
        signal: abortController.signal
      })
        .then(response => response.json())
        .then(data => {
          setShowContent(true);
          setBaseData(data.baselines);
          abortController.abort();
        })
        .catch(() => {
          // TODO : What do we put in here ?
          abortController.abort();
        });
    }

    if (DATA_LOCAL) {
      // TODO : Should I set something into here ?
    } else if (config !== null) {
      retrieveBaseData();
    }
  }, [config]);

  React.useEffect(() => {
    if (legend === null || baseData === null) {
      return;
    }
    const newData = [];
    for (let i = 0; i < legend.length; i += 1) {
      if (`${legend[i].text}_XX` === baseData[i * 4] && legend[i].active) {
        newData.push(baseData[i * 4 + 0]);
        newData.push(baseData[i * 4 + 1]);
        newData.push(baseData[i * 4 + 2]);
        newData.push(baseData[i * 4 + 3]);
      }
    }
    setChartData(newData);
  }, [baseData, legend]);

  const apiFormat = config ? config.api_format : '?????';
  const cardTitle = () => `Serialisation: ${apiFormat}`;

  function imageClick(item: string) {
    setOpen(true);
    setSelected(item);
  }

  return (
    <>
      {selected && (
        <SKAOModal open={open} onClose={() => setOpen(false)}>
          <Card variant="outlined" className="removeBorder:focus">
            <CardContent>
              <SpectrogramImage config={config} element={selected} full />
            </CardContent>
          </Card>
        </SKAOModal>
      )}
      <SignalCard
        title={t('label.spectrograms')}
        actionTitle={cardTitle()}
        subheader={t('prompt.spectrograms')}
        showContent={showContent}
        setShowContent={showToggle}
      >
        <>
          <Grid container direction="row" justifyContent="space-evenly">
            {chartData && chartData.length ? (
              chartData.map(item => (
                <Grid key={item} item>
                  <SpectrogramImage
                    config={config}
                    element={item}
                    onClick={() => imageClick(item)}
                  />
                </Grid>
              ))
            ) : (
              <div />
            )}
          </Grid>
          <div id="spectrogramId" />
        </>
      </SignalCard>
    </>
  );
};

export default Spectrogram;
