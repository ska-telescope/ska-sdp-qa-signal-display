import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
// eslint-disable-next-line import/no-unresolved
import App from './App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback="...is loading">
    <App />
  </Suspense>
);