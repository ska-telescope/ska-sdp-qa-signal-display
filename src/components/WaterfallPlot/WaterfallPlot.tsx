import React from 'react';
import Plot from 'react-plotly.js';
import Config from '../../services/types/Config';
import Socket from '../../services/webSocket/Socket';
import SignalCard from '../SignalCard/SignalCard';
import { Grid, Typography } from '@mui/material';
import {
  WATERFALL_PLOT_TYPES,
  WS_API_URL,
  DATA_LOCAL,
} from '../../utils/constants';

interface WaterfallPlotProps {
  type: string;
  item: string;
  config: Config;
  subArray: string;
  hiResWindows?: [];
}

const WaterfallPlot = ({ type, item, config, subArray, hiResWindows }: WaterfallPlotProps) => {
  const [chartData, setChartData] = React.useState<Record<string, any>>({});
  const [imageArrays, setImageArray] = React.useState<Record<string, any>>({});
  const [socketStatuses, setSocketStatuses] = React.useState<Record<string, string>>({});

  function returnTopic() {
    switch (type) {
      case WATERFALL_PLOT_TYPES.SPECTROGRAM:
        return config.topics.phase;
      case WATERFALL_PLOT_TYPES.LAG_PLOT:
        return config.topics.lagplot;
      case WATERFALL_PLOT_TYPES.SPECTRUM:
        return config.topics.spectrum;
      default:
        return 'undefined';
    }
  }

  React.useEffect(() => {
    if (!DATA_LOCAL) {
      const newSocketStatuses: Record<string, string> = {};
      const newChartData: Record<string, any> = {};

      const defaultSocketKey = `${returnTopic()}-${subArray}`;
      Socket({
        apiUrl: WS_API_URL + config.paths.websocket,
        protocol: config.api_format,
        suffix: defaultSocketKey,
        statusFunction: (status) => {
          newSocketStatuses[defaultSocketKey] = status;
          setSocketStatuses({ ...socketStatuses, ...newSocketStatuses });
        },
        dataFunction: (data) => {
          newChartData[defaultSocketKey] = data;
          setChartData({ ...chartData, ...newChartData });
        },
      });

      let metric: string;
      hiResWindows?.forEach( window  => {
        const topic = window.topic;
      if (topic.includes('spectrum')) {
        metric = config.topics.spectrum
      } else if (topic.includes('phase')) {
        metric = config.topics.phase
      } else if (topic.includes('lagplot')) {
        metric = config.topics.lagplot
      }
      const partition = (window.index ?? 0) + 1;
      const hiResKey = `${window.index}_${window.topic}`;
      Socket({
        apiUrl: WS_API_URL + config.paths.websocket,
        protocol: config.api_format,
        suffix: `${metric}-${subArray}/${partition.toString()}`,
        statusFunction: (status) => {
          newSocketStatuses[hiResKey] = status;
          setSocketStatuses({ ...socketStatuses, ...newSocketStatuses });
        },
        dataFunction: (data) => {
          newChartData[hiResKey] = data;
          setChartData({ ...chartData, ...newChartData });
        },
      });
      });
    }
  }, []);


  React.useEffect(() => {
    if (!chartData) return;

    setImageArray((prevImageArrays) => {
      const updatedArrays = { ...prevImageArrays };

      Object.entries(chartData).forEach(([key, chartEntry]) => {
        if (chartEntry?.data) {
          if (type === WATERFALL_PLOT_TYPES.SPECTRUM) {
          const newImages = chartEntry.data
            .filter((dataPayload) => dataPayload.polarisation === item)
            .map((dataPayload) => dataPayload.power);

          if (newImages.length) {
            updatedArrays[key] = updatedArrays[key]
              ? [...updatedArrays[key], ...newImages]
              : newImages;
          }
        }
        else if (type !== WATERFALL_PLOT_TYPES.SPECTRUM) {
          const baselines = item.split(/[-_]+/);
          const newImages = chartEntry.data
            .filter((dataPayload) =>
              dataPayload.baseline === `${baselines[0]}_${baselines[1]}` &&
              dataPayload.polarisation === baselines[2])
            .map((dataPayload) => dataPayload.data);

          if (newImages.length) {
            updatedArrays[key] = updatedArrays[key]
              ? [...updatedArrays[key], ...newImages]
              : newImages;
          }
        }}
      });

      return updatedArrays;
    });
  }, [chartData]);

  return (
    <SignalCard
      data-testid="signalCardId"
      title={`Default: ${item}`}
      socketStatus={socketStatuses[`${returnTopic()}-${subArray}`]}
      showContent
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" gutterBottom>
            Default Waterfall Heatmap
          </Typography>
          <Plot
            data={[
              {
                z: imageArrays[`${returnTopic()}-${subArray}`] || [],
                type: 'heatmap',
                colorscale: 'Viridis',
              },
            ]}
            layout={{
              width: 500,
              height: 500,
              title: 'Heatmap',
            }}
          />
        </Grid>

        {hiResWindows?.map((window) => {
          const hiResKey = `${window.index}_${window.topic}`;
          return (
            <Grid item xs={12} sm={6} md={4} key={hiResKey}>
              <Typography variant="subtitle1" gutterBottom>
                Hi-Res Heatmap
              </Typography>
              <Plot
                data={[
                  {
                    z: imageArrays[hiResKey] || [],
                    type: 'heatmap',
                    colorscale: 'Viridis',
                  },
                ]}
                layout={{
                  width: 500,
                  height: 500,
                  title: `Hi-Res: ${hiResKey}`,
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </SignalCard>
  );
};

export default WaterfallPlot;
