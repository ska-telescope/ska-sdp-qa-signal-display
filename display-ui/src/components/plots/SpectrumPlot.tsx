import * as d3 from "d3";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const SpectrumPlot = (props) => {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current)
      .attr("width", props.width)
      .attr("height", props.height);
    // .style("border", "1px solid black");
  }, []);

  function draw(width: number, height: number, data: any) {
    console.log('SpectrumPlot:draw: data = ', data);
    console.log('SpectrumPlot:draw: width, height =', width, height);
    if (!data || !data.data || !width || !height) return;

    // Clear
    d3.select(ref.current).select("svg").remove();

    const { xMin, xMax, yMin, yMax, xLabel, yLabel } = data;
    const values = data.data;

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 10, bottom: 40, left: 50 };
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis --> it is a date format
    const x = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Show confidence interval or std
    svg
      .append("path")
      .datum(values)
      .attr("fill", "#1f77b4")
      .attr("stroke", "none")
      .attr("opacity", 0.3)
      .attr(
        "d",
        d3
          .area()
          .curve(d3.curveMonotoneX)
          .x((d) => x(d[0]))
          .y0((d) => y(d[1] + d[2]))
          .y1((d) => y(d[1] - d[3]))
      );

    // Add the line
    svg
      .append("path")
      .datum(values)
      .attr("fill", "none")
      .attr("stroke", "#1f77b4")
      .attr("stroke-width", 1.5)
      .attr("opacity", 1)
      .attr(
        "d",
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((d) => x(d[0]))
          .y((d) => y(d[1]))
      );

    // Label for the x-axis
    svg
      .append("text")
      .attr("transform", `translate(${width / 2} ,${height + margin.top + 20})`)
      .style("fill", "grey")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .text(xLabel);

    // Label for the y axis
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1.0em")
      .style("fill", "grey")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .text(yLabel);

    svg
      .exit()
      .transition()
      .duration(300)
      .attr("y", height)
      .attr("height", 0)
      .remove();
  }

  useEffect(() => {
    draw(props.width, props.height, props.data);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.data]);

  return (
    <div className="chart">
      <svg ref={ref} />
    </div>
  );
};

SpectrumPlot.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.any.isRequired,
};

export default SpectrumPlot;
