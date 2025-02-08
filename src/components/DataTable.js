import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faEye,
  faShoppingCart,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import '../index.css'; // Pastikan Tailwind CSS terimpor

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = rowsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      const sheetId = process.env.REACT_APP_SHEET_ID;
      const range = process.env.REACT_APP_VOUCHERS_RANGE;
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(0); // Reset halaman saat pencarian berubah
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(0); // Reset halaman saat jumlah baris per halaman berubah
  };

  const filteredData = data.filter((row) =>
    row.some((cell) =>
      cell.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

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
      <h1 className="text-2xl font-bold mb-4">Data Table</h1>
      <div className="flex justify-between mb-4">
        <div>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="mr-2 p-2 border rounded"
          >
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded"
        />
      </div>
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
              <th className="py-2 px-4 border">ACTIONS</th>{' '}
              {/* Tambahkan kolom untuk actions */}
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
                <td className="py-2 px-4 border">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-blue-500 text-white rounded">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="p-2 bg-green-500 text-white rounded">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="p-2 bg-yellow-500 text-white rounded">
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                    <button className="p-2 bg-red-500 text-white rounded">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </td>
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

export default DataTable;
