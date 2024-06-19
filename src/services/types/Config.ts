type Paths = {
  websocket: string;
  subarrays: string;
  processing_blocks: string;
  spead2_scans: string;
  spectogram_full_image_path: string;
  spectogram_thumbnail_path: string;
  lag_plot_full_image_path: string;
  lag_plot_thumbnail_path: string;
  log_url: string;
};

type Topics = {
  phase_and_amplitude: string;
  spectrograms: string;
  spectrum: string;
  phase: string;
  amplitude: string;
  lag_plot: string;
  pointing_offset: string;
  pointing_offset_out: string;
  band_averaged_x_corr: string;
};

type Waterfall_Plots = {
  thumbnail_width: number;
  thumbnail_max_height: number;
};

type Config = {
  api_format: string;
  app_version: string;
  project_name: string;
  start_time: string;
  uptime: number;
  paths: Paths;
  topics: Topics;
  waterfall_plots: Waterfall_Plots;
};

export default Config;
