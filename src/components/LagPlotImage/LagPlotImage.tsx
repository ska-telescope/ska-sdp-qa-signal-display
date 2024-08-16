/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import Config from '../../services/types/Config';
import { DATA_API_URL, DATA_LOCAL } from '../../utils/constants';

interface LagPlotImageProps {
  element: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function;
  config: Config;
}

const MOCK_THUMBNAIL = '/static/images/mock/lag_plot_thumbnail.png';

const LagPlotImage = ({ element, onClick = null, config }: LagPlotImageProps) => {
  function getImageTN(item: string) {
    if (DATA_LOCAL) {
      return MOCK_THUMBNAIL;
    }
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}${config.paths.lag_plot_thumbnail_path}/latest/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  function imageClick(item: string) {
    return onClick ? onClick(item) : null;
  }

  const width = () => DATA_LOCAL ? '22vw' : config.waterfall_plots.thumbnail_width;

  const height = () => DATA_LOCAL ? '22vh' : config.waterfall_plots.thumbnail_max_height;

  return (
    <ImageListItem key={element}>
      <img
        src={getImageTN(element)}
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

export default LagPlotImage;
