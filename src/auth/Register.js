import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import 'animate.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (username.length < 5) {
      setError('Username harus minimal 5 karakter.');
      return;
    }
    if (fullname.length < 5) {
      setError('Nama lengkap harus minimal 5 karakter.');
      return;
    }
    if (password.length < 8) {
      setError('Password harus minimal 8 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password dan Konfirmasi Password tidak cocok.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        fullname,
        password,
      });
      if (response.data.success) {
        alert('Registrasi berhasil. Silakan login.');
        navigate('/login');
      } else if (response.data.message === 'Username is already taken') {
        setError('Username sudah digunakan. Silakan pilih username lain.');
      } else {
        setError('Registrasi gagal. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Terjadi kesalahan saat menghubungi server. Silakan coba lagi.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Daftar</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-2"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Konfirmasi Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Daftar
          </button>
        </form>
        <p className="mt-4 text-center">
          Sudah punya akun?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
