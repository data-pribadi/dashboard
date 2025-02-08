import React from 'react';
import '../index.css';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = React.useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-10 top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">Admin Dashboard</div>
        <div>
          {isAuthenticated && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
