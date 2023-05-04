import * as d3 from 'd3';
import { HEIGHT, WIDTH } from '../utils/constants';

export class SpectrumPlotSvg {

  margin = { top: 10, right: 40, bottom: 60, left: 50 };

  svg;

  xLabel = 'Frequency (MHz)';

  yLabel = 'Power (dB)';

  xScale;

  yScale;

  selector: string;

  constructor(selector: string) {
    this.selector = selector;

    const usedWidth = WIDTH + this.margin.left + this.margin.right;
    const usedHeight = HEIGHT + this.margin.top + this.margin.bottom;
    const tmp = `0 0 ${usedWidth} ${usedHeight}`;
    // append the svg object to the selector
    this.svg = d3
      .select(selector)
      .append('svg')
      .attr("viewBox", tmp)
      .attr('role', 'img')
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private fillColor() { 
    // TODO : Need to make this light/dark dependant ? 
    return '#3366CC';
  }

  private textColor() { 
    // TODO : Need to make this light/dark dependant
    return '#303030';
  }

  public draw(data) {
    // console.log("SpectrumPlot:draw: data = ", data);
    // Set height such that Axes can render properly
    d3.select(this.selector)
      .select('svg')
      .attr('height', HEIGHT - this.margin.top + this.margin.bottom);

    this.svg.selectAll('text').remove();
    this.svg.selectAll('.tick').remove();
    this.svg.selectAll('path').remove();

    // create x-scale
    this.xScale = d3
      .scaleLinear()
      .domain([data?.x_min || 0, data.x_max])
      .range([0, WIDTH]);

    // create y-scale
    this.yScale = d3
      .scaleLinear()
      .domain([data?.y_min || 0, data.y_max])
      .range([HEIGHT, 0]);

    this.drawAxis();
    this.drawLine(data);
    this.drawConfidenceIntervals(data);

    this.svg
      .exit()
      .transition()
      .attr('y', HEIGHT)
      .attr('height', 0)
      .remove();
  }

  private drawAxis() {
    // add x-axis
    this.svg
      .append('g')
      .attr('transform', `translate(0,${HEIGHT})`)
      .call(d3.axisBottom(this.xScale));

    // add y axis
    this.svg.append('g').call(d3.axisLeft(this.yScale));

    // label for the x-axis
    this.svg
      .append('text')
      .attr('transform', `translate(${WIDTH / 2} ,${WIDTH + this.margin.top + 20})`)
      .style('fill', this.textColor())
      .style('text-anchor', 'middle')
      .style('font-size', '15px')
      .text(this.xLabel);

    // label for the y-axis
    this.svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margin.left)
      .attr('x', 0 - WIDTH / 2)
      .attr('dy', '1.0em')
      .style('fill', this.textColor())
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
      .attr('stroke', this.fillColor())
      .attr('stroke-width', 2)
      .attr('opacity', 1)
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((_d, i) => this.xScale(data.channels[i]))
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
          .x((_d, i) => data.channels[i])
          .y0((_d, i) => data.power[i] + data.sd_u[i])
          .y1((_d, i) => data.power[i] - data.sd_l[i])
      );
  }
}
