// Used for Determining sizing of cards and image grid
export const CELL_HEIGHT = 75;
export const CELL_WIDTH = 150;
export const ROW_HEIGHT = 164;
export const HZ_TO_MHZ = 1000000;

export const COLOR = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FF00FF',
  '#00FFFF',
  '#008000',
  '#000080',
  '#808000',
  '#800080',
  '#008080',
  '#808080',
  '#C00000',
  '#00C000',
  '#0000C0',
  '#C0C000',
  '#C000C0',
  '#00C0C0',
  '#C0C0C0',
  '#004000',
  '#404000',
  '#004040',
  '#404040',
  '#200000',
  '#002000',
  '#000020',
  '#202000',
  '#200020',
  '#002020',
  '#202020',
  '#600000',
  '#006000',
  '#000060',
  '#606000',
  '#600060',
  '#006060',
  '#606060',
  '#A00000',
  '#00A000',
  '#0000A0',
  '#A0A000',
  '#A000A0',
  '#00A0A0',
  '#A0A0A0',
  '#E00000',
  '#00E000',
  '#0000E0',
  '#E0E000',
  '#E000E0',
  '#00E0E0',
  '#E0E0E0'
];

export const PROTOCOL = {
  JSON: 'json',
  MESSAGE_PACK: 'msgpack',
  PROTOBUF: 'protobuf'
};

export const POLARIZATIONS = ['XX', 'XY', 'YX', 'YY'];

export const SOCKET_STATUS = ['unknown', 'error', 'connected', 'local'];

// Common URLs
export const DATA_API_URL = process.env.REACT_APP_DATA_API_URL;

export const DATA_LOCAL = process.env.REACT_USE_LOCAL_DATA;

const processAPI = process.env.REACT_APP_WS_API
  ? process.env.REACT_APP_WS_API
  : 'ws://localhost:8002';
export const WS_API_URL = processAPI.startsWith('/')
  ? (window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
    window.location.hostname +
    processAPI
  : processAPI;
