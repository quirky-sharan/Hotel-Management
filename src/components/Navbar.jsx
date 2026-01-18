import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            StayEase
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/hotels" className="hover:text-blue-600">
              Hotels
            </Link>
            <Link to="/favorites" className="hover:text-blue-600">
              Wishlist
            </Link>
            <Link to="/bookings" className="hover:text-blue-600">
              My Bookings
            </Link>
            <Link to="/profile" className="hover:text-blue-600">
              Profile
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Hi, <b>{user.username || user.email}</b>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-black transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="md:hidden pb-4 space-y-3 text-gray-700 font-medium">
            <Link
              to="/"
              className="block hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/hotels"
              className="block hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Hotels
            </Link>

            <Link
              to="/favorites"
              className="block hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Wishlist
            </Link>

            <Link
              to="/bookings"
              className="block hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              My Bookings
            </Link>

            <Link
              to="/profile"
              className="block hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>

            <div className="pt-2 border-t">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-black transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block text-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
