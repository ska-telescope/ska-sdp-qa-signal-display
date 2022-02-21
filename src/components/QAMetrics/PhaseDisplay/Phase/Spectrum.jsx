/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

function Spectrum(props) {
  const ref = useRef();
  const { width, height, data } = props;

  useEffect(() => {
    d3.select(ref.current).attr('width', width).attr('height', height);
    // .style("border", "1px solid black");
  }, [props]);

  // eslint-disable-next-line no-shadow
  function draw(inWidth, inHeight, inData) {
    if (
      !inData ||
      !inData.spectrum_values ||
      !inData.spectrum_values.length ||
      !inWidth ||
      !inHeight
    )
      return;

    // Clear
    d3.select(ref.current).select('svg').remove();

    const {
      xMin,
      xMax,
      yMin,
      yMax,
      xLabel,
      yLabel,
      frequencies,
      rfis,
      flags,
      // eslint-disable-next-line camelcase
      spectrum_values,
    } = inData;

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 10, bottom: 40, left: 50 };
    inWidth = inWidth - margin.left - margin.right;
    inHeight = inHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', inWidth + margin.left + margin.right)
      .attr('height', inHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X axis --> it is a date format
    const x = d3.scaleLinear().domain([xMin, xMax]).range([0, inWidth]);
    svg.append('g').attr('transform', `translate(0,${inHeight})`).call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([yMin, yMax]).range([inHeight, 0]);
    svg.append('g').call(d3.axisLeft(y));

    // Show confidence interval or std
    svg
      .append('path')
      .datum(spectrum_values)
      .attr('fill', '#1f77b4')
      .attr('stroke', 'none')
      .attr('opacity', 0.3)
      .attr(
        'd',
        d3
          .area()
          .curve(d3.curveMonotoneX)
          .x((value, i) => x(frequencies[i]))
          .y0((value) => y(value[0] + value[1]))
          .y1((value) => y(value[0] - value[2]))
      );

    // Add the line
    svg
      .append('path')
      .datum(spectrum_values)
      .attr('fill', 'none')
      .attr('stroke', '#3366CC')
      .attr('stroke-width', 1.5)
      .attr('opacity', 1)
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveMonotoneX)
          .x((value, i) => x(frequencies[i]))
          .y((value) => y(value[0]))
      );

    // rfi flags
    if (rfis) {
      svg
        .selectAll('.point')
        .data(spectrum_values)
        .enter()
        .append('path')
        .attr('d', d3.symbol().type(d3.symbolSquare))
        .style('fill', '#00CC66')
        .style('opacity', (value, i) => flags[i] * 1)
        .attr(
          'transform',
          (value, i) => 'translate(' + x(frequencies[i]) + ',' + y(value[0]) + ')'
        );

      svg
        .selectAll('.point')
        .data(spectrum_values)
        .enter()
        .append('path')
        .attr('d', d3.symbol().type(d3.symbolCircle))
        .style('fill', '#CC3366')
        .style('opacity', (value, i) => rfis[i] * 0.8)
        .attr('transform', (value, i) => 'translate(' + x(frequencies[i]) + ',' + y(yMin) + ')');
    }

    // Label for the x-axis
    svg
      .append('text')
      .attr('transform', `translate(${inWidth / 2} ,${inHeight + margin.top + 20})`)
      .style('fill', 'grey')
      .style('text-anchor', 'middle')
      .style('font-size', '15px')
      .text(xLabel);

    // Label for the y axis
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - inHeight / 2)
      .attr('dy', '1.0em')
      .style('fill', 'grey')
      .style('text-anchor', 'middle')
      .style('font-size', '15px')
      .text(yLabel);

    svg.exit().transition().duration(300).attr('y', inHeight).attr('height', 0).remove();
  }

  useEffect(() => {
    draw(width, height, data);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.data]);

  return (
    <div className="chart">
      <svg ref={ref} />
    </div>
  );
}

Spectrum.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  data: PropTypes.any.isRequired,
};

export default Spectrum;
