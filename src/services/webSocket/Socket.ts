/* eslint-disable @typescript-eslint/ban-types */

import { decodeJson } from '../../utils/decoder';
import { SOCKET_STATUS } from '../../utils/constants';

interface WebSocketProps {
  apiUrl: string;
  protocol: string;
  suffix: string;
  statusFunction: Function;
  dataFunction: Function;
}

const Socket = ({ apiUrl, protocol, suffix, statusFunction, dataFunction }: WebSocketProps) => {
  const tmp = `${apiUrl}/${protocol}_${suffix}`;
  const ws = new WebSocket(tmp);

  ws.onerror = function oneError(e) {
    console.error('WebSocket: onerror, error = ', e);
    statusFunction(SOCKET_STATUS[1]);
  };

  ws.onmessage = function onMessage(msg) {
    const inData = msg?.data;
    try {
      const decoded = decodeJson(inData);
      if (decoded && decoded.status) {
        statusFunction(decoded.status);
      } else {
        dataFunction(decoded);
      }
    } catch (e) {
      /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error('WebSocket: received, decoding error = ', e);
      statusFunction(SOCKET_STATUS[1]);
    }
  };
};

export default Socket;
