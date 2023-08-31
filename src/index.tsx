import React from 'react';
import { createRoot } from 'react-dom/client';
import './services/i18n/i18n';
import { StoreProvider } from './services/stateStorage';
import App from './components/App/App';
import Loader from './components/Loader/Loader';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.Suspense fallback={<Loader />}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.Suspense>
);
