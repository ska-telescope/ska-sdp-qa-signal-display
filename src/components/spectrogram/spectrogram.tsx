/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Typography
} from '@mui/material';
import SignalCard  from '../signalCard/SignalCard';
import {
  DATA_API_URL,
  PROTOCOL,
  WIDTH
} from '../../utils/constants';


const Spectrogram = () => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [chartData, setChartData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  React.useEffect(() => {
    const abortController = new AbortController();
    async function retrieveChartData() {
      await fetch(`${DATA_API_URL}/stats/processing_block/blocks/latest/baselines`, {
          signal: abortController.signal
        })
        .then((response) => response.json())
        .then((data) => {
          setChartData(data.baselines);
        })
        .catch(() => null);
    }
    retrieveChartData();
    return () => {
      abortController.abort();
    }
  }, []);

  const cardTitle = () => { 
    return `Serialisation: ${PROTOCOL}`;
  }

  function getFullImageUrl(item: string) {
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectograms/full_image/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function getThumbnailImageUrl(item: string){
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
        data-testid='ClickedImage'
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
              <Grid item xs='auto'>
                <img src={imageUrl} loading="lazy" alt="" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
      <SignalCard
        title="Spectrograms"
        actionTitle={cardTitle()}
        subHeader='Click on the baseline and polarisation label to see a detailed spectrogram'
      >
        <>
          <div id="spectogram-image-list-Id" data-testid="spectogram-image-list-Id">
            <ImageList sx={{ width: 1150 }} cols={3}>
              {chartData && chartData.length ? (
                chartData.map((item) => (
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
