import { Spectrograms } from "src/models/protobuf/spectrogram";
import { Spectrum } from "src/models/protobuf/spectrum";

export async function decodeSpectrum(data: any): Promise<any> {
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrum.decode(bytes);
  return decoded;
}

export async function decodeSpectrogram(data: any): Promise<any> {
  const buffer = await data.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const decoded = Spectrograms.decode(bytes);
  return decoded;
}

export function decodeJson(data: any) {
  const decoded = JSON.parse(data);
  return decoded;
}
