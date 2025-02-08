import React from 'react';
import '../../index.css';

const DashboardCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${bgColor} flex items-center`}>
      <div className="mr-4">
        <div className="text-white text-3xl">{icon}</div>
      </div>
      <div>
        <h2 className="text-white text-lg">{title}</h2>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
