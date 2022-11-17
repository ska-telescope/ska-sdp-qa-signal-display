import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
// eslint-disable-next-line import/no-unresolved
import App from './App/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Suspense fallback="...is loading">
    <App />
  </Suspense>
);
