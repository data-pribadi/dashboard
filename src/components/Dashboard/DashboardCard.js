import React from 'react';
import '../../index.css';

const DashboardCard = ({ bgColor, title, value }) => {
  return (
    <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg`}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
