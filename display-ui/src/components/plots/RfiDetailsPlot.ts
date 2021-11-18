import * as d3 from "d3";
import { RfiDetailsModel } from "src/models/RfiDetailsModel";

export class RfiDetailsPlot {
  canvas;
  width;
  height;
  margin = { top: 10, right: 10, bottom: 40, left: 50 };
  svg;

  constructor(id) {
    this.canvas = document.getElementById(id);

    this.width = 1200;
    this.height = 400;
    // set the dimensions and margins of the graph
    this.width = this.width - this.margin.left - this.margin.right;
    this.height = this.height - this.margin.top - this.margin.bottom;
  }

  draw(data: RfiDetailsModel) {
    // console.log("RfiDetailsPlot:draw: data = ", data);

    // validations
    // if (!data || !data.spectrum_values || !data.spectrum_values.length || !width || !height) return;
    const { description, xLabel, yLabel, sum_data, vis_data, rfi_data, flags, frequencies, xMin, xMax, yMin, yMax } =
      data;

    // clear
    d3.select(this.canvas).select("svg").remove();

    // append the svg object to the body of the page
    this.svg = d3
      .select(this.canvas)
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

    // Add X axis --> it is a date format
    const x = d3.scaleLinear().domain([xMin, xMax]).range([0, this.width]);
    this.svg.append("g").attr("transform", `translate(0,${this.height})`).call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([yMin, yMax]).range([this.height, 0]);
    this.svg.append("g").call(d3.axisLeft(y));

    // flagger
    let rh = 0,
      rw = 0;
    rw = this.width / frequencies.length;
    rh = 10;

    this.svg
      .selectAll("rect")
      .data(frequencies)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        return rw * i;
      })
      .attr("y", (d, i) => y(yMin))
      .attr("width", rw)
      .attr("height", rh)
      .attr("fill", (d, i) => {
        // console.log(rfis[i], flags[i]);
        if (rfi_data[i] === 0 && flags[i] === 0) return "#D3D3D3";
        else if (rfi_data[i] === 0 && flags[i] === 1) return "#FF6666";
        else if (rfi_data[i] !== 0 && flags[i] === 0) return "#FF9966";
        else if (rfi_data[i] !== 0 && flags[i] === 1) return "#A9A9A9";
        else return "black";
      })
      .attr("opacity", 0.8)
      .attr("style", "stroke-width:0.5;stroke:rgb(255,255,255)");

    // plot the rfi data
    this.svg
      .append("path")
      .datum(rfi_data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("opacity", 0.6)
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((d, i) => x(frequencies[i]))
          .y((d) => y(d)),
      );

    // plot the visibility data
    this.svg
      .append("path")
      .datum(vis_data)
      .attr("fill", "none")
      .attr("stroke", "violet")
      .attr("stroke-width", 2)
      .attr("opacity", 0.6)
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((d, i) => x(frequencies[i]))
          .y((d) => y(d)),
      );

    // plot the sum of visibility and rfi data
    this.svg
      .append("path")
      .datum(sum_data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("opacity", 0.6)
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((d, i) => x(frequencies[i]))
          .y((d) => y(d)),
      );
    //.style("fill", "#00CC66")
    //.style("opacity", (value, i) => flags[i] * 1)
    //.attr("transform", (value, i) => "translate(" + x(frequencies[i]) + "," + y(yMin) + ")");

    // svg
    //   .selectAll(".point")
    //   .data(values)
    //   .enter()
    //   .append("path")
    //   .attr("d", d3.symbol().type(d3.symbolCircle))
    //   .style("fill", "#CC3366")
    //   .style("opacity", (value, i) => rfis[i] * 0.8)
    //   .attr("transform", (value, i) => "translate(" + x(frequencies[i]) + "," + y(yMin) + ")");
    //}

    // label for the x-axis
    this.svg
      .append("text")
      .attr("transform", `translate(${this.width / 2} ,${this.height + this.margin.top + 20})`)
      .style("fill", "grey")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .text(xLabel);

    // label for the y axis
    this.svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - this.margin.left)
      .attr("x", 0 - this.height / 2)
      .attr("dy", "1.0em")
      .style("fill", "grey")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .text(yLabel);

    this.svg.exit().transition().duration(300).attr("y", this.height).attr("height", 0).remove();
  }
}
