import * as d3 from 'd3/dist/d3.min';

const Y_OFFSET = 10;
const LEGEND_DOT_RAD = 6;
const FLAG_LEGENDS = ['TP', 'TN', 'FP', 'FN'];
const FLAG_COLORS = ['#2c7bb6', '#abd9e9', '#d7191c', '#fdae61']; // ["#A9A9A9", "#D3D3D3", "#FF6666", "#FF9966"];

const LINE_COLOR = ['#CC00CC', '#4daf4a', '#D3D3D3'];
const LINE_LEGENDS = ['RFI', 'Visibility', 'RFI + Vis.'];

class RfiDetailPlots {
  canvas;

  width;

  height;

  margin = { top: 10, right: 100, bottom: Y_OFFSET * 6, left: 50 };

  svg;

  constructor(id, width = 1600, height = 400) {
    this.canvas = document.getElementById(id);
    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;
  }

  draw(data) {
    // console.log("RfiDetailsPlot:draw: data = ", data);

    // validations
    // if (!data || !data.spectrum_values || !data.spectrum_values.length || !width || !height) return;
    const {
      // description,
      xLabel,
      yLabel,
      sumData,
      visData,
      rfiData,
      flags,
      frequencies,
      xMin,
      xMax,
      yMin,
      yMax
    } = data;

    // clear
    d3.select(this.canvas).select('svg').remove();

    // append the svg object to the body of the page
    this.svg = d3
      .select(this.canvas)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // add x-axis
    const x = d3.scaleLinear().domain([xMin, xMax]).range([0, this.width]);
    this.svg
      .append('g')
      .attr('transform', `translate(0,${this.height + 2 * Y_OFFSET})`)
      .call(d3.axisBottom(x));

    // add y-axis
    const y = d3.scaleLinear().domain([yMin, yMax]).range([this.height, 0]);
    this.svg.append('g').call(d3.axisLeft(y));

    // draw the flagger on top of x-axis
    const rh = Y_OFFSET;
    const rw = this.width / frequencies.length;

    this.svg
      .selectAll('rect')
      .data(frequencies)
      .enter()
      .append('rect')
      .attr('x', (i) => {
        return rw * i;
      })
      .attr('y', () => y(yMin) + 0.5 * Y_OFFSET)
      .attr('width', rw)
      .attr('height', rh)
      .attr('fill', (i) => {
        if (rfiData[i] !== 0 && flags[i] === 1) return FLAG_COLORS[0];
        if (rfiData[i] === 0 && flags[i] === 0) return FLAG_COLORS[1];
        if (rfiData[i] === 0 && flags[i] === 1) return FLAG_COLORS[2];
        if (rfiData[i] !== 0 && flags[i] === 0) return FLAG_COLORS[3];
        return 'black';
      })
      .attr('opacity', 0.8)
      .attr('style', 'stroke-width:0.5;stroke:rgb(255,255,255)');

    // draw lines
    //  line plot for the sum of visibility and rfi data
    this.svg
      .append('path')
      .datum(sumData)
      .attr('fill', 'none')
      .attr('stroke', LINE_COLOR[2])
      .attr('stroke-width', 8)
      .attr('opacity', 0.6)
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((d, i) => x(frequencies[i]))
          .y((d) => y(d))
      );

    // line plot for the rfi data
    this.svg
      .append('path')
      .datum(rfiData)
      .attr('fill', 'none')
      .attr('stroke', LINE_COLOR[0])
      .attr('stroke-width', 2)
      .attr('opacity', 0.8)
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((d, i) => x(frequencies[i]))
          .y((d) => y(d))
      );

    //  line plot for the visibility data
    this.svg
      .append('path')
      .datum(visData)
      .attr('fill', 'none')
      .attr('stroke', LINE_COLOR[1])
      .attr('stroke-width', 2)
      .attr('opacity', 0.8)
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((d, i) => x(frequencies[i]))
          .y((d) => y(d))
      );

    // label for the x-axis
    this.svg
      .append('text')
      .attr(
        'transform',
        `translate(${this.width / 2} ,${this.height + this.margin.top + 4 * Y_OFFSET})`
      )
      .style('fill', 'black')
      .style('text-anchor', 'middle')
      .style('font-size', '15px')
      .text(xLabel);

    // label for the y axis
    this.svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margin.left)
      .attr('x', 0 - this.height / 2)
      .attr('dy', '1.0em')
      .style('fill', 'black')
      .style('text-anchor', 'middle')
      .style('font-size', '15px')
      .text(yLabel);

    // add one dot in the legend for each name.
    const legends = FLAG_LEGENDS.concat(LINE_LEGENDS);
    const colors = FLAG_COLORS.concat(LINE_COLOR);
    this.svg
      .selectAll('legend_dots')
      .data(legends)
      .enter()
      .append('circle')
      .attr('cx', this.width)
      .attr('cy', (d, i) => {
        // height is where the first dot appears. 25 is the distance between dots
        return i * 25;
      })
      .attr('r', LEGEND_DOT_RAD)
      .style('fill', (d, i) => {
        return colors[i];
      });

    // add one dot in the legend for each name.
    this.svg
      .selectAll('legend_labels')
      .data(legends)
      .enter()
      .append('text')
      .attr('x', this.width + 2 * LEGEND_DOT_RAD)
      .attr('y', (d, i) => {
        // height is where the first dot appears. 25 is the distance between dots
        return i * 25;
      })
      .style('fill', (d, i) => {
        return colors[i];
      })
      .text((d) => {
        return d;
      })
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle');

    //
    this.svg.exit().transition().duration(300).attr('y', this.height).attr('height', 0).remove();
  }
}

export default RfiDetailPlots;
