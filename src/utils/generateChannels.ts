import { HZ_TO_MHZ } from './constants';

export function generateChannels(inData: { freq_max: number; freq_min: number; count: number }) {
  const step = (inData.freq_max - inData.freq_min) / (inData.count - 1);
  return Array.from({ length: inData.count }, (_, i) => (inData.freq_min + step * i) / HZ_TO_MHZ);
}
