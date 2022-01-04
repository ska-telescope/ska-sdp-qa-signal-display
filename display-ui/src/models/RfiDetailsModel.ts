export interface RfiDetailsModel {
  description: string;
  xLabel: string;
  yLabel: string;
  sum_data: number[];
  vis_data: number[];
  rfi_data: number[];
  flags: number[];
  frequencies: number[];
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}
