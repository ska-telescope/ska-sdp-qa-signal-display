import { Spectrograms } from 'src/models/protobuf/spectrogram';
import { Spectrum } from 'src/models/protobuf/spectrum';

export async function decodeSpectrum(data: any): Promise<any> {
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return Spectrum.decode(bytes);
}

export async function decodeSpectrogram(data: any): Promise<any> {
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return Spectrograms.decode(bytes);
}

export function decodeJson(data: any) {
  return JSON.parse(data);
}
