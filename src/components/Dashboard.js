import React, { useState, useEffect } from "react";
import "../index.css"; // Pastikan Tailwind CSS terimpor
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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

  useEffect(() => {
    const fetchVouchersData = async () => {
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
          setError("No data found in Data_Vouchers");
        }
      } catch (error) {
        setError("Error fetching data from Data_Vouchers");
      }
    };

    const fetchLaporanData = async () => {
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
          setError("No data found in Data_Laporan");
        }
      } catch (error) {
        setError("Error fetching data from Data_Laporan");
      }
    };

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      await fetchVouchersData();
      await fetchLaporanData();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-4">{error}</div>;
  }

  const totalSellers = vouchersData.length;
  const activeUsers = vouchersData.filter((row) => row[6] === "Yes").length;
  const totalSales = vouchersData
    .reduce((sum, row) => sum + parseFloat(row[3] || 0), 0)
    .toFixed(2);
  const statusCount = laporanData.length;

  const data = {
    labels: ["Penjual", "User Aktif", "Status", "Penjualan"],
    datasets: [
      {
        label: "Jumlah",
        data: [totalSellers, activeUsers, statusCount, totalSales],
        backgroundColor: ["#1E3A8A", "#10B981", "#F59E0B", "#EF4444"],
        borderColor: ["#1E40AF", "#059669", "#D97706", "#DC2626"],
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
        text: "Dashboard Data Chart",
      },
    },
  };

  const data2 = {
    labels: ["Januari", "Februari", "Maret", "April"],
    datasets: [
      {
        label: "Penjualan Bulanan",
        data: [3000, 4000, 3500, 5000],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
        borderColor: ["#2563EB", "#059669", "#D97706", "#DC2626"],
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
        text: "Penjualan Bulanan Chart",
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Jumlah Penjual</h2>
          <p className="text-2xl font-bold">{totalSellers}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">User Aktif</h2>
          <p className="text-2xl font-bold">{activeUsers}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Status</h2>
          <p className="text-2xl font-bold">{statusCount}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Hasil Penjualan</h2>
          <p className="text-2xl font-bold">{totalSales}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <Bar data={data} options={options} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <Bar data={data2} options={options2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
