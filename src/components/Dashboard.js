import React, { useState, useEffect, useCallback } from 'react';
import '../index.css'; // Mengimpor index.css dari direktori src
import 'animate.css'; // Mengimpor animate.css
import DashboardCard from './Dashboard/DashboardCard';
import Chart from './Dashboard/Chart';
import RecentSales from './Dashboard/RecentSales';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [vouchersData, setVouchersData] = useState([]);
  const [laporanData, setLaporanData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVouchersData = useCallback(async () => {
    const sheetId = process.env.REACT_APP_SHEET_ID;
    const range = process.env.REACT_APP_VOUCHERS_RANGE;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.values) {
        setVouchersData(result.values);
      } else {
        setVouchersData([]);
        setError('No data found in Data_Vouchers');
      }
    } catch (error) {
      setError('Error fetching data from Data_Vouchers');
    }
  }, []);

  const fetchLaporanData = useCallback(async () => {
    const sheetId = process.env.REACT_APP_SHEET_ID;
    const range = process.env.REACT_APP_LAPORAN_RANGE;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.values) {
        setLaporanData(result.values);
      } else {
        setLaporanData([]);
        setError('No data found in Data_Laporan');
      }
    } catch (error) {
      setError('Error fetching data from Data_Laporan');
    }
  }, []);

  const fetchData = useCallback(async () => {
    setError(null);
    setLoading(true);
    await fetchVouchersData();
    await fetchLaporanData();
    setLoading(false);
  }, [fetchVouchersData, fetchLaporanData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalSellers = vouchersData.length;
  const activeUsers = vouchersData.filter((row) => row[6] === 'Aktif').length;
  const totalSales = laporanData
    .reduce(
      (sum, row) =>
        sum + parseFloat(row[3]?.replace('Rp', '').replace(',', '').trim() || 0),
      0
    )
    .toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  const statusCount = laporanData.length;

  const data = {
    labels: ['Penjual', 'User Aktif', 'Status', 'Penjualan'],
    datasets: [
      {
        label: 'Jumlah',
        data: [
          totalSellers,
          activeUsers,
          statusCount,
          parseFloat(totalSales.replace('Rp', '').replace(',', '').trim() || 0),
        ],
        backgroundColor: ['#1E3A8A', '#10B981', '#F59E0B', '#EF4444'],
        borderColor: ['#1E40AF', '#059669', '#D97706', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Dashboard Data Chart',
      },
    },
  };

  const data2 = {
    labels: ['Januari', 'Februari', 'Maret', 'April'],
    datasets: [
      {
        label: 'Penjualan Bulanan',
        data: [3000, 4000, 3500, 5000],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderColor: ['#2563EB', '#059669', '#D97706', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Penjualan Bulanan Chart',
      },
    },
  };

  const recentSale = laporanData.length ? laporanData.slice(-1)[0] : null;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <div className="text-center text-red-600 py-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <DashboardCard bgColor="bg-blue-500" title="Total Sellers Stock" value={totalSellers} />
        <DashboardCard bgColor="bg-green-500" title="User Aktif" value={activeUsers} />
        <DashboardCard bgColor="bg-yellow-500" title="Status" value={statusCount} />
        <DashboardCard bgColor="bg-red-500" title="Hasil Penjualan" value={totalSales} />
        <DashboardCard bgColor="bg-gray-500" title="Sisa Stock" value={totalSellers} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Chart data={data} options={options} />
        <Chart data={data2} options={options2} />
      </div>

      <RecentSales recentSale={recentSale} />
    </div>
  );
};

export default Dashboard;
