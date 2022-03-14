import * as d3 from "d3";
import * as _ from "lodash";
import { SpectrogramPlot } from "./spectrogram-plot";

const TABLE_WIDTH = 2300;
const TABLE_HEIGHT = 1200;
const CELL_HEIGHT = 100;
const CELL_WIDTH = 200;
const CELL_GAP = 5;

interface Cell {
  metadata: { baseline: string; polarisation: string };
  plot: SpectrogramPlot;
}

class SpectrogramPlotTable {
  divId;
  table;
  cells: Cell[][];
  colNames;
  rowNames;
  numRows;
  numCols;
  data;
  len;
  unwrap = ({ baseline, polarisation }) => ({ baseline, polarisation });

  constructor(divId) {
    this.divId = divId;
  }

  draw(data) {
    this.data = data;

    if (!this.table || this.len !== data.length) {
      this.len = data.length;
      this.numCols = Math.floor(TABLE_WIDTH / (CELL_WIDTH + CELL_GAP));
      this.numRows = Math.ceil(this.len / this.numCols) || 1;
      // console.log(this.numCols, this.numRows);

      // initialise 2d array of cells of a table
      this.cells = new Array(this.numRows);
      for (let i = 0; i < this.numRows; i++) {
        this.cells[i] = new Array(this.numCols);
      }
      // console.log("cells 1 = ", this.cells);

      // fill each cell with a data object
      let idx = 0;
      for (let i = 0; i < this.numRows; i++) {
        for (let j = 0; j < this.numCols; j++) {
          if (idx >= this.len) break;
          this.cells[i][j] = {} as Cell;
          this.cells[i][j].metadata = this.unwrap(data[idx]);
          idx++;
        }
      }
      // console.log("cells 2 = ", this.cells);

      this.drawTable();
    }

    let idx = 0;
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (idx >= this.len) break;
        // console.log("cells 3 = ", this.cells[i][j], idx);

        // initialise spectrogram plot for each cell
        if (!this.cells[i][j].plot) {
          const id = this.getId(this.cells[i][j]?.metadata);
          if (id) this.cells[i][j].plot = new SpectrogramPlot(id);
        }

        this.cells[i][j].plot?.draw(this.data[idx].phase);
        idx++;
      }
    }
  }

  drawTable() {
    // clear/remove existing table
    d3.select("#" + this.divId)
      .selectAll("table")
      .remove();

    this.table = d3
      .select("#" + this.divId)
      .append("table")
      .style("class", "table");

    const tablebody = this.table.append("tbody");
    const rows = tablebody
      .selectAll("tr")
      .data(this.cells)
      .enter()
      .append("tr");

    // we built the rows using the nested array - now each row has its own array.
    rows
      .selectAll("td")
      // each row has data associated; we get it and enter it for the cells.
      .data((d, i) => {
        return d;
      })
      .enter()
      .append("td")
      .text((d, i) => {
        return this.getName(d?.metadata);
      })
      .append("canvas")
      .attr("id", (d, i) => {
        const id = this.getId(d?.metadata);
        if (id) return id;
      })
      .attr("style", "canvas")
      .attr("width", CELL_WIDTH)
      .attr("height", CELL_HEIGHT);

    return;
  }

  private getName(d: any) {
    return d?.baseline && d?.polarisation
      ? `${d?.baseline}-${d?.polarisation}`
      : "-";
  }

  private getId(d: any) {
    return d?.baseline && d?.polarisation
      ? `canvas-${d?.baseline}-${d?.polarisation}`
      : undefined;
  }
}

export default SpectrogramPlotTable;
