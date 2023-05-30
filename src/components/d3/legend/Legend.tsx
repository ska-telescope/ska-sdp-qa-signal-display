/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
import * as d3 from 'd3';

class D3Legend {

  svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  selector: string;

  darkMode: boolean;

  baseWidth: number;

  usedHeight: number;

  usedWidth: number;

  xCount: number;

  xOffset:number;

  yOffset:number;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(selector: string, darkMode: boolean) {

    this.selector = selector;
    this.darkMode = darkMode;

    this.usedWidth = parseInt(d3.select(selector).style("width"), 10);

    // append the svg object to the selector
    this.svg = d3
      .select(selector)
      .append('svg')
      .attr('role', 'img');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public draw(elements: any) {
    let i = 0;
    this.xCount = 0;
    elements.forEach((element: { name: string, active: boolean }) => this.drawElement(element, i++));
    const height = (this.yOffset + 1) * 40;
    this.svg.attr("viewBox", `0 0 ${this.usedWidth} ${height}`);
  }

  private fillColor() { 
    return this.darkMode ? 'black' : 'white';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private drawElement(element: { name: string, active: boolean }, occ: number) {

    const size = 20;
    const offset = 5;
    const xStart = 10;
    const yStart = 20;
    const xGap = 10;
    const textWidth = 100;

    const color = [ 
      "#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#00FFFF", "#008000", 
      "#000080", "#808000", "#800080", "#008080", "#808080", "#C00000", 
      "#00C000", "#0000C0", "#C0C000", "#C000C0", "#00C0C0", "#C0C0C0", 
      "#004000", "#404000", "#004040", "#404040", "#200000", "#002000", 
      "#000020", "#202000", "#200020", "#002020", "#202020", "#600000", 
      "#006000", "#000060", "#606000", "#600060", "#006060", "#606060", 
      "#A00000", "#00A000", "#0000A0", "#A0A000", "#A000A0", "#00A0A0", "#A0A0A0", 
      "#E00000", "#00E000", "#0000E0", "#E0E000", "#E000E0", "#00E0E0", "#E0E0E0"
    ];

    const elementWidth = (xStart + size + xGap) + (size + offset + textWidth + xGap);
    const numElements = Math.floor(this.usedWidth / elementWidth);
    const textSpace = size + offset + textWidth + xGap;

    this.xOffset = 0;
    this.yOffset = 0;
    for (let i = 0; i < occ; i++)
    {
      this.xOffset++;
      if (this.xOffset > numElements) {
        this.yOffset++;
        this.xOffset = 0;
      }
    }

    let xPos = xStart + this.xOffset * textSpace;
    let yPos = yStart + this.yOffset * (size + offset);

    this.svg
      .append("rect")
        // eslint-disable-next-line no-alert
        .attr("x", xPos)
        .attr("y", yPos) 
        .attr("width", size)
        .attr("height", size)
        .attr("style", `outline: thin solid ${color[occ]};`) 
        .style("fill", element.active ? color[occ] : this.fillColor());

    xPos = (xStart + size + xGap) + this.xOffset * textSpace;
    yPos = yStart + this.yOffset * (size + offset) + (size / 2);

    this.svg
      .append("text")
        .attr("x", xPos)
        .attr("y", yPos)
        .style("fill", color[occ])
        .text(element.name)
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");
  }
}

export default D3Legend
