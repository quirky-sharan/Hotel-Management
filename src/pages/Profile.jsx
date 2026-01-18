import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const username = user?.username || user?.email || "Guest";
  const email = user?.email || "Not provided";
  const id = user?.id || "—";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold">Profile</h1>
          <p className="text-gray-400 mt-2">
            Manage your account preferences and view user information.
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate("/bookings")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            My Bookings
          </button>

          <button
            onClick={() => navigate("/favorites")}
            className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/15 transition"
          >
            Wishlist
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500/90 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-md">
              {username?.[0]?.toUpperCase()}
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-white">{username}</h2>
              <p className="text-gray-300">{email}</p>

              <div className="mt-2 inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-gray-200">
                ✨ Premium Demo User
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-gray-400">User ID</p>
              <p className="font-bold text-white mt-1">{id}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-gray-400">Account Status</p>
              <p className="font-bold text-green-400 mt-1">Active</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-gray-400">Session Storage</p>
              <p className="font-bold text-white mt-1">localStorage</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-gray-400">Security</p>
              <p className="font-bold text-white mt-1">JWT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* Account Details */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-white mb-4">Account Details</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Username</span>
              <span className="font-medium">{user?.username || "—"}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Email</span>
              <span className="font-medium">{user?.email || "—"}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Login System</span>
              <span className="font-medium">DummyJSON (JWT)</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span className="text-gray-400">Protected Routes</span>
              <span className="font-medium">Enabled</span>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/30 border border-white/10 rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-white mb-3">Coming Soon ✨</h3>
          <p className="text-gray-200 text-sm leading-relaxed">
            Download booking PDFs, account personalization, loyalty rewards,
            custom preferences, and theme switching.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "PDF Invoice",
              "Loyalty Points",
              "Saved Guests",
              "Travel Preferences",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
