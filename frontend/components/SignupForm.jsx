"use client";
import { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8000/signup", {
        email,
        password,
      });
      setMsg(" Signup Successful!");
    } catch (err) {
      setMsg(" Email already exists");
    }
  };

  return (
    <div className="bg-pink-100 p-6 rounded-xl shadow-md text-center mt-4">
      <h2 className="text-xl font-bold text-pink-700">Signup</h2>

      <input
        placeholder="Email"
        className="p-2 w-full mt-3 border rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Create Password"
        type="password"
        className="p-2 w-full mt-3 border rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-pink-600 text-white px-4 py-2 rounded mt-4 w-full"
        onClick={handleSignup}
      >
        Signup
      </button>

      {msg && <p className="mt-2 text-pink-700">{msg}</p>}
    </div>
  );
}
