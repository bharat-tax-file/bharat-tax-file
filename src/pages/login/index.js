import { useState } from "react";
import { useRouter } from "next/router";
import {
  signInWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence, // ✅ Correctly imported
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await setPersistence(auth, inMemoryPersistence); // ✅ This logs out on tab close
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/login/dashboard");
    } catch (err) {
      setError("❌ " + err.message.replace("Firebase:", "").trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8 md:p-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          Welcome to <span className="text-indigo-600">Bharat Tax File</span>
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Log in to access your financial dashboard and insights.
        </p>

        {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>

        <div className="text-sm text-gray-500 mt-6">
          <p>
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
