import * as d3 from "d3";
import Spectrogram from "./Spectrogram";

class SpectrogramTable {
  phaseDisplayId;
  table = undefined;
  spectrograms = undefined;

  constructor(id) {
    this.phaseDisplayId = id;
  }

  draw(data) {
    if (!this.table) {
      this.table = this.drawTable(data);

      this.spectrograms = new Array(data.polarisation.length);
      for (let j = 0; j < data.polarisation.length; j++) {
        this.spectrograms[j] = new Array(data.baseline.length);
      }
    }

    // console.log('spectrograms = ', this.spectrograms)

    for (let i = 0; i < data.phase_values.length; i++) {
      for (let j = 0; j < data.phase_values[i].length; j++) {
        if (!this.spectrograms[i][j]) {
          this.spectrograms[i][j] = new Spectrogram(`canvas${i}${j}`);
        }
        this.spectrograms[i][j].draw(data.phase_values[i][j]);
      }
    }
  }

  drawTable(data) {
    const baseline = data.baseline;
    baseline.unshift("");
    const polarisation = data.polarisation;
    // console.log(baseline, polarisation)

    const table = d3.select("#" + this.phaseDisplayId).append("table");

    // append the header row
    table
      .append("thead")
      .append("tr")
      .selectAll("th")
      .data(baseline)
      .enter()
      .append("th")
      .text((d) => d);

    // create a row for each object/array in the data
    const rows = table
      .append("tbody")
      .selectAll("tr")
      .data(polarisation)
      .enter()
      .append("tr")
      .attr("id", (d, i) => {
        return i;
      });

    // create row header
    rows
      .append("th")
      .attr("scope", "row")
      .text((d) => d);

    // create a cell in each row for each column
    rows
      .selectAll("td")
      .data((d, i) => {
        return d;
      })
      .enter()
      .append("td")
      .attr("id", function (d, i) {
        // the current node is selected using 'this', hence use 'function', not '=>'
        const trId = d3.select(this).node().parentNode.id;
        return `${trId}${i}`;
      })
      .append("canvas")
      .attr("id", function (d, i) {
        // the current node is selected using 'this', hence use 'function', not '=>'
        const tdId = d3.select(this).node().parentNode.id;
        return `canvas${tdId}`;
      });

    return true;
  }
}

export default SpectrogramTable;
