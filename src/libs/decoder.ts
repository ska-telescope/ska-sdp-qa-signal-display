import { Spectrograms } from '../models/protobuf/spectrogram.js';
import { Spectrum } from '../models/protobuf/spectrum.js';

export async function decodeSpectrum(data: Blob): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return Spectrum.decode(bytes);
}

export async function decodeSpectrogram(data: Blob): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return Spectrograms.decode(bytes);
}

export function decodeJson(data: string) {
  return JSON.parse(data);
}
