/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import FieldLabel from '../../base/fieldLabel/fieldLabel';
import Spectrum from './Spectrum/Spectrum';

const spectrumAPI = `ws://localhost:8002/ws/consumer/spectrum`;
const ws = new WebSocket(spectrumAPI);

function SpectrumPlot() {
  const [data, setData] = React.useState([]);
  const [socketStatus, setSocketStatus] = React.useState(Date().toLocaleString());

  const onMessage = (event) => {
    const payload = JSON.parse(event.data);

    if ('status' in payload) {
      setSocketStatus(payload.status);
      // eslint-disable-next-line no-console
      console.log(socketStatus);
    }

    if ('body' in payload) {
      setData(payload.body);
      setSocketStatus(payload.timestamp);
    }
  };

  React.useEffect(() => {
    ws.onmessage = onMessage;
  });

  return (
    <>
      <div className="menuSpacer" />

      <div className="metricsBox">
        <div className="metricsTitle">
          <FieldLabel label="label.spectrumPlot" />
        </div>
        <Spectrum width={1570} height={500} data={data} />
      </div>
    </>
  );
}

export default SpectrumPlot;
