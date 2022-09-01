import * as d3 from 'd3';

export default class SpectrumPlotSvg {
  width: number;

  height: number;

  margin = { top: 10, right: 40, bottom: 60, left: 50 };

  svg;

  xLabel = 'Frequency (MHz)';

  yLabel = 'Power (dB)';

  xScale;

  yScale;

  constructor(selector: string, width = 1200, height = 600) {
    this.width = width;
    this.height = height;

    // append the svg object to the selector
    this.svg = d3
      .select(selector)
      .append('svg')
      .attr('width', width - this.margin.left - this.margin.right)
      .attr('height', height - this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  public draw(data) {
    // console.log("SpectrumPlot:draw: data = ", data);
    this.svg.selectAll('text').remove();
    this.svg.selectAll('.tick').remove();
    this.svg.selectAll('path').remove();

    // create x-scale
    this.xScale = d3
      .scaleLinear()
      .domain([data?.xMin || 0, data.xMax])
      .range([0, this.width]);

    // create y-scale
    this.yScale = d3
      .scaleLinear()
      .domain([data?.yMin || 0, data.yMax])
      .range([this.height, 0]);

    this.drawAxis();
    this.drawLine(data);
    this.drawConfidenceIntervals(data);

    this.svg
      .exit()
      .transition()
      // .duration(300)
      .attr('y', this.height)
      .attr('height', 0)
      .remove();
  }

  private drawAxis() {
    // add x-axis
    this.svg
      .append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(this.xScale));

    // add y axis
    this.svg.append('g').call(d3.axisLeft(this.yScale));

    // label for the x-axis
    this.svg
      .append('text')
      .attr('transform', `translate(${this.width / 2} ,${this.height + this.margin.top + 20})`)
      .style('fill', '#303030')
      .style('text-anchor', 'middle')
      .style('font-size', '15px')
      .text(this.xLabel);

    // label for the y-axis
    this.svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margin.left)
      .attr('x', 0 - this.height / 2)
      .attr('dy', '1.0em')
      .style('fill', '#303030')
      .style('text-anchor', 'middle')
      .style('font-size', '15px')
      .text(this.yLabel);
  }

  private drawLine(data) {
    // add the line
    this.svg
      .append('path')
      .datum(data.channels)
      .attr('fill', 'none')
      .attr('stroke', '#3366CC')
      .attr('stroke-width', 2)
      .attr('opacity', 1)
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((_d, i) => {
            // console.log(data.channels[i]);
            return this.xScale(data.channels[i]);
          })
          .y((_d, i) => this.yScale(data.power[i]))
      );
  }

  private drawConfidenceIntervals(data) {
    this.svg
      .append('path')
      .datum(data.channels)
      .attr('fill', '#1f77b4')
      .attr('stroke', 'none')
      .attr('opacity', 0.3)
      .attr(
        'd',
        d3
          .area()
          .curve(d3.curveMonotoneX)
          .x((_d, i) => this.xScale(data.channels[i]))
          .y0((_d, i) => this.yScale(data.power[i] + data.sdU[i]))
          .y1((_d, i) => this.yScale(data.power[i] - data.sdL[i]))
      );
  }
}
