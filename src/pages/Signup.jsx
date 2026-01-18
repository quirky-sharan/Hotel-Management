import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("kminchelle");
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
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gradient-to-br from-[#0e0e11] via-[#141418] to-[#0b0b0d]">
      
      {/* Ambient background glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-white/5 rounded-full blur-[160px]" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl shadow-[0_50px_120px_rgba(0,0,0,0.7)] p-8 text-white">
        
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-white/60 mt-2">
          Sign in to continue your journey.
        </p>

        {error && (
          <div className="mt-5 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-white/70">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="mt-2 w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl
                text-white placeholder-white/40 outline-none
                focus:ring-2 focus:ring-gold-400 transition"
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-2 w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl
                text-white placeholder-white/40 outline-none
                focus:ring-2 focus:ring-gold-400 transition"
            />
          </div>

          <button
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl bg-gold-400 text-white font-semibold
              hover:bg-gold-500 hover:shadow-[0_0_30px_rgba(191,167,111,0.5)]
              transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-8 text-sm text-white/50">
          Demo credentials
          <div className="mt-3 bg-black/30 border border-white/10 rounded-xl p-3">
            <p>
              <span className="text-white/60">Username:</span>{" "}
              <span className="text-white">Sharan</span>
            </p>
            <p>
              <span className="text-white/60">Password:</span>{" "}
              <span className="text-white">Soni</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
