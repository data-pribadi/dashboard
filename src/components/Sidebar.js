import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faTable, faChartBar, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../index.css'; // Pastikan Tailwind CSS terimpor

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen fixed top-0 left-0 pt-16">
      <ul className="space-y-4 p-4">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center p-2 rounded bg-gray-700'
                : 'flex items-center p-2 rounded hover:bg-gray-700'
            }
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/datatable"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center p-2 rounded bg-gray-700'
                : 'flex items-center p-2 rounded hover:bg-gray-700'
            }
          >
            <FontAwesomeIcon icon={faTable} className="mr-2" />
            Data Table
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center p-2 rounded bg-gray-700'
                : 'flex items-center p-2 rounded hover:bg-gray-700'
            }
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-2" />
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/newpage"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center p-2 rounded bg-gray-700'
                : 'flex items-center p-2 rounded hover:bg-gray-700'
            }
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            New Page
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
