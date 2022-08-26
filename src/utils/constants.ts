import { Protocol } from '../models/protocol.ts';

// Used for Determining sizing of cards and image grid
export const CELL_HEIGHT = 75;
export const CELL_WIDTH = 150;
export const HEIGHT = 300;
export const WIDTH = 1200;

// Used to determine the message type of incoming messages and the topic to which to subscribe
export const PROTOCOL =
  process.env.REACT_APP_MESSAGE_TYPE === 'protobuf' ? Protocol.PROTOBUF : Protocol.JSON;

// Common URLs
export const DATA_API_URL = process.env.REACT_APP_DATA_API_URL;
export const WS_API_URL = process.env.REACT_APP_WS_API;
