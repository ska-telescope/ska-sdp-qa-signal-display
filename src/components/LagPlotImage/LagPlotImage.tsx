import React, { useEffect, useState, useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { ImageListItem } from '@mui/material';
import Plot from 'react-plotly.js';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { DATA_API_URL, DATA_LOCAL } from '../../utils/constants';
import Config from '../../services/types/Config';

interface LagPlotImageProps {
  element: string;
  onClick?: (item: string) => void;
  APIconfig: Config;
  subarrayDetails: any;
}

const MOCK_THUMBNAIL = '/static/images/mock/thumbnail.png';

const LagPlotImage = ({
  element,
  onClick = null,
  APIconfig,
  subarrayDetails
}: LagPlotImageProps) => {
  const { t } = useTranslation('signalDisplay');
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numColumns, setNumColumns] = useState<number | null>(null);

  const getImageTN = (item: string) => {
    if (DATA_LOCAL) {
      return MOCK_THUMBNAIL;
    }
    const baselines = item.split(/[-_]+/);
    return `${DATA_API_URL}${APIconfig.paths.lag_plot_thumbnail_path}/${subarrayDetails?.execution_block?.pb_realtime}/${baselines[0]}/${baselines[1]}/${baselines[2]}`;
  };

  const fetchHeatmapData = async (item: string) => {
    const url = getImageTN(item);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        mode: 'cors'
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

      setHeatmapData(initialData);

      setError(null);
    } catch (err) {
      setError(err.message || 'Error fetching heatmap data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!APIconfig?.paths) {
      return;
    }
    setLoading(true);
    fetchHeatmapData(element);
  }, [element, APIconfig]);  

  const spectralWindow = useMemo(() => {
    const channels = subarrayDetails?.execution_block?.channels?.[0]?.spectral_windows?.[0];

    const frequencyWidth = (channels.freq_max - channels.freq_min) / numColumns;

    const halfCount = numColumns / 2;
    const result = Array.from({ length: numColumns }, (_, i) => {
      const value = i - halfCount;
      return value * (1 / frequencyWidth);
    });

    return result;
  }, [subarrayDetails, numColumns]);

  // Convert the Material-UI icon to an SVG string
  const svgString = ReactDOMServer.renderToStaticMarkup(<LocalMoviesIcon />);

  // Extract the path data from the SVG string
  const pathMatch = svgString.match(/<path d="([^"]*)"/);
  const iconPath = pathMatch ? pathMatch[1] : '';
  const customIcon = {
    width: 10,
    height: 10,
    path: iconPath
  };

  const config = {
    modeBarButtonsToAdd: [
      {
        name: 'Stream Data',
        icon: customIcon,
        click: function imageClick(item: string) {
          return onClick ? onClick(item) : null;
        }
      }
    ]
  };

  return (
    <ImageListItem key={element}>
      {loading ? (
        <p>Loading heatmap...</p>
      ) : (
        <Plot
          data={[
            {
              z: heatmapData,
              x: spectralWindow,
              type: 'heatmap',
              colorscale: 'Viridis',
              colorbar: { title: t('label.intensity'), titleside: 'right' }
            }
          ]}
          layout={{
            title: element,
            margin: { t: 25, r: 25, b: 25, l: 25 }
          }}
          config={config}
        />
      )}
    </ImageListItem>
  );
};

export default LagPlotImage;
