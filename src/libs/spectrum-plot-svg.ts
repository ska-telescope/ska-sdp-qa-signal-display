import * as d3 from "d3";

let width = 1200;
let height = 600;
const margin = { top: 10, right: 10, bottom: 40, left: 50 };
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;
const xLabel = "Frequency channels";
const yLabel = "Power (in dB)";

export class SpectrumPlotSvg {
  svg: any;
  xScale: any;
  yScale: any;

  constructor(selector: string) {
    // append the svg object to the selector
    this.svg = d3
      .select(selector)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // label for the x-axis
    this.svg
      .append("text")
      .attr("transform", `translate(${width / 2} ,${height + margin.top + 20})`)
      .style("fill", "grey")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .text(xLabel);

    // label for the y-axis
    this.svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1.0em")
      .style("fill", "grey")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .text(yLabel);
  }

  public draw(data: any) {
    //console.log("SpectrumPlot:draw: data = ", data);
    this.svg.selectAll("path").remove();
    this.svg.selectAll(".tick").remove();

    // create x-scale
    this.xScale = d3
      .scaleLinear()
      .domain([data?.xMin || 0, data.xMax])
      .range([0, width]);

    // create y-scale
    this.yScale = d3
      .scaleLinear()
      .domain([data?.yMin || 0, data.yMax])
      .range([height, 0]);

    // add x-axis
    this.svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(this.xScale));

    // add y axis
    this.svg.append("g").call(d3.axisLeft(this.yScale));

    // show confidence interval/std
    this.svg
      .append("path")
      .datum(data.channels)
      .attr("fill", "#1f77b4")
      .attr("stroke", "none")
      .attr("opacity", 0.3)
      .attr(
        "d",
        d3
          .area()
          .curve(d3.curveMonotoneX)
          .x((d, i) => this.xScale(data.channels[i]))
          .y0((d, i) => this.yScale(data.power[i] + data.sdU[i]))
          .y1((d, i) => this.yScale(data.power[i] - data.sdL[i])),
      );

    // add the line
    this.svg
      .append("path")
      .datum(data.channels)
      .attr("fill", "none")
      .attr("stroke", "#3366CC")
      .attr("stroke-width", 2)
      .attr("opacity", 1)
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((d, i) => {
            // console.log(data.channels[i]);
            return this.xScale(data.channels[i]);
          })
          .y((d, i) => this.yScale(data.power[i])),
      );

    this.svg
      .exit()
      .transition()
      // .duration(300)
      .attr("y", height)
      .attr("height", 0)
      .remove();
  }
}
