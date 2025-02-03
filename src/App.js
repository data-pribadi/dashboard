import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DataTable from './components/DataTable';
import Reports from './components/Reports';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NewPage from './components/NewPage'; // Pastikan komponen ini ada
import './index.css'; // Import file CSS utama Anda

const App = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  const sheetId = process.env.REACT_APP_SHEET_ID;

  console.log('Client ID:', clientId);
  console.log('Redirect URI:', redirectUri);
  console.log('Sheet ID:', sheetId);

  return (
    <div className="App flex">
      <Sidebar />
      <div className="flex-grow ml-64"> {/* Margin-left disesuaikan dengan lebar sidebar */}
        <Navbar />
        <div className="mt-16 p-4"> {/* Margin-top disesuaikan dengan tinggi navbar */}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} /> {/* Mengarahkan "/" ke "/dashboard" */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/datatable" element={<DataTable />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/newpage" element={<NewPage />} /> {/* Rute baru untuk NewPage */}
            {/* Tambahkan lebih banyak rute sesuai kebutuhan */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
