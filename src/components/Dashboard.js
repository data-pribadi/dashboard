import React, { useState, useEffect } from 'react';
import '../index.css';
import 'animate.css';
import DashboardCard from './Dashboard/DashboardCard';
import Chart from './Dashboard/Chart';
import RecentSales from './Dashboard/RecentSales';
import 'chart.js';

const Dashboard = () => {
  const [dataVouchers, setDataVouchers] = useState([]);
  const [dataLaporan, setDataLaporan] = useState([]);
  const [loadingVouchers, setLoadingVouchers] = useState(true);
  const [loadingLaporan, setLoadingLaporan] = useState(true);
  const [errorVouchers, setErrorVouchers] = useState(null);
  const [errorLaporan, setErrorLaporan] = useState(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      const sheetId = process.env.REACT_APP_SHEET_ID;
      const range = process.env.REACT_APP_VOUCHERS_RANGE;
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      console.log('Fetching data from URL:', url);

      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log('Google Sheets API response:', result);
        if (result.values) {
          setDataVouchers(result.values);
        } else {
          setErrorVouchers('No data found in Data_Vouchers');
        }
      } catch (error) {
        setErrorVouchers('Error fetching data from Data_Vouchers');
        console.error('Error fetching data from Data_Vouchers', error);
      } finally {
        setLoadingVouchers(false);
      }
    };

    const fetchLaporan = async () => {
      const sheetId = process.env.REACT_APP_SHEET_ID;
      const range = process.env.REACT_APP_LAPORAN_RANGE;
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      console.log('Fetching data from URL:', url);

      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log('Google Sheets API response:', result);
        if (result.values) {
          setDataLaporan(result.values);
        } else {
          setErrorLaporan('No data found in Data_Laporan');
        }
      } catch (error) {
        setErrorLaporan('Error fetching data from Data_Laporan');
        console.error('Error fetching data from Data_Laporan', error);
      } finally {
        setLoadingLaporan(false);
      }
    };

    fetchVouchers();
    fetchLaporan();
  }, []);

  const totalVouchers = dataVouchers.filter((row) => row[7] === 'Aktif').length;
  const totalAmount = dataVouchers
    .filter((row) => row[7] === 'Aktif')
    .reduce((total, row) => {
      return total + parseFloat(row[3].replace('Rp', '').replace(',', ''));
    }, 0);

  const currencyFormat = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);

  const penjualanPerUser = dataLaporan.reduce((acc, row) => {
    const penjual = row[1];
    const harga = parseFloat(row[3].replace('Rp', '').replace(',', ''));
    if (!acc[penjual]) {
      acc[penjual] = { userAktif: 0, status: '', penjualan: 0 };
    }
    acc[penjual].userAktif++;
    acc[penjual].penjualan += harga;
    acc[penjual].status = row[6];
    return acc;
  }, {});

  const labels = Object.keys(penjualanPerUser);
  const jumlahPenjualan = Object.values(penjualanPerUser).map((user) => 
    user.penjualan
  );
  const chartColors = ['#1E3A8A', '#10B981', '#F59E0B', '#EF4444'];
  const borderColors = ['#1E40AF', '#059669', '#D97706', '#DC2626'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Jumlah Penjualan',
        data: jumlahPenjualan,
        backgroundColor: chartColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const monthlySalesLabels = ['Januari', 'Februari', 'Maret', 'April'];
  const monthlySalesData = [0, 0, 0, 0];
  const monthlySalesColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  const monthlyBorderColors = ['#2563EB', '#059669', '#D97706', '#DC2626'];

  const monthlySalesChartData = {
    labels: monthlySalesLabels,
    datasets: [
      {
        label: 'Penjualan Bulanan',
        data: monthlySalesData,
        backgroundColor: monthlySalesColors,
        borderColor: monthlyBorderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Vouchers"
          value={totalVouchers}
          icon="📦"
          bgColor="bg-blue-500"
        />
        <DashboardCard
          title="Total Amount"
          value={currencyFormat(totalAmount)}
          icon="💰"
          bgColor="bg-green-500"
        />
        <DashboardCard
          title="Aktif Vouchers"
          value="Aktif"
          icon="✅"
          bgColor="bg-yellow-500"
        />
        <DashboardCard
          title="Penjualan Bulanan"
          value="Rp 0"
          icon="📊"
          bgColor="bg-red-500"
        />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Dashboard Data Chart</h2>
        <Chart data={data} options={chartOptions} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Penjualan Bulanan Chart</h2>
        <Chart data={monthlySalesChartData} options={chartOptions} />
      </div>
      <div className="mt-8">
        <RecentSales sales={dataLaporan} />
      </div>
    </div>
  );
};

export default Dashboard;
