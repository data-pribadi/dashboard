import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../../index.css';

const RecentSales = ({ recentSale }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
      {recentSale ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 bg-gray-100 p-4 rounded-lg shadow">
          <span>{recentSale[0]}</span>
          <span>{recentSale[1]}</span>
          <span>{recentSale[2]}</span>
          <span>{recentSale[3]}</span>
          <span>{recentSale[4]}</span>
          <span>{recentSale[5]}</span>
          <span>
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
            {recentSale[7]}
          </span>
        </div>
      ) : (
        <p className="text-center py-4">No recent sales data available</p>
      )}
    </div>
  );
};

export default RecentSales;
