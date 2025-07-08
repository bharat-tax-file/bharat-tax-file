import { useState } from "react";
import { useRouter } from "next/router";
import { FaChartLine, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import PageMetaTags from "@/containers/PageMetaTags";
import InnerPageContainer from "@/components/common/InnerPageContainer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const demoUser = {
    email: "demo@finance.com",
    password: "finance123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === demoUser.email && password === demoUser.password) {
      setMessage("✅ Login successful!");
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      setMessage("❌ Invalid email or password.");
    }
  };

  const handleOAuth = (provider) => {
    // Placeholder for OAuth logic
    alert(`OAuth login with ${provider} is not yet implemented.`);
  };

  return (
    <InnerPageContainer title="Login">
      <PageMetaTags
        title="Login - FinConnect"
        description="Secure login to your FinConnect portal."
        url="/login"
      />

      <div className="flex items-start justify-center bg-gradient-to-br from-indigo-50 to-white px-4 py-2">
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8 md:p-10 text-center">
          <div className="flex justify-center mb-5">
            <FaChartLine className="text-indigo-600 text-6xl animate-bounce" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Welcome to FinConnect
          </h1>
          <p className="text-gray-600 mb-6">
            Log in to access your financial dashboard and insights.
          </p>

          {/* OAuth Button */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleOAuth('Google')}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <FaGoogle className="text-red-500 mr-2" /> Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="e.g. demo@finance.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <Link href="/forgot-password" className="text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md"
            >
              Sign In
            </button>
          </form>

          {message && (
            <p
              className={`mt-6 font-semibold text-sm ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mt-6 text-sm text-gray-500">
            <p className="mb-1">
              Demo Email: <code className="font-mono">demo@finance.com</code>
            </p>
            <p>
              Demo Password: <code className="font-mono">finance123</code>
            </p>
          </div>
        </div>
      </div>
    </InnerPageContainer>
  );
}
