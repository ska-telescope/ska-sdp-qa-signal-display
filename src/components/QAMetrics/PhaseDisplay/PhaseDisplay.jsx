/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import FieldLabel from '../../base/FieldLabel/FieldLabel';
import SpectrogramTable from './SpectrogramTable/SpectrogramTable';

function PhaseDisplay({ id }) {
  const { REACT_APP_WS } = process.env;
  const phaseAPI = `${REACT_APP_WS}/consumer/phase`;
  const ws = new WebSocket(phaseAPI);

  const [data, setData] = React.useState(null);
  const [socketStatus, setSocketStatus] = React.useState(Date().toLocaleString());
  const spectrogramTable = new SpectrogramTable('phaseDisplayTable');

  const onMessage = (event) => {
    const payload = JSON.parse(event.data);
    console.log('PhaseDisplay:onMessage: received event.data = ', event.data, typeof event.data);
    console.log('PhaseDisplay:onMessage: received event.data = ', payload);

    if ('status' in payload) {
      console.log(payload.status);
      setSocketStatus(payload.status);
    }

    if ('body' in payload) {
      setData(payload.body);
      setSocketStatus(payload.timestamp);
      spectrogramTable.draw(payload.body);
    }
  };

  React.useEffect(() => {
    console.log('PhaseDisplay: useEffect: 1');

    ws.onmessage = onMessage;

    return () => {
      // TODO : ws.close();
    };
  }, []);

  return (
    <div id={id}>
      <div className="menuSpacer" />

      <div className="metricsBox">
        <div className="metricsTitle">
          <FieldLabel id="metricsTitlePhaseDisplay" label="label.phaseDisplay" />
        </div>
        <div id="phaseDisplayTable" />
      </div>
    </div>
  );
}

PhaseDisplay.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PhaseDisplay;
