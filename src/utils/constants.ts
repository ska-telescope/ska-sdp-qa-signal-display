import { Protocol } from '../models/protocol';

// Used for Determining sizing of cards and image grid
export const CELL_HEIGHT = 75;
export const CELL_WIDTH = 150;
export const ROW_HEIGHT = 164;

export const POLARIZATIONS = [ 'XX', 'XY', 'YX', 'YY' ];

export const SOCKET_STATUS = [ 'unknown', 'error', 'connected', 'local'];

// Used to determine the message type of incoming messages and the topic to which to subscribe
export const PROTOCOL =
  process.env.REACT_APP_MESSAGE_TYPE === Protocol.PROTOBUF ? Protocol.PROTOBUF : Protocol.JSON;

// Common URLs
export const DATA_API_URL = process.env.REACT_APP_DATA_API_URL;

export const DATA_LOCAL = process.env.REACT_USE_LOCAL_DATA;

const processAPI = process.env.REACT_APP_WS_API ? process.env.REACT_APP_WS_API : 'ws://localhost:8002/consumer';
export const WS_API_URL = processAPI.startsWith('/')
  ? (window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
    window.location.hostname + processAPI : processAPI ;
