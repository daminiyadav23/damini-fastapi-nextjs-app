"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../app/context/AuthContext";

export default function LoginForm() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      login(res.data.access_token);
      setMsg("🎉 Successfully Logged In!");
    } catch (err) {
      setMsg("❌ Invalid email or password");
    }
  };

  return (
    <div className="bg-pink-100 p-6 rounded-xl shadow-md text-center mt-4">
      <h2 className="text-xl font-bold text-pink-700">Login</h2>

      <input
        placeholder="Email"
        className="p-2 w-full mt-3 border rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        className="p-2 w-full mt-3 border rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-pink-600 text-white px-4 py-2 rounded mt-4 w-full"
        onClick={handleLogin}
      >
        Login
      </button>

      {msg && <p className="mt-2 text-pink-700">{msg}</p>}
    </div>
  );
}
