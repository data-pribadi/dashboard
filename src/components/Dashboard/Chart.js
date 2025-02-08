import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

const Chart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current;

    const myChart = new ChartJS(myChartRef, {
      type: 'bar',
      data,
      options,
    });

    return () => {
      myChart.destroy();
    };
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default Chart;
