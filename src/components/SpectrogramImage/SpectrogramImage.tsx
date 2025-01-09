import React, { useEffect, useState } from 'react';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import { DATA_API_URL, DATA_LOCAL } from '../../utils/constants';
import Config from '../../services/types/Config';
import Plot from 'react-plotly.js';

interface SpectrogramImageProps {
  element: string;
  onClick?: (item: string) => void;
  config: Config;
  subarrayDetails: any;
}

const MOCK_THUMBNAIL = '/static/images/mock/thumbnail.png';

const SpectrogramImage = ({
  element,
  onClick = null,
  config,
  subarrayDetails,
}: SpectrogramImageProps) => {
  const [heatmapData, setHeatmapData] = useState<number[][] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function getImageTN(item: string) {
    if (DATA_LOCAL) {
      return MOCK_THUMBNAIL;
    }
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}${config.paths.spectrogram_thumbnail_path}/${subarrayDetails?.execution_block?.pb_realtime}/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  async function fetchHeatmapData(item: string) {
    const url = getImageTN(item);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch heatmap data: ${response.statusText}`);
      }

      const data = await response.json();
      setHeatmapData(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error fetching heatmap data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchHeatmapData(element);
  }, [element]);

  return (
    <ImageListItem key={element}>
      {loading ? (
        <p>Loading heatmap...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : heatmapData ? (
        <Plot
          data={[
            {
              z: heatmapData,
              type: 'heatmap',
              colorscale: 'Viridis',
              colorbar: { title: 'Intensity', titleside: 'right' },
            },
          ]}
          layout={{
            title: element,
            margin: { t: 50, r: 50, b: 50, l: 50 },
          }}
        />
      ) : (
        <p>No data available</p>
      )}
      <ImageListItemBar title={element} position="below" />
    </ImageListItem>
  );
};

export default SpectrogramImage;
