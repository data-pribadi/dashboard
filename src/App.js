import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DataTable from './components/DataTable';
import Reports from './components/Reports';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NewPage from './components/NewPage';
import './index.css';

const App = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  const sheetId = process.env.REACT_APP_SHEET_ID;

  console.log('Client ID:', clientId);
  console.log('Redirect URI:', redirectUri);
  console.log('Sheet ID:', sheetId);

  return (
    <div className="App flex">
      <Router>
        <Sidebar />
        <div className="flex-grow ml-64">
          <Navbar />
          <div className="mt-16 p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/datatable" element={<DataTable />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/newpage" element={<NewPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
