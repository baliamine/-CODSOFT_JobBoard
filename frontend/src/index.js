import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { OfferContextProvider } from './context/OfferContext';
import { EmployerContextProvider } from './context/EmployerContext';
import { JobSeekerContextProvider } from './context/JobSeekerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OfferContextProvider>
      <EmployerContextProvider>
        <JobSeekerContextProvider>
      <App />
      </JobSeekerContextProvider>
      </EmployerContextProvider>
    </OfferContextProvider>
  </React.StrictMode>
);
