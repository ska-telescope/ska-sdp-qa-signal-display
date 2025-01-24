/* eslint-disable @typescript-eslint/ban-types */

import { decodeAsync } from '@msgpack/msgpack';
import { PROTOCOL, SOCKET_STATUS } from '../../utils/constants';

interface WebSocketProps {
  apiUrl: string;
  protocol: string;
  suffix: string;
  statusFunction: Function;
  dataFunction: Function;
  timeSeries?: Boolean;
  index?: number;
}

const Socket = ({
  apiUrl,
  protocol,
  suffix,
  statusFunction,
  dataFunction,
  timeSeries,
  index = -1
}: WebSocketProps) => {
  const tmpSplit = suffix.split('-<subarray>');
  let tmp = `${apiUrl}/${tmpSplit[0]}`;

  if (tmpSplit[1] != null) {
    tmp = `${tmp}${tmpSplit[1]}`;
  }

  const ws = new WebSocket(tmp);

  ws.onerror = function onError(e) {
    console.error('WebSocket: onerror, error = ', e);
    statusFunction(SOCKET_STATUS[1]);
  };

  ws.onmessage = function onMessage(msg) {
    const inData = msg?.data;
    try {
      if (protocol === PROTOCOL.JSON) {
        const decoded = JSON.parse(inData);
        if (decoded && decoded.status) {
          statusFunction(decoded.status);
        } else if (timeSeries) {
          dataFunction(prevState => [...prevState, decoded]);
        } else if (index >= 0) {
          dataFunction(index, decoded);
        } else {
          dataFunction(decoded);
        }
      } else {
        decodeAsync(inData.stream())
          .then(decoded => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dAny: any = decoded;
            if (dAny && dAny.status) {
              statusFunction(dAny.status);
            } else if (timeSeries) {
              dataFunction(prevState => [...prevState, decoded]);
            } else if (index >= 0) {
              dataFunction(index, decoded);
            } else {
              dataFunction(decoded);
            }
          })
          .catch(() => 'ERROR');
      }
    } catch (e) {
      /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error('WebSocket: received, decoding error = ', e);
      statusFunction(SOCKET_STATUS[1]);
    }
  };

  return ws;
};

export default Socket;
