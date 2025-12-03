"use client";
import { useAuth } from "../context/AuthContext";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>{token ? `Logged in with token: ${token}` : "Redirecting..."}</p>
      <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600" onClick={logout}>Logout</button>
    </div>
  );
}

