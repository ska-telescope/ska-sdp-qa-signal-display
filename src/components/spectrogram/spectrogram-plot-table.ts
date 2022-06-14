import * as d3 from 'd3';
// import * as _ from 'lodash';
import { removeLastDirectoryPartOf } from '../../utils/common';
import { SpectrogramPlot } from './spectrogram-plot';

interface Cell {
  metadata: { baseline: string; polarisation: string; idx: number };
  plot: SpectrogramPlot;
}

class SpectrogramPlotTable {
  divId;
  width: number;
  height: number;
  cellHeight: number;
  cellWidth: number;
  cellGap: number = 5;

  table;
  cells: Cell[][];
  colNames;
  rowNames;
  numRows;
  numCols;
  data;
  len;
  unwrap = ({ baseline, polarisation }) => ({ baseline, polarisation });

  constructor(divId, width = 1200, height = 600, cellWidth = 200, cellHeight = 100) {
    this.divId = divId;
    this.width = width;
    this.height = height;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
  }

  draw(data) {
    this.data = data;

    if (!this.table || this.len !== data.length) {
      this.len = data.length;
      this.numCols = Math.floor(this.width / (this.cellWidth + this.cellGap));
      this.numRows = Math.ceil(this.len / this.numCols) || 1;
      console.log(this.numCols, this.numRows);

      // initialize 2d array of cells of a table
      console.log("cells A0 = ", this.cells);
      this.cells = [];
      console.log("cells B1 = ", this.cells);
      for (let i = 0; i < this.numRows; i++) {
        this.cells[i] = new Array(this.numCols);
      }
      console.log("cells C2 = ", this.cells);

      // fill each cell with a data object
      let idx = 0;
      for (let i = 0; i < this.numRows; i++) {
        for (let j = 0; j < this.numCols; j++) {
          if (idx < this.len) {
            this.cells[i][j] = {} as Cell;
            if (data[idx]) {
              console.log(data);
             this.cells[i][j].metadata = { ...this.unwrap(data[idx]), idx };
            }
            idx++;
          }
        }
      }
      console.log("cells 3 = ", this.cells);

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
    d3.select('#' + this.divId)
      .selectAll('table')
      .remove();

    this.table = d3
      .select('#' + this.divId)
      .append('table')
      .style('class', 'table');

    const tablebody = this.table.append('tbody');
    const rows = tablebody.selectAll('tr').data(this.cells).enter().append('tr');

    // we built the rows using the nested array - now each row has its own array.
    rows
      .selectAll('td')
      // each row has data associated; we get it and enter it for the cells.
      .data((d, i) => {
        return d;
      })
      .enter()
      .append('td')
      .text((d, i) => {
        return this.getName(d?.metadata);
      })
      .on('click', (d, i) => {
        if (i?.metadata?.idx !== undefined) {
          window.open(
            `${removeLastDirectoryPartOf(window.location.href)}/spectrogram/?idx=${
              i?.metadata?.idx
            }`
          );
        }
      })
      .append('canvas')
      .attr('id', (d, i) => {
        const id = this.getId(d?.metadata);
        if (id) return id;
      })
      .attr('style', 'canvas')
      .attr('width', this.cellWidth)
      .attr('height', this.cellHeight);

    return;
  }

  private getName(d: any) {
    return d?.baseline && d?.polarisation ? `${d?.baseline}-${d?.polarisation}` : '-';
  }

  private getId(d: any) {
    return d?.baseline && d?.polarisation ? `canvas-${d?.baseline}-${d?.polarisation}` : undefined;
  }
}

export default SpectrogramPlotTable;
