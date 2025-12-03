"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 gap-6">
      <h1 className="text-4xl font-bold">Welcome to My App</h1>
      <p className="text-center text-gray-700 max-w-md">
        Please login or signup to continue.
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-green-500 text-white p-3 rounded hover:bg-green-600">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
