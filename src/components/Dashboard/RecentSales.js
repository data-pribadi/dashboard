import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import '../../index.css';

const RecentSales = ({ sales }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
      <ul className="divide-y divide-gray-200">
        {sales.map((sale, index) => (
          <li key={index} className="py-2 flex justify-between items-center">
            <div>
              <p className="text-gray-900">{sale.productName}</p>
              <p className="text-sm text-gray-600">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                {sale.date}
              </p>
            </div>
            <div className="text-green-500 font-bold">
              <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
              {sale.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSales;
