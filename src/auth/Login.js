import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../index.css";
import "animate.css";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        identifier,
        password,
      });
      if (response.data.success) {
        login();
        navigate("/dashboard"); // Arahkan ke dashboard setelah login berhasil
        setError("");
      } else {
        setError("Username/email atau password salah");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Terjadi kesalahan saat menghubungi server. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg animate__animated animate__fadeInDown">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-2 text-red-600 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700"
            >
              Username atau Email
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Login
          </button>
          <p className="text-center">
            Belum punya akun?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer hover:text-blue-800"
            >
              Daftar sekarang
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
