import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("kminchelle"); // DummyJSON test user
  const [password, setPassword] = useState("0lelplR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white text-gray-900 rounded-2xl shadow-xl border p-8">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 mt-2">
          Welcome back! Please login to continue.
        </p>

        {error && (
          <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 w-full border p-3 rounded-xl outline-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full border p-3 rounded-xl outline-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-500">
          Demo credentials:
          <div className="mt-2 bg-gray-100 rounded-xl p-3 text-gray-700">
            <p>
              <b>Username:</b> kminchelle
            </p>
            <p>
              <b>Password:</b> 0lelplR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
