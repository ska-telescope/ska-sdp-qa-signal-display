/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import * as d3 from 'd3';
import * as _ from 'lodash';
import { RFIStat } from './RFIStat/RFIStat';

export class RFITable {
  tableId;

  plotId;

  table;

  cells;

  colHeaders;

  rowHeaders;

  numRows;

  numCols;

  cellData;

  rfiHighlight;

  constructor(tableId) {
    this.tableId = tableId;
  }

  draw(data) {
    this.cellData = data;

    if (
      !this.table ||
      !_.isEqual(this.colHeaders, data.polarisation) ||
      !_.isEqual(this.rowHeaders, data.baseline)
    ) {
      this.colHeaders = data.polarisation;
      this.rowHeaders = data.baseline;
      this.numCols = this.colHeaders.length;
      this.numRows = this.rowHeaders.length;

      this.cells = new Array(this.numRows);
      for (let i = 0; i < this.numRows; i++) {
        this.cells[i] = new Array(this.numCols);
      }

      this.table = this.drawTable();
    }

    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numCols; j++) {
        if (!this.cells[i][j]) {
          this.cells[i][j] = new RFIStat(`g${i}${j}`);
        }
        this.cells[i][j].draw({
          rfi_data: this.cellData.rfi_data[i][j],
          flags: this.cellData.flags[i][j],
        });
      }
    }
  }

  drawTable() {
    // remove existing table
    d3.select(`#${this.tableId}`).selectAll('table').remove();

    const table = d3.select(`#${this.tableId}`).append('table').style('class', 'table');

    const thead = table.append('thead');
    const tbody = table.append('tbody');

    // append the column header row
    thead
      .append('tr')
      .selectAll('th')
      .data([''].concat(this.colHeaders)) // column "" is for row header
      .enter()
      .append('th')
      .text((col) => col)
      .style('class', 'th');

    // create a row for each object/array in the data
    const rows = tbody
      .selectAll('tr')
      .data(this.cells)
      .enter()
      .append('tr')
      .attr('id', (d, i) => i);

    // create row header
    rows
      .append('th')
      .attr('scope', 'row')
      .text((row, i) => this.rowHeaders[i]);

    // create a cell in each row for each column
    rows
      .selectAll('td')
      .data(
        (_row, i) =>
          //
          this.colHeaders
      )
      .enter()
      .append('td')
      .attr('id', function (d, i) {
        // the current node is selected using 'this', hence use 'function', not '=>'
        const trId = d3.select(this).node().parentNode.id;
        return `${trId}${i}`;
      })
      .append('g')
      .attr('id', function (d, i) {
        // the current node is selected using 'this', hence use 'function', not '=>'
        const tdId = d3.select(this).node().parentNode.id;
        return `g${tdId}`;
      });
    // .attr("style", "canvas");

    return table;
  }
}
