/* eslint-disable import/named */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import React from 'react';
import { RFIDetailsPlot } from './RFIDetailsPlot/RFIDetailsPlot';
import { RfiTable } from './RFITable/RFITable';

const { REACT_APP_WS } = process.env;
const rfiDetailsApi = `${REACT_APP_WS}/consumer/rfi_xx_00_01`;
const rfiSummaryApi = `${REACT_APP_WS}/consumer/rfi_summary`;
const rfiDetailsWs = new WebSocket(rfiDetailsApi);
const rfiSummaryWs = new WebSocket(rfiSummaryApi);

function RFIDisplay() {
  const [data, setData] = React.useState(null);
  const [socketStatus, setSocketStatus] = React.useState(Date().toLocaleString());

  const rfiTable = new RfiTable('rfi-table');
  const rfiDetailsPlot = new RFIDetailsPlot('rfi-details-plot');

  //
  // generate random data to test locally
  //

  React.useEffect(() => {
    let loopCount = 1;
    function myLoop() {
      setTimeout(() => {
        // randomly generated N = 100 length array 0 <= A[N] <= 360
        const data1 = {
          polarisation: ['XX'],
          baseline: ['00'],
          description: 'Spectrum',
          xLabel: 'Frequency (MHz)',
          yLabel: 'Power (dB)',
          xMin: 0,
          xMax: 100,
          yMin: 0,
          yMax: 360,
          frequencies: Array.from({ length: 100 }, (_, i) => i + 1),
          values: [[Array.from({ length: 100 }, () => Math.floor(Math.random() * 361))]],
          flags: [[Array.from({ length: 100 }, () => Math.floor(Math.random() * 2))]],
          rfis: [[Array.from({ length: 100 }, () => Math.floor(Math.random() * 11))]],
        };

        setData(data1);
        setSocketStatus(Date().toLocaleString());
        console.log('RFIDisplay: data = ', data1);

        if (data1) rfiTable.draw(data1);

        loopCount++;
        if (loopCount < 2) {
          myLoop();
        }
      }, 10000);
    }

    myLoop(); //  start the loop
  });

  const onMessage = (event) => {
    const payload = JSON.parse(event.data);
    // DEBUG console.log('RFIDisplay:onMessage: received payload = ', payload);

    if ('status' in payload) {
      // DEBUG console.log(payload.status);
      setSocketStatus(payload.status);
    }

    if ('body' in payload) {
      setData(payload.body);
      setSocketStatus(payload.timestamp);

      if ('topic' in payload && payload?.topic === 'rfi_summary') rfiTable.draw(payload.body);
      if ('topic' in payload && payload?.topic === 'rfi_xx_00_01')
        rfiDetailsPlot.draw(payload.body);
    }
  };

  React.useEffect(() => {
    // DEBUG console.log('RFIDisplay: useEffect: 1');
    rfiDetailsWs.onmessage = onMessage;
    rfiSummaryWs.onmessage = onMessage;

    return () => {
      // TODO : ws.close();
    };
  });

  // React.useEffect(() => {
  //   console.log("RFIDisplay: useEffect: 2");
  //   // console.log("RFIDisplay: data = ", JSON.stringify(data));
  // }, [data, socketStatus]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div id="rfi-table" />
        </div>
        <div className="col">
          <div id="rfi-details-plot" />
        </div>
      </div>
    </div>
  );
}

export default RFIDisplay;
