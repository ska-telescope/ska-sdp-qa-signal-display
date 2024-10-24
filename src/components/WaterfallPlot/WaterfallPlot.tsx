/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  prefer-destructuring */
import React from 'react';

import Config from '../../services/types/Config';
import WaterfallCanvas from './WaterfallCanvas';
import Socket from '../../services/webSocket/Socket';
import SignalCard from '../SignalCard/SignalCard';

import {
  LOOKUP_COLOUR_VALUES,
  SOCKET_STATUS,
  WATERFALL_PLOT_TYPES,
  WS_API_URL,
  DATA_LOCAL
} from '../../utils/constants';

interface WaterfallPlotProps {
  type: string;
  item: string;
  config: Config;
  subArray: string;
}

const WaterfallPlot = ({ type, item, config, subArray }: WaterfallPlotProps) => {
  const [chartData, setChartData] = React.useState(null);
  const [imageArray, setImageArray] = React.useState([]);
  const [socketStatus, setSocketStatus] = React.useState(SOCKET_STATUS[0]);

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

  function normaliseValues(data: number[]) {
    /* eslint-disable prefer-spread */
    const ratio = Math.max.apply(Math, data) / 360;
    const normalisedData = [];
    data.forEach((value: number) => normalisedData.push(Math.round(value / ratio)));
    return normalisedData;
  }

  function normaliseSpectrumValues(data: number[]) {
    /* eslint-disable prefer-spread */
    const ratio = 360 / Math.max.apply(Math, data);
    const normalisedData = [];
    data.forEach((value: number) => normalisedData.push(Math.round(value * ratio)));
    return normalisedData;
  }

  React.useEffect(() => {
    if (!DATA_LOCAL) {
      Socket({
        apiUrl: WS_API_URL + config.paths.websocket,
        protocol: config.api_format,
        suffix: `${returnTopic()}-${subArray}`,
        statusFunction: setSocketStatus,
        dataFunction: setChartData
      });
    }
  }, []);

  React.useEffect(() => {
    if (!imageArray) {
      setImageArray([]);
    }

    if (type !== WATERFALL_PLOT_TYPES.SPECTRUM) {
      const baselines = item.split(/[-_]+/);
      chartData?.data
        .filter(
          dataPayload =>
            dataPayload.baseline === `${baselines[0]}_${baselines[1]}` &&
            dataPayload.polarisation === baselines[2]
        )
        .forEach(dataPayload => {
          const rgbaValues = [];
          if (type === WATERFALL_PLOT_TYPES.SPECTROGRAM) {
            dataPayload.data.forEach((value: number) => {
              rgbaValues.push(LOOKUP_COLOUR_VALUES[value]);
            });
          } else if (type === WATERFALL_PLOT_TYPES.LAG_PLOT) {
            const normalisedData = normaliseValues(dataPayload.data);
            normalisedData.forEach((value: number) => {
              rgbaValues.push(LOOKUP_COLOUR_VALUES[value]);
            });
          }
          imageArray.push(rgbaValues);
        });
    } else {
      chartData?.data
        .filter(dataPayload => dataPayload.polarisation === `${item}`)
        .forEach(dataPayload => {
          const rgbaValues = [];
          const normalisedData = normaliseSpectrumValues(dataPayload.power);
          normalisedData.forEach((value: number) => {
            rgbaValues.push(LOOKUP_COLOUR_VALUES[value]);
          });
          imageArray.push(rgbaValues);
        });
    }
    setImageArray(imageArray);
  }, [chartData]);

  function createDefaultImage() {
    const buffer = new Uint8ClampedArray(500 * 500 * 4);

    for (let y = 0; y < 500; y++) {
      for (let x = 0; x < 500; x++) {
        const pos = (y * 500 + x) * 4; // position in buffer based on x and y
        buffer[pos + 0] = 190; // some R value [0, 255]
        buffer[pos + 1] = 0; // some G value
        buffer[pos + 2] = 210; // some B value
        buffer[pos + 3] = 255; // set alpha channel
      }
    }
    return buffer;
  }

  function createUint8ClampedArray(data) {
    if (data && data[0]) {
      const height = data.length;
      const width = data[0].length;
      const buffer = new Uint8ClampedArray(width * height * 4);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pos = (y * width + x) * 4; // position in buffer based on x and y
          buffer[pos + 0] = data[y][x][0]; // some R value [0, 255]
          buffer[pos + 1] = data[y][x][1]; // some G value
          buffer[pos + 2] = data[y][x][2]; // some B value
          buffer[pos + 3] = data[y][x][3]; // set alpha channel
        }
      }
      return buffer;
    }
    return createDefaultImage();
  }

  function showToggle() {
    return true;
  }

  return (
    <SignalCard
      data-testid="signalCardId"
      title={`${item}`}
      socketStatus={socketStatus}
      showContent
      /* eslint-disable react/jsx-no-bind */
      setShowContent={showToggle}
    >
      <WaterfallCanvas
        data={createUint8ClampedArray(imageArray)}
        height={imageArray && imageArray.length > 0 ? imageArray.length : 500}
        width={imageArray && imageArray[0] ? imageArray[0].length : 500}
      />
    </SignalCard>
  );
};
export default WaterfallPlot;
