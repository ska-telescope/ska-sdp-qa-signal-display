/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal
} from '@mui/material';
import SignalCard from '../SignalCard/SignalCard';
import { DATA_LOCAL, DATA_API_URL } from '../../utils/constants';

interface SpectrogramProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
}

const Spectrogram = ({ config }: SpectrogramProps) => {
  const { t } = useTranslation('signalDisplay');

  const [showContent, setShowContent] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [chartData, setChartData] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const canShow = () => chartData !== null;

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  React.useEffect(() => {
    if (config === null) {
      return;
    }

    const abortController = new AbortController();
    async function retrieveChartData() {
      await fetch(`${DATA_API_URL}${config.paths.processing_blocks}/latest/baselines`, {
        signal: abortController.signal
      })
        .then(response => response.json())
        .then(data => {
          setShowContent(true);
          setChartData(data.baselines);
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
      retrieveChartData();
    }
  }, [config]);

  const apiFormat = config ? config.api_format : '?????';
  const cardTitle = () => `Serialisation: ${apiFormat}`;

  function getImageUrl(item: string, full: boolean) {
    const imageType = full ? 'full_image' : 'thumbnail';
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectograms/${imageType}/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function imageClick(item: string) {
    handleOpen();
    setImageUrl(getImageUrl(item, true));
  }

  return (
    <>
      <Modal
        data-testid="ClickedImage"
        open={open}
        onClose={handleClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card variant="outlined" className="removeBorder:focus">
          <CardContent>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs="auto">
                <img src={imageUrl} loading="lazy" alt="" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
      <SignalCard
        title={t('label.spectrograms')}
        actionTitle={cardTitle()}
        subheader={t('prompt.spectrograms')}
        showContent={showContent}
        setShowContent={showToggle}
      >
        <>
          <div id="spectogram-image-list-Id" data-testid="spectogram-image-list-Id">
            <ImageList sx={{ width: 1150 }} cols={3}>
              {chartData && chartData.length ? (
                chartData.map(item => (
                  <ImageListItem key={item}>
                    <img
                      src={getImageUrl(item, false)}
                      alt={item}
                      loading="lazy"
                      onClick={() => imageClick(item)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                    <ImageListItemBar title={item} position="below" />
                  </ImageListItem>
                ))
              ) : (
                <div />
              )}
            </ImageList>
          </div>
          <div id="spectrogramId" />
        </>
      </SignalCard>
    </>
  );
};

export default Spectrogram;
