/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import Plotly from '../Plotly/Plotly';
import Socket from '../../services/webSocket/Socket';

import { SOCKET_STATUS, WS_API_URL } from '../../utils/constants';

interface WaterfallPlotProps {
  type: string
  item: string,
  config: any,
  subArray: string
}

const WaterfallPlot = ({
  type,
  item,
  config,
  subArray
}: WaterfallPlotProps) => {
  const [chartData, setChartData] = React.useState(null);
  const [imageArray, setImageArray] = React.useState([]);
  const [socketStatus, setSocketStatus] = React.useState(SOCKET_STATUS[0])
  const { darkMode } = storageObject.useStore();

  function returnTopic(){
    switch(type) {
      case 'spectrograms':
        return config.topics.spectrograms;
      case 'lag_plots':
        return config.topics.lag_plot;
      default:
        console.error("Unknown waterfall plot type.");
        return "undefined"
    }
};

  React.useEffect(() => {
    console.error("Does this work?")
    Socket({
      apiUrl: WS_API_URL + config.paths.websocket,
      protocol: config.api_format,
      suffix: `${returnTopic}-${subArray}`,
      statusFunction: setSocketStatus,
      dataFunction: setChartData
    });
  },[]);

  React.useEffect(() =>{
    const baselines = item.split(/[-_]+/);
    console.error(baselines);
    var spectrogram = null;
    if (!imageArray){
      setImageArray([]);
    }
    console.log(chartData);
    for (spectrogram in chartData?.spectograms){
      console.error(spectrogram.baseline);
      if (spectrogram.baseline === `${baselines[0]}_${baselines[1]}` && spectrogram.polarisation === baselines[2]){
        imageArray.push(spectrogram.phase_values);
      }
    }
    setImageArray(imageArray);
  },[imageArray]);

  return (
        <Plotly
        darkMode={darkMode}
        data={imageArray}
        height={500}
        title={item}
        width={500}
        xLabel={""}
        yLabel={""}
        />
  );
};
export default WaterfallPlot;
