import * as d3 from 'd3';
import { removeLastDirectoryPartOf } from '../../../../utils/common';
import { SpectrogramPlot } from '../SpectrogramPlot';

interface Cell {
  metadata: { baseline: string; polarisation: string; idx: number };
  plot: SpectrogramPlot;
}

export default class SpectrogramPlotTable {
  divId;

  width: number;

  height: number;

  cellHeight: number;

  cellWidth: number;

  cellGap = 5;

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

      // initialize 2d array of cells of a table
      this.cells = new Array(this.numRows);
      for (let i = 0; i < this.numRows; i += 1) {
        this.cells[i] = new Array(this.numCols);
      }

      // fill each cell with a data object
      let idx = 0;
      for (let i = 0; i < this.numRows; i += 1) {
        for (let j = 0; j < this.numCols; j += 1) {
          if (idx >= this.len) break;
          this.cells[i][j] = {} as Cell;
          this.cells[i][j].metadata = { ...this.unwrap(data[idx]), idx };
          idx += 1;
        }
      }
      this.drawTable();
    }

    let idx = 0;
    for (let i = 0; i < this.numRows; i += 1) {
      for (let j = 0; j < this.numCols; j += 1) {
        if (idx >= this.len) break;

        // initialize spectrogram plot for each cell
        if (!this.cells[i][j].plot) {
          const id = this.getId(this.cells[i][j]?.metadata);
          if (id) this.cells[i][j].plot = new SpectrogramPlot(id);
        }

        this.cells[i][j].plot?.draw(this.data[idx].phase);
        idx += 1;
      }
    }
  }

  drawTable() {
    // clear/remove existing table
    d3.select(`#${this.divId}`).selectAll('table').remove();

    this.table = d3.select(`#${this.divId}`).append('table').style('class', 'table');

    const tableBody = this.table.append('tbody');
    const rows = tableBody.selectAll('tr').data(this.cells).enter().append('tr');

    // we built the rows using the nested array - now each row has its own array.
    rows
      .selectAll('td')
      // each row has data associated; we get it and enter it for the cells.
      .data((d) => {
        return d;
      })
      .enter()
      .append('td')
      .text((d) => {
        return this.getName(d?.metadata);
      })
      .on('click', (i) => {
        if (i?.metadata?.idx !== undefined) {
          window.open(
            `${removeLastDirectoryPartOf(window.location.href)}/spectrogram/?idx=${
              i?.metadata?.idx
            }`
          );
        }
      })
      .append('canvas')
      .attr('id', (d) => {
        const id = this.getId(d?.metadata);
        if (id) return id;
        return null;
      })
      .attr('style', 'canvas')
      .attr('width', this.cellWidth)
      .attr('height', this.cellHeight);
  }

  private getName(d) {
    return d?.baseline && d?.polarisation ? `${d?.baseline}-${d?.polarisation}` : '-';
  }

  private getId(d) {
    return d?.baseline && d?.polarisation ? `canvas-${d?.baseline}-${d?.polarisation}` : undefined;
  }
}
