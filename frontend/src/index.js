import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { OfferContextProvider } from './context/OfferContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OfferContextProvider>
      <App />
    </OfferContextProvider>
  </React.StrictMode>
);
