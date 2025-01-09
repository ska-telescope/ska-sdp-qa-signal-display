import React, { useEffect, useState } from 'react';
import { ImageListItem } from '@mui/material';
import { DATA_API_URL, DATA_LOCAL } from '../../utils/constants';
import Config from '../../services/types/Config';
import Plot from 'react-plotly.js';

interface LagPlotImageProps {
  element: string;
  onClick?: (item: string) => void;
  config: Config;
  subarrayDetails: any;
}

const MOCK_THUMBNAIL = '/static/images/mock/thumbnail.png';

const MAX_ROWS = 150; 

const LagPlotImage = ({
  element,
  onClick = null,
  config,
  subarrayDetails,
}: LagPlotImageProps) => {
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function getImageTN(item: string) {
    if (DATA_LOCAL) {
      return MOCK_THUMBNAIL;
    }
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}${config.paths.lag_plot_thumbnail_path}/${subarrayDetails?.execution_block?.pb_realtime}/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  }

  async function fetchHeatmapData(item: string) {
    const url = getImageTN(item);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch heatmap data: ${response.statusText}`);
      }

      const initialData = await response.json();
      if (!Array.isArray(initialData) || !initialData.length || !Array.isArray(initialData[0])) {
        throw new Error('Invalid heatmap data format');
      }

      const numColumns = initialData[0].length;

      setHeatmapData((prevData) => {
        const updatedData = [...prevData, ...initialData];
        return updatedData.slice(-MAX_ROWS);
      });

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
      ) : (
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
            margin: { t: 25, r: 25, b: 25, l: 25 },
          }}
        />
      )}
    </ImageListItem>
  );
};

export default LagPlotImage;
