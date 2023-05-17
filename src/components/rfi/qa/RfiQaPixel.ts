import * as d3 from 'd3/dist/d3.min';

// const FLAG_LEGENDS = ['TP', 'TN', 'FP', 'FN'];
const FLAG_COLORS = ['#2c7bb6', '#abd9e9', '#d7191c', '#fdae61'];

export default class RfiQaPixel {
  canvas;

  width;

  height;

  margin = { top: 2, right: 2, bottom: 2, left: 2 };

  constructor(id, width = 400, height = 20) {
    this.canvas = document.getElementById(id);
    this.width = width;
    this.height = height;

    // set the dimensions and margins of the graph
    this.width = this.width - this.margin.left - this.margin.right;
    this.height = this.height - this.margin.top - this.margin.bottom;
  }

  draw(data: { rfiData: number[]; flags: number[] }) {
    // validation
    // if (!data || !data.spectrum_values || !data.spectrum_values.length || !width || !height) return;
    const { rfiData, flags } = data;

    // clear
    d3.select(this.canvas).select('svg').remove();

    // append the svg object to the body of the page
    const svg = d3
      .select(this.canvas)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
      .attr('outline', 'gray 1px solid');

    let rh = 0;
    let rw = 0;
    rw = this.width / rfiData.length;
    rh = this.height;
    svg
      .selectAll('rect')
      .data(rfiData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => {
        return rw * i;
      })
      .attr('width', rw)
      .attr('height', rh)
      .attr('fill', (d, i) => {
        if (rfiData[i] !== 0 && flags[i] === 1) return FLAG_COLORS[0];
        if (rfiData[i] === 0 && flags[i] === 0) return FLAG_COLORS[1];
        if (rfiData[i] === 0 && flags[i] === 1) return FLAG_COLORS[2];
        if (rfiData[i] !== 0 && flags[i] === 0) return FLAG_COLORS[3];
        return 'black';
      });

    svg.exit().transition().duration(300).attr('y', this.height).attr('height', 0).remove();
  }
}
