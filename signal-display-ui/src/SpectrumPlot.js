import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

function SpectrumPlot({ width, height, data }) {
    const ref = useRef();

    useEffect(() => {
        const svg = d3
            .select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black");
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        console.log(data);
        console.log(width, height);
        if (!data || !width || !height) return;

        // Clear
        d3.select("g").remove();

        const xMin = data.xMin;
        const xMax = data.xMax;
        const yMin = data.yMin;
        const yMax = data.yMax;
        const xLabel = data.xLabel;
        const yLabel = data.yLabel;
        const values = data.data;

        // set the dimensions and margins of the graph
        let margin = { top: 10, right: 10, bottom: 40, left: 40 };
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3
            .select(ref.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        // Add X axis --> it is a date format
        var x = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Show confidence interval or std
        svg.append("path")
            .datum(values)
            .attr("fill", "#1f77b4")
            .attr("stroke", "none")
            .attr("opacity", 0.3)
            .attr(
                "d",
                d3
                    .area()
                    .curve(d3.curveMonotoneX)
                    .x((d) => {
                        return x(d[0]);
                    })
                    .y0((d) => {
                        return y(d[1] + d[2]);
                    })
                    .y1((d) => {
                        return y(d[1] - d[3]);
                    })
            );

        // Add the line
        svg.append("path")
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
                    .x((d) => {
                        return x(d[0]);
                    })
                    .y((d) => {
                        return y(d[1]);
                    })
            );

        // Label for the x-axis
        svg.append("text")
            .attr(
                "transform",
                "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
            )
            .style("text-anchor", "middle")
            .style("fill", "black")
            .style("font-size", "15px")
            .text(xLabel);

        // Label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - height / 2)
            .attr("dy", "1em")
            .style("fill", "black")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .text(yLabel);

        svg.exit()
            .transition()
            .duration(300)
            .attr("y", (d) => height)
            .attr("height", 0)
            .remove();
    };

    return (
        <div className="chart">
            <svg ref={ref}></svg>
        </div>
    );
}

export default SpectrumPlot;
