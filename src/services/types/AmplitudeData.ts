type Data = {
  baseline: string;
  polarisation: string;
  amplitudes: number[];
};

type SpectralWindow = {
  freq_min: number;
  freq_max: number;
  count: number;
};

type AmplitudeData = {
  timestamp: string;
  processing_block_id: string;
  spectral_window: SpectralWindow;
  amplitudes: Data;
};

export default AmplitudeData;
