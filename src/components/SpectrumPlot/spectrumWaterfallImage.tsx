/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import { DATA_API_URL, DATA_LOCAL } from '../../utils/constants';

interface SpectrumWaterfallPlotImageProps {
  element: any;
  full?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function;
}

const FULL = 'full_image_pb';
const THUMBNAIL = 'thumbnail_pb';
const MOCK_FULL = '/static/images/mock/lag_plot_full.png';
const MOCK_THUMBNAIL = '/static/images/mock/lag_plot_thumbnail.png';

const SpectrumWaterfallPlotImage = ({
  element,
  full = false,
  onClick = null
}: SpectrumWaterfallPlotImageProps) => {
  function getImageFULL(item: string) {
    if (DATA_LOCAL) {
      return MOCK_FULL;
    }
    // const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectrum_waterfalls/${FULL}/latest/${item}`;
  }

  function getImageTN(item: string) {
    if (DATA_LOCAL) {
      return MOCK_THUMBNAIL;
    }
    // const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectrum_waterfalls/${THUMBNAIL}/latest/${item}`;
  }

  function getImageUrl(item: string) {
    return full ? getImageFULL(item) : getImageTN(item);
  }

  function imageClick(item: string) {
    return onClick ? onClick(item) : null;
  }

  const width = () => {
    if (DATA_LOCAL) {
      return full ? '85vw' : '22vw';
    }
    return full ? '85vw' : 1024;
  };

  const height = () => {
    if (DATA_LOCAL) {
      return full ? '85vh' : '22vh';
    }
    return full ? '85vh' : 328;
  };

  return (
    <ImageListItem key={element}>
      <img
        src={getImageUrl(element)}
        // placeholder={getImageTN(element)}
        alt={element}
        loading="lazy"
        onClick={() => imageClick(element)}
        style={{
          width: width(),
          height: height(),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
      <ImageListItemBar title={element} position="below" />
    </ImageListItem>
  );
};

export default SpectrumWaterfallPlotImage;
