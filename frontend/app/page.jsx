"use client";

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function HomePage() {
  const { token, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login("fake-jwt-token");
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#8B4513] p-6">
      <motion.h1
        className="text-6xl md:text-7xl font-extrabold text-center mb-12"
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ color: "gold", textShadow: "0 0 20px gold, 0 0 40px gold, 0 0 60px gold" }}
      >
        Welcome!
      </motion.h1>

      {token ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-white text-center">Logged in with token: {token}</p>
          <button onClick={handleLogout} className="px-8 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transform hover:scale-105 transition">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"/>
          <button onClick={handleLogin} className="w-full px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:scale-105 transform transition duration-300">
            Login
          </button>
        </div>
      )}
    </div>
  );
}
