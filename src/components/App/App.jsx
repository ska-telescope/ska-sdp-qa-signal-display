import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Login from '../Login/Login';
import QAMetrics from '../QAMetrics/QAMetrics';

function App() {
  /* Code below to change the language when language buttons are clicked
  const handleOnclick = e => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
  }
  */

  return (
    <Suspense>
      <div className="appContainer">
        <Router>
          <Routes>
            <Route path="/" element={<Login id="loginPageId" />} />
            <Route path="/QAMetrics" element={<QAMetrics id="qaMetricsPageId" />} />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
