import * as d3 from 'd3';
import { HEIGHT, WIDTH } from '../../../utils/constants';

const LABEL_ANCHOR = 'middle;';
const LABEL_FONT = '15px';

class D3LineChart {

  margin = { top: 10, right: 50, bottom: 50, left: 50 };

  svg;

  xScale;

  yScale;

  selector: string;

  xLabel: string;

  yLabel: string;

  constructor(selector: string, xLabel: string, yLabel: string) {

    this.selector = selector;
    this.xLabel = xLabel;
    this.yLabel = yLabel;

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

  public draw(data) {
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

    this.svg
      .exit()
      .transition()
      .attr('y', HEIGHT)
      .attr('height', 0)
      .remove();
  }

  private isDark() {
    // TODO : We should sort this out.
    return false;
  }

  private fillColor() { 
    // TODO : We should obtain the correct coloring
    return this.isDark() ? 'yellow' : '#3366CC';
  }

  private labelColor() { 
        // TODO : We should obtain the correct coloring
    return this.isDark() ? '#000000' : '#303030';
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
      .attr('transform', `translate(${WIDTH / 2} ,${HEIGHT + this.margin.top + 20})`)
      .style('fill', this.labelColor())
      .style('text-anchor', LABEL_ANCHOR)
      .style('font-size', LABEL_FONT)
      .text(this.xLabel);

    // label for the y-axis
    this.svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margin.left)
      .attr('x', 0 - HEIGHT / 2)
      .attr('dy', '1.0em')
      .style('fill', this.labelColor())
      .style('text-anchor', LABEL_ANCHOR)
      .style('font-size', LABEL_FONT)
      .text(this.yLabel);
  }

  private drawLine(data) {
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
}

export default D3LineChart
