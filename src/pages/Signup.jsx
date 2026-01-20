import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function getStrength(password) {
  if (password.length < 6) return "weak";
  if (/[A-Z]/.test(password) && /\d/.test(password)) return "strong";
  return "medium";
}

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const strength = getStrength(password);

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      signup({ username, email, password });

      setSuccess(true);
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#0e0e11] via-[#141418] to-[#0b0b0d] overflow-hidden">
      
      {/* 🎉 Confetti */}
      {success && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 bg-gold-400 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 text-white">
        <h1 className="text-3xl font-semibold">Create account</h1>
        <p className="text-white/60 mt-2">Join coco today.</p>

        {error && (
          <div className="mt-5 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl outline-none"
          />

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl outline-none"
          />

          {/* Password with eye */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl pr-12 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Strength */}
          {password && (
            <p
              className={`text-sm ${
                strength === "weak"
                  ? "text-red-400"
                  : strength === "medium"
                  ? "text-yellow-400"
                  : "text-emerald-400"
              }`}
            >
              Password strength: {strength}
            </p>
          )}

          <button
            disabled={loading || success}
            className={`w-full py-3 rounded-xl font-semibold transition-all
              ${
                success
                  ? "bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.6)]"
                  : "bg-gold-400 hover:bg-gold-500 hover:shadow-[0_0_30px_rgba(191,167,111,0.5)]"
              }`}
          >
            {success ? "✓ Account created" : loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-white/60 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-gold-400 hover:text-gold-300">
            Login
          </Link>
        </p>
      </div>

      {/* Confetti animation */}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-confetti {
          top: -10px;
          animation: confetti 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Signup;
