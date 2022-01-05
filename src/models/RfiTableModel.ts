export interface RfiTableModel {
  polarisation: string[];
  baseline: string[];
  rfi_data: number[];
  flags: number[][][];
  frequencies: number[];
}
