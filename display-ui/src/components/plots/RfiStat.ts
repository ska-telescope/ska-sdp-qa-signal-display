import * as d3 from "d3";

const FLAG_LEGENDS = ["TP", "TN", "FP", "FN"];
const FLAG_COLORS = ["#2c7bb6", "#abd9e9", "#d7191c", "#fdae61"];

export class RfiStat {
  canvas;
  width;
  height;
  margin = { top: 2, right: 2, bottom: 2, left: 2 };

  constructor(id) {
    this.canvas = document.getElementById(id);
    this.width = 400; // this.canvas.width;
    this.height = 20; //this.canvas.height;

    // set the dimensions and margins of the graph
    this.width = this.width - this.margin.left - this.margin.right;
    this.height = this.height - this.margin.top - this.margin.bottom;
  }

  draw(data: { rfi_data: number[]; flags: number[] }) {
    // console.log("RfiStat:draw: data = ", data);
    // validation
    // if (!data || !data.spectrum_values || !data.spectrum_values.length || !width || !height) return;
    const { rfi_data, flags } = data;

    // clear
    d3.select(this.canvas).select("svg").remove();

    // append the svg object to the body of the page
    const svg = d3
      .select(this.canvas)
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`)
      .attr("outline", "gray 1px solid");

    let rh = 0,
      rw = 0;
    rw = this.width / rfi_data.length;
    rh = this.height;
    svg
      .selectAll("rect")
      .data(rfi_data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        return rw * i;
      })
      .attr("width", rw)
      .attr("height", rh)
      .attr("fill", (d, i) => {
        if (rfi_data[i] !== 0 && flags[i] === 1) return FLAG_COLORS[0];
        else if (rfi_data[i] === 0 && flags[i] === 0) return FLAG_COLORS[1];
        else if (rfi_data[i] === 0 && flags[i] === 1) return FLAG_COLORS[2];
        else if (rfi_data[i] !== 0 && flags[i] === 0) return FLAG_COLORS[3];
        else return "black";
      });

    svg.exit().transition().duration(300).attr("y", this.height).attr("height", 0).remove();
  }
}
