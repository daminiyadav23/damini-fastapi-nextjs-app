"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token);  // Auto-login after signup
        setMessage("Signup Successful!");

        // Redirect to home/dashboard after 1s
        setTimeout(() => {
          router.push("/"); 
        }, 1000);
      } else {
        setMessage("Signup failed. Try again!");
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#8B4513] px-4 relative">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="absolute left-5 top-1/2 -translate-y-1/2 
                   bg-white text-black px-4 py-2 rounded-lg shadow 
                   hover:bg-gray-200 transition"
      >
        ← Back
      </button>

      {/* GOLDEN WELCOME TEXT */}
      <motion.h1
        className="text-6xl md:text-7xl font-extrabold text-center mb-12"
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          color: "gold",
          textShadow: "0 0 20px gold, 0 0 40px gold, 0 0 60px gold",
        }}
      >
        Create Account
      </motion.h1>

      {/* MESSAGE */}
      {message && <p className="text-white text-lg font-semibold mb-4">{message}</p>}

      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <input
          type="email"
          placeholder="Enter your email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={handleSignup}
          className="w-full px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:scale-105 transform transition duration-300"
        >
          Signup
        </button>

        <p className="mt-3 text-white text-sm">
          Already have an account?
          <span
            onClick={() => router.push("/login")}
            className="text-yellow-300 cursor-pointer ml-1"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
