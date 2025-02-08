import React, { useContext } from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DataTable from './components/DataTable';
import Reports from './components/Reports';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NewPage from './components/NewPage';
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthContext, AuthProvider } from './context/AuthContext';
import './index.css';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="App flex">
          <Sidebar />
          <div className="flex-grow ml-64">
            <Navbar />
            <div className="mt-16 p-4">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/datatable"
                  element={
                    <PrivateRoute>
                      <DataTable />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <PrivateRoute>
                      <Reports />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/newpage"
                  element={
                    <PrivateRoute>
                      <NewPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
