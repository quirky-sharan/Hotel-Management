import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lastLoginIdentifier");
    if (saved) setIdentifier(saved);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("Please enter username/email and password.");
      return;
    }

    try {
      setLoading(true);
      login({ identifier, password });
      localStorage.setItem("lastLoginIdentifier", identifier);

      setSuccess(true);
      setTimeout(() => navigate("/"), 900);
    } catch {
      setError("Invalid credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0e0e11] via-[#141418] to-[#0b0b0d] px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="text-white/60 mt-2">Login to continue.</p>

        {error && (
          <div className="mt-5 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Username or email"
            className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-gold-400"
          />

          {/* Password with eye */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl pr-12 outline-none focus:ring-2 focus:ring-gold-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            disabled={loading || success}
            className={`w-full py-3 rounded-xl font-semibold transition-all
              ${
                success
                  ? "bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.6)]"
                  : "bg-gold-400 hover:bg-gold-500 hover:shadow-[0_0_30px_rgba(191,167,111,0.5)]"
              }`}
          >
            {success ? "✓ Logged in" : loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-white/60 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-gold-400 hover:text-gold-300">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
