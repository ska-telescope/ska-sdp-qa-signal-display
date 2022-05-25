import { Spectrograms } from 'models/protobuf/spectrogram';
import { Spectrum } from 'models/protobuf/spectrum';

export async function decodeSpectrum(data) {
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return Spectrum.decode(bytes);
}

export async function decodeSpectrogram(data) {
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return Spectrograms.decode(bytes);
}

export function decodeJson(data) {
  return JSON.parse(data);
}
