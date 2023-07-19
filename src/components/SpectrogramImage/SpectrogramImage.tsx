/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import { DATA_API_URL } from '../../utils/constants';

interface SpectrogramImageProps {
  element: any;
  full?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function;
  config: any;
}

const FULL = 'full_image';
const THUMBNAIL = 'thumbnail';

const SpectrogramImage = ({ element, full, onClick, config }: SpectrogramImageProps) => {
  function getImageFULL(item: string) {
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectograms/${FULL}/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function getImageTN(item: string) {
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}/spectograms/${THUMBNAIL}/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  // m043_m043_YX
  function getImageUrl(item: string) {
    return full ? getImageFULL(item) : getImageTN(item);
  }

  function imageClick(item: string) {
    return onClick ? onClick(item) : null;
  }

  const width = () => (full ? '85vw' : config.waterfall_plots.thumbnail_width);
  const height = () => (full ? '85vh' : config.waterfall_plots.thumbnail_max_height);

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

SpectrogramImage.defaultProps = {
  full: false,
  onClick: null
};

export default SpectrogramImage;
