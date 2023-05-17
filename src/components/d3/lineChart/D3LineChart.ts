import * as d3 from 'd3';

const LABEL_ANCHOR = 'middle;';
const LABEL_FONT = '15px';
const TITLE_FONT = '24px';
const RATIO = 4;

class D3LineChart {

  margin = { top: 50, right: 0, bottom: 50, left: 50 };

  svg;

  xScale;

  yScale;

  selector: string;

  title: string;

  xLabel: string;

  yLabel: string;

  darkMode: boolean;

  baseWidth: number;

  usedHeight: number;

  usedWidth: number;

  constructor(selector: string, title: string, xLabel: string, yLabel: string, darkMode: boolean, width?: number) {

    this.selector = selector;
    this.title = title;
    this.xLabel = xLabel;
    this.yLabel = yLabel;
    this.darkMode = darkMode;
    this.baseWidth = width;
    this.usedWidth = this.baseWidth + this.margin.left + this.margin.right;
    this.usedHeight = (this.baseWidth / RATIO) + this.margin.top + this.margin.bottom;

    // append the svg object to the selector
    this.svg = d3
      .select(selector)
      .append('svg')
      .attr("viewBox", `0 40 ${this.usedWidth} ${this.usedHeight}`)
      .attr('role', 'img')
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public draw(data: { x_min: any; x_max: any; y_min: any; y_max: any; xData: any; yData: any }) {
    d3.select(this.selector)
      .select('svg')
      .attr('height', (this.baseWidth / RATIO) - this.margin.top + this.margin.bottom);

    this.svg.selectAll('text').remove();
    this.svg.selectAll('.tick').remove();
    this.svg.selectAll('path').remove();

    // create x-scale
    this.xScale = d3
      .scaleLinear()
      .domain([data?.x_min || 0, data.x_max])
      .range([0, this.baseWidth]);

    // create y-scale
    this.yScale = d3
      .scaleLinear()
      .domain([data?.y_min || 0, data.y_max])
      .range([(this.baseWidth / RATIO), 0]);

    this.drawAxis();
    this.drawTitle();
    let i = 0;
    data.yData.forEach((yData) => this.drawLine(data.xData, yData, i++));

    this.svg
      .exit()
      .transition()
      .attr('y', (this.baseWidth / RATIO))
      .attr('height', 0)
      .remove();
  }

  // 55 Values  ( Blacked removed )
  private fillColorsLight = [ 
      "#FF0000", "#00FF00", "#0000FF", "#800000", "#FF00FF", "#00FFFF", 
      "#008000", "#000080", "#808000", "#800080", "#008080", "#808080", 
      "#C00000", "#00C000", "#0000C0", "#C0C000", "#C000C0", "#00C0C0", "#C0C0C0", 
      "#400000", "#004000", "#000040", "#404000", "#400040", "#004040", "#404040", 
      "#200000", "#002000", "#000020", "#202000", "#200020", "#002020", "#202020", 
      "#600000", "#006000", "#000060", "#606000", "#600060", "#006060", "#606060", 
      "#A00000", "#00A000", "#0000A0", "#A0A000", "#A000A0", "#00A0A0", "#A0A0A0", 
      "#E00000", "#00E000", "#0000E0", "#E0E000", "#E000E0", "#00E0E0", "#E0E0E0"
  ];

  private fillColorsDark = [ 
    "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", 
    "#008000", "#000080", "#808000", "#800080", "#008080", "#808080", 
    "#C00000", "#00C000", "#0000C0", "#C0C000", "#C000C0", "#00C0C0", "#C0C0C0", 
    "#400000", "#004000", "#000040", "#404000", "#400040", "#004040", "#404040", 
    "#200000", "#002000", "#000020", "#202000", "#200020", "#002020", "#202020", 
    "#600000", "#006000", "#000060", "#606000", "#600060", "#006060", "#606060", 
    "#A00000", "#00A000", "#0000A0", "#A0A000", "#A000A0", "#00A0A0", "#A0A0A0", 
    "#E00000", "#00E000", "#0000E0", "#E0E000", "#E000E0", "#00E0E0", "#E0E0E0"
];


  private fillColor(occ: number) { 
    return this.darkMode ? this.fillColorsDark[occ] : this.fillColorsLight[occ];
  }

  private labelColor() { 
    return this.darkMode ? 'white' : 'black';
  }

  private drawTitle() {          
    this.svg.append("text")
      .attr('transform', `translate(0  ,${(this.baseWidth / RATIO) + this.margin.top})`)
      .style('fill', this.labelColor())
      .style('text-anchor', LABEL_ANCHOR)
      .style('font-size', TITLE_FONT)
      .style("text-decoration", "underline")  
      .text(this.title);
  }

  private drawAxis() {
    
    // add x-axis
    this.svg
      .append('g')
      .attr('transform', `translate(0,${(this.baseWidth / RATIO)})`)
      .call(d3.axisBottom(this.xScale));

    // add y axis
    this.svg.append('g').call(d3.axisLeft(this.yScale));

    // label for the x-axis
    this.svg.append('text')
      .attr('transform', `translate(${this.baseWidth / 2} ,${(this.baseWidth / RATIO) + this.margin.top })`)
      .style('fill', this.labelColor())
      .style('text-anchor', LABEL_ANCHOR)
      .style('font-size', LABEL_FONT)
      .text(this.xLabel);

    // label for the y-axis
    this.svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - this.margin.left)
      .attr('x', 0 - (this.baseWidth / RATIO) / 2 - this.margin.top)
      .attr('dy', '1.0em')
      .style('fill', this.labelColor())
      .style('text-anchor', LABEL_ANCHOR)
      .style('font-size', LABEL_FONT)
      .text(this.yLabel);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private drawLine(xData: any[], yData: any[], occ: number) {
    this.svg
      .append('path')
      .datum(xData)
      .attr('fill', 'none')
      .attr('stroke', this.fillColor(occ))
      .attr('stroke-width', 2)
      .attr('opacity', 1)
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((_d, i) => this.xScale(xData[i]))
          .y((_d, i) => this.yScale(yData[i]))
      );
  }
}

export default D3LineChart
