/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import { DATA_API_URL, DATA_LOCAL } from '../../utils/constants';

interface SpectrogramImageProps {
  element: any;
  full?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function;
  config: any;
}

const FULL = 'full_image';
const THUMBNAIL = 'thumbnail';
const MOCK_FULL = '/static/images/mock/full.png';
const MOCK_THUMBNAIL = '/static/images/mock/thumbnail.png';

const SpectrogramImage = ({ element, full = false, onClick = null, config }: SpectrogramImageProps) => {
  function getImageFULL(item: string) {
    if (DATA_LOCAL) {
      return MOCK_FULL;
    }
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectrograms/${FULL}/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function getImageTN(item: string) {
    if (DATA_LOCAL) {
      return MOCK_THUMBNAIL;
    }
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectrograms/${THUMBNAIL}/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  // m043_m043_YX
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
    return full ? '85vw' : config.waterfall_plots.thumbnail_width;
  };

  const height = () => {
    if (DATA_LOCAL) {
      return full ? '85vh' : '22vh';
    }
    return full ? '85vh' : config.waterfall_plots.thumbnail_max_height;
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

export default SpectrogramImage;
