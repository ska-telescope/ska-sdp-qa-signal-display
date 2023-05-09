import React from 'react';
import { createRoot } from 'react-dom/client';
import './services/i18n/i18n';
import './index.scss';
import App from './App/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
