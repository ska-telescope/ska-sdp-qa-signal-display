import React from 'react';
import { Data } from 'plotly.js';
import Plot from 'react-plotly.js';

interface PlotlyProps {
  darkMode: boolean;
  data: Data[];
  height: number;
  title: string;
  width: number;
  xLabel: string;
  yLabel: string;
  masked?: Data[];
  marginalHistogram?: boolean;
  onSetSharedData?: any
  metricType?: string
}

const Plotly = ({
  darkMode,
  data,
  height,
  title,
  width,
  xLabel,
  yLabel,
  masked = [],
  marginalHistogram = false,
  onSetSharedData,
  metricType
}: PlotlyProps) => {
  function assignLayout(makeMarginal: boolean) {
    let layout = {};
    if (makeMarginal) {
      layout = {
        autosize: false,
        title,
        plot_bgcolor: darkMode ? 'black' : 'white',
        paper_bgcolor: darkMode ? 'black' : 'white',
        width,
        height,
        uirevision: 'time',
        xaxis: {
          title: xLabel,
          color: darkMode ? 'white' : 'black',
          automargin: true,
          domain: [0, 0.85]
        },
        yaxis: {
          title: yLabel,
          color: darkMode ? 'white' : 'black',
          automargin: true,
          domain: [0, 0.85],
          type: 'linear'
        },
        bargap: 0.05,
        margin: { t: 65 },
        xaxis2: {
          domain: [0.85, 1],
          showgrid: false,
          zeroline: false
        },
        barmode: 'overlay',
        shapes: masked
      };
    } else {
      layout = {
        autosize: false,
        title,
        plot_bgcolor: darkMode ? 'black' : 'white',
        paper_bgcolor: darkMode ? 'black' : 'white',
        width,
        height,
        uirevision: 'time',
        xaxis: {
          title: xLabel,
          color: darkMode ? 'white' : 'black',
          automargin: true
        },
        dragmode: 'select',
        selectdirection: 'h',
        yaxis: {
          title: yLabel,
          color: darkMode ? 'white' : 'black',
          automargin: true,
          type: 'linear'
        },
        margin: { t: 25, r: 0 },

        shapes: masked,

        selection: [
          {
            type: 'line',
            line: {
              color: 'red',
              dash: 'dot',
              width: 2,
            },
          }
        ],
      };
    }
    return layout;
  }

  const handleSelection = (event: any) => {
    if (event && event.range && event.range.x) {
      onSetSharedData({data: event.range.x, metric: metricType});
    }
  };

  return <Plot data={data} layout={assignLayout(marginalHistogram)} onSelected={handleSelection}/>;
};

export default Plotly;
