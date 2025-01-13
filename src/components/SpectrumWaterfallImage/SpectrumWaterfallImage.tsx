import React, { useEffect, useState, useMemo } from 'react';
import ReactDOMServer from 'react-dom/server'
import { ImageListItem } from '@mui/material';
import { DATA_API_URL, DATA_LOCAL } from '../../utils/constants';
import Config from '../../services/types/Config';
import Plot from 'react-plotly.js';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { calculateChannels } from '../../utils/calculate';

interface SpectrumWaterfallProps {
  element: string;
  onClick?: (item: string) => void;
  APIconfig: Config;
  subarrayDetails: any;
}

const MOCK_THUMBNAIL = '/static/images/mock/thumbnail.png';
const MAX_ROWS = 150;

const SpectrumWaterfall = ({
  element,
  onClick = null,
  APIconfig,
  subarrayDetails,
}: SpectrumWaterfallProps) => {
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numColumns, setNumColumns] = useState<number | null>(null);

  const getImageTN = (item: string) => {
    if (DATA_LOCAL) {
      return MOCK_THUMBNAIL;
    }
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}${APIconfig.paths.spectrum_waterfalls_thumbnail_path}/${subarrayDetails?.execution_block?.pb_realtime}/${baselines[0]}/`;
  };

  const fetchHeatmapData = async (item: string) => {
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

      const columns = initialData[0].length;
      setNumColumns(columns);

      setHeatmapData(initialData)

      setError(null);
    } catch (err) {
      setError(err.message || 'Error fetching heatmap data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchHeatmapData(element);
  }, [element]);

  const spectralWindow = useMemo(() => {
    const channels = subarrayDetails?.execution_block?.channels?.[0]?.spectral_windows?.[0];
    return channels
      ? {
          freq_max: channels.freq_max,
          freq_min: channels.freq_min,
          count: numColumns ?? channels.count, 
        }
      : null;
  }, [subarrayDetails, numColumns]);

  const xValues = useMemo(() => {
    return spectralWindow ? calculateChannels(spectralWindow) : [];
  }, [spectralWindow]);

  // Convert the Material-UI icon to an SVG string
  const svgString = ReactDOMServer.renderToStaticMarkup(<LocalMoviesIcon />);

  // Extract the path data from the SVG string
  const pathMatch = svgString.match(/<path d="([^"]*)"/);
  const iconPath = pathMatch ? pathMatch[1] : '';
  const customIcon = {
    width: 5,
    height: 5,
    path: iconPath,
  };

  var config = {modeBarButtonsToAdd: [
    {
      name: 'Stream Data',
      icon: customIcon,
      click: function imageClick(item: string) {
        return onClick ? onClick(item) : null;
      }
    }
  ]}

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
              x: xValues,
              type: 'heatmap',
              colorscale: 'Viridis',
              colorbar: { title: 'Intensity', titleside: 'right' },
            },
          ]}
          layout={{
            title: element,
            margin: { t: 25, r: 25, b: 25, l: 25 },
          }}
          config={config}
          
        />
      )}
    </ImageListItem>
  );
};

export default SpectrumWaterfall;
