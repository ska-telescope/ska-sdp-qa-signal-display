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
}

const Plotly = ({
  darkMode,
  data,
  height,
  title,
  width,

  xLabel,
  yLabel,
  masked,
  marginalHistogram
}: PlotlyProps) => {
  function assignLayout(marginalHistogram) {
    let layout = {};
    if (marginalHistogram) {
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
          domain: [0, 0.85]
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
        yaxis: {
          title: yLabel,
          color: darkMode ? 'white' : 'black',
          automargin: true
        },
        margin: { t: 25, r: 0 },

        shapes: masked
      };
    }
    return layout;
  }

  return (
    <>
      <Plot data={data} layout={assignLayout(marginalHistogram)} />
    </>
  );
};

Plotly.defaultProps = {};

export default Plotly;
