import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// eslint-disable-next-line import/no-unresolved
import App from './App/App';

ReactDOM.render(
  <Suspense fallback="...is loading">
    <App />
  </Suspense>,
  document.getElementById('root')
);
