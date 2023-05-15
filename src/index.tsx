import React from 'react';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from './services/stateStorage';
import './services/i18n/i18n';
import './index.scss';
import App from './App/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
