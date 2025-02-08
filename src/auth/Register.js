import React, { useState } from "react";
import axios from "axios";
import "../index.css";
import "animate.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length < 5) {
      setError("Username harus minimal 5 karakter.");
      return;
    }
    if (fullname.length < 5) {
      setError("Nama lengkap harus minimal 5 karakter.");
      return;
    }
    if (password.length < 8) {
      setError("Password harus minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        fullname,
        email,
        password,
      });
      if (response.data.success) {
        setSuccess("Registrasi berhasil. Silakan login.");
        setError("");
        setUsername("");
        setFullname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => navigate("/login"), 3000); // Arahkan ke halaman login setelah 3 detik
      } else if (response.data.error === "Username is already taken") {
        setError("Username sudah digunakan. Silakan pilih username lain.");
      } else {
        setError("Registrasi gagal. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Terjadi kesalahan saat menghubungi server. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg animate__animated animate__fadeInDown">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Register
        </h2>
        {success && (
          <div className="p-2 text-green-600 bg-green-100 border border-green-400 rounded">
            {success}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-2 text-red-600 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Register
          </button>
          <p className="text-center">
            Sudah punya akun?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:text-blue-800"
            >
              Login sekarang
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
