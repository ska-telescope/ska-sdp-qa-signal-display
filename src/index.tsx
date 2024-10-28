import React from 'react';
import { createRoot } from 'react-dom/client';
import './services/i18n/i18n';
import { StoreProvider } from '@ska-telescope/ska-gui-local-storage';
import App from './components/App/App';
import Loader from './components/Loader/Loader';
import AuthProvider from './components/Auth/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.Suspense fallback={<Loader />}>
    <StoreProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StoreProvider>
  </React.Suspense>
);
