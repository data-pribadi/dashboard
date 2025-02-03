// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Pastikan Tailwind CSS dan Flowbite diimpor
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Laporan vitalitas web untuk pengukuran kinerja aplikasi Anda
reportWebVitals();
