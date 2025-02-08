import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../index.css'; // Pastikan Tailwind CSS terimpor

const Reports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const sheetId = process.env.REACT_APP_SHEET_ID;
      const range = process.env.REACT_APP_LAPORAN_RANGE;
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      console.log('Fetching data from URL:', url); // Log URL untuk verifikasi

      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log('Google Sheets API response:', result); // Log respon untuk debug
        if (result.values) {
          setData(result.values);
        } else {
          setError('No data found');
        }
      } catch (error) {
        setError('Error fetching data from Google Sheets');
        console.error('Error fetching data from Google Sheets', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-4">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">USERNAME</th>
              <th className="py-2 px-4 border">PASSWORD</th>
              <th className="py-2 px-4 border">HARGA</th>
              <th className="py-2 px-4 border">TANGGAL</th>
              <th className="py-2 px-4 border">WAKTU</th>
              <th className="py-2 px-4 border">USER_AKTIF</th>
              <th className="py-2 px-4 border">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {currentPageData.map((row, index) => (
              <tr key={index} className="bg-white">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-2 px-4 border">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container mt-4 flex justify-end">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination flex list-none'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link p-2 border rounded'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link p-2 border rounded'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link p-2 border rounded'}
        />
      </div>
    </div>
  );
};

export default Reports;
