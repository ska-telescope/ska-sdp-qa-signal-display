import { PROTOCOL } from './constants';

// Removing Protobuff for now.
// import SpectrogramsExport from '../models/protobuf/spectrogram.js';
// import SpectrumExport from '../models/protobuf/spectrum.js';

// export async function decodeSpectrum(data: Blob): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
//   const buffer = await data.arrayBuffer();
//   const bytes = new Uint8Array(buffer);
//   return SpectrumExport.decode(bytes);
// }

// export async function decodeSpectrogram(data: Blob): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
//   const buffer = await data.arrayBuffer();
//   const bytes = new Uint8Array(buffer);
//   return SpectrogramsExport.decode(bytes);
// }

export function decode(protocol: string, data: string) {
  switch (protocol) {
    case PROTOCOL.JSON:
      return JSON.parse(data);
    case PROTOCOL.MESSAGE_PACK:
      return 'TREVOR';
    case PROTOCOL.PROTOBUF:
      return 'TREVOR';
    default:
      return 'TREVOR';
  }
}
