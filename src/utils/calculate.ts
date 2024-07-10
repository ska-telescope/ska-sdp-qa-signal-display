const AMP_MULTIPLIER = 10;
const AMP_REF = 1;
export const HZ_TO_MHZ = 1000000;

export function calculateChannels(inData: { freq_max: number; freq_min: number; count: number }) {
  const step = (inData.freq_max - inData.freq_min) / (inData.count - 1);
  return Array.from({ length: inData.count }, (_, i) => (inData.freq_min + step * i) / HZ_TO_MHZ);
}

export function calculateDB(item: number) {
  return AMP_MULTIPLIER * Math.log10(item / AMP_REF);
}

// 1Rad × 180/π = 57.296Deg
export function calculateDegrees(item: number) {
  return (item * 180) / Math.PI;
}

export function calculateLog(item: number) {
  return Math.log10(item);
}

export function calculateReal(item: number) {
  return Math.cos(item)
}

export function calculateImaginary(item: number) {
  return Math.sin(item)
}