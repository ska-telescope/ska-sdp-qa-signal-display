import { Protocol } from '../models/protocol';

// Used for Determining sizing of cards and image grid
export const CELL_HEIGHT = 75;
export const CELL_WIDTH = 150;
export const HEIGHT = 300;
export const ROW_HEIGHT = 164;
export const WIDTH = 1200; // 1450;

export const POLARIZATIONS = [ 'XX', 'XY', 'YX', 'YY' ];

// Used to determine the message type of incoming messages and the topic to which to subscribe
export const PROTOCOL =
  process.env.REACT_APP_MESSAGE_TYPE === 'protobuf' ? Protocol.PROTOBUF : Protocol.JSON;

// Common URLs
export const DATA_API_URL = process.env.REACT_APP_DATA_API_URL;

const processAPI = process.env.REACT_APP_WS_API ? process.env.REACT_APP_WS_API : 'ws://localhost:8002/consumer';
export const WS_API_URL = processAPI.startsWith('/')
  ? (window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
    window.location.hostname + processAPI : processAPI ;
