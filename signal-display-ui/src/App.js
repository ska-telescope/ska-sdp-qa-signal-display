import React, { useRef, useEffect, useState } from "react";
import SpectrumPlot from "./SpectrumPlot";
import "./App.css";
import MockSpectrumDataPayload from "./mock/MockSpectrumData";

const { REACT_APP_API_URL, REACT_APP_WS_URL } = process.env;
const spectrumAPI = `${REACT_APP_WS_URL}/consumer/spectrum`;
const ws = new WebSocket(spectrumAPI);

function App() {
    console.log("App: spectrumAPI: ", spectrumAPI);

    const [data, setData] = useState(null); // MockSpectrumDataPayload.body
    const [socketStatus, setSocketStatus] = useState(
        MockSpectrumDataPayload.timestamp
    );

    useEffect(() => {
        console.log("App: useEffect: 1");
        ws.onmessage = onMessage;

        return () => {
            // TODO
            // ws.close();
        };
    });

    useEffect(() => {
        console.log("App: useEffect: 2");
    }, [data, socketStatus]);

    const onMessage = (event) => {
        const payload = JSON.parse(event.data);
        console.log("App.js:onMessage: received payload = ", payload);

        if ("status" in payload) {
            console.log(payload.status);
            setSocketStatus(payload.status);
        }

        if ("body" in payload) {
            setData(payload.body);
            setSocketStatus(payload.timestamp);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h4>Sprectrum Plot</h4>
                <p>{socketStatus}</p>
                <SpectrumPlot width={1200} height={500} data={data} />
            </header>
        </div>
    );
}

export default App;
