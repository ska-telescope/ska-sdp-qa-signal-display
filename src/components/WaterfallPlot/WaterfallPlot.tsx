import React from 'react';

import Config from '../../services/types/Config';
import WaterfallCanvas from './WaterfallCanvas';
import Socket from '../../services/webSocket/Socket';
import SignalCard from '../SignalCard/SignalCard';
import { Grid, Typography } from '@mui/material'
import {
  LOOKUP_COLOUR_VALUES,
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
        return config.topics.spectrograms;
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
      } else if (topic.includes('spectrograms')) {
        metric = config.topics.spectrograms
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
          const baselines = item.split(/[-_]+/);
          const newImages = [];
  
          chartEntry.data
            .filter(
              (dataPayload) =>
                dataPayload.baseline === `${baselines[0]}_${baselines[1]}` &&
                dataPayload.polarisation === baselines[2]
            )
            .forEach((dataPayload) => {
              const rgbaValues = [];
              if (type === WATERFALL_PLOT_TYPES.SPECTROGRAM) {
                dataPayload.data?.forEach((value: number) => {
                  rgbaValues.push(LOOKUP_COLOUR_VALUES[value] || [0, 0, 0, 255]);
                });
              } else if (type === WATERFALL_PLOT_TYPES.LAG_PLOT) {
                const normalizedData = normaliseValues(dataPayload.data || []);
                normalizedData.forEach((value: number) => {
                  rgbaValues.push(LOOKUP_COLOUR_VALUES[value] || [0, 0, 0, 255]);
                });
              }
              if (rgbaValues.length) {
                newImages.push(rgbaValues);
              }
            });
  
            if (newImages.length) {
              updatedArrays[key] = updatedArrays[key]
                ? [...updatedArrays[key], ...newImages]
                : newImages;
            }
            
        }
      });
  
      return updatedArrays;
    });
  }, [chartData]);
  
  
  function normaliseValues(data: number[]) {
    if (!data.length) return [];
    const max = Math.max(...data);
    const ratio = max ? 360 / max : 1;
    return data.map((value) => Math.round(value * ratio));
  }
  
  

  function createUint8ClampedArray(data) {
    if (data?.[0]) {
      const height = data.length;
      const width = data[0].length;
      const buffer = new Uint8ClampedArray(width * height * 4);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pos = (y * width + x) * 4;
          buffer[pos] = data[y][x][0]; // R
          buffer[pos + 1] = data[y][x][1]; // G
          buffer[pos + 2] = data[y][x][2]; // B
          buffer[pos + 3] = data[y][x][3]; // Alpha
        }
      }
      return buffer;
    }
    return new Uint8ClampedArray(500 * 500 * 4).fill(255);
  }

  return (
    <>
    <SignalCard
      data-testid="signalCardId"
      title={`Default: ${item}`}
      socketStatus={socketStatuses[`${returnTopic()}-${subArray}`]}
      showContent
    >
      <Grid container spacing={2}>
        {/* Default WaterfallCanvas */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" gutterBottom>
            Default Waterfall View
          </Typography>
          <WaterfallCanvas
            data={createUint8ClampedArray(imageArrays[`${returnTopic()}-${subArray}`])}
            height={
              imageArrays[`${returnTopic()}-${subArray}`]?.length || 500
            }
            width={
              imageArrays[`${returnTopic()}-${subArray}`]?.[0]?.length || 500
            }
          />
        </Grid>
  
        {/* High-resolution Windows */}
        {hiResWindows?.map((window) => {
          const hiResKey = `${window.index}_${window.topic}`;
          return (
            <Grid item xs={12} sm={6} md={4} key={hiResKey}>
              <Typography variant="subtitle1" gutterBottom>
                Hi-Res Waterfall View
              </Typography>
              <WaterfallCanvas
                data={createUint8ClampedArray(imageArrays[hiResKey])}
                height={imageArrays[hiResKey]?.length || 500}
                width={imageArrays[hiResKey]?.[0]?.length || 500}
              />
            </Grid>
          );
        })}
      </Grid>
    </SignalCard>
  </>
  );
};

export default WaterfallPlot;
