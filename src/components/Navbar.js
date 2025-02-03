import React from 'react';
import '../index.css'; // Pastikan Tailwind CSS terimpor

const Navbar = () => {
  return (
    <nav className="bg-gray-700 text-white px-4 py-2 fixed w-full top-0 left-0 z-50 flex justify-between items-center">
      <div className="text-lg font-bold">Admin Dashboard</div>
      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Logout</button>
    </nav>
  );
};

export default Navbar;
