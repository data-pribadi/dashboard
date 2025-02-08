import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faChartPie,
  faTable,
  faFileAlt,
  faUser,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import '../index.css';

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 bg-gray-800 w-64 overflow-y-auto">
      <div className="py-4">
        <div className="text-white text-xl font-semibold px-4">
          Admin Dashboard
        </div>
        <nav className="mt-5">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 rounded bg-gray-700"
              >
                <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/datatable"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faTable} className="mr-3" />
                Data Table
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className="flex items-center p-2 rounded bg-gray-700"
              >
                <FontAwesomeIcon icon={faChartPie} className="mr-3" />
                Reports
              </Link>
            </li>
            <li>
              <Link
                to="/newpage"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faFileAlt} className="mr-3" />
                New Page
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 rounded bg-gray-700"
              >
                <FontAwesomeIcon icon={faUser} className="mr-3" />
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faCog} className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
