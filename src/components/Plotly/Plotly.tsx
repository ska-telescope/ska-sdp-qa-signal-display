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
}

const Plotly = ({
  darkMode,
  data,
  height,
  title,
  width,

  xLabel,
  yLabel
}: PlotlyProps) => (
  <Plot
    data={data}
    layout={{
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
      yaxis: {
        title: yLabel,
        color: darkMode ? 'white' : 'black',
        automargin: true
      }
    }}
  />
);

Plotly.defaultProps = {};

export default Plotly;