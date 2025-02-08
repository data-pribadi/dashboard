import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "../../index.css";

const Chart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default Chart;
