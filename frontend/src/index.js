import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { OfferContextProvider } from './context/OfferContext';
import { EmployerContextProvider } from './context/EmployerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OfferContextProvider>
      <EmployerContextProvider>
      <App />
      </EmployerContextProvider>
    </OfferContextProvider>
  </React.StrictMode>
);
