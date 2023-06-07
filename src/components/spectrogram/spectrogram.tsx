/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Spectrogram.scss';
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
import { DATA_API_URL, PROTOCOL } from '../../Utils/constants';

const Spectrogram = () => {
  const { t } = useTranslation();

  const [showContent, setShowContent] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [chartData, setChartData] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const canShow = () => {
    return chartData !== null;
  };

  const showToggle = () => {
    setShowContent(showContent ? false : canShow());
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    async function retrieveChartData() {
      await fetch(`${DATA_API_URL}/stats/processing_block/blocks/latest/baselines`, {
        signal: abortController.signal
      })
        .then(response => response.json())
        .then(data => {
          setShowContent(true);
          setChartData(data.baselines);
        })
        .catch(() => null);
    }
    retrieveChartData();
    return () => {
      abortController.abort();
    };
  }, []);

  const cardTitle = () => {
    return `Serialisation: ${PROTOCOL}`;
  };

  function getFullImageUrl(item: string) {
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectograms/full_image/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function getThumbnailImageUrl(item: string) {
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectograms/thumbnail/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function imageClick(item: string) {
    handleOpen();
    setImageUrl(getFullImageUrl(item));
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
                      src={getThumbnailImageUrl(item)}
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
