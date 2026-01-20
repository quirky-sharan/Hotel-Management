import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  // Scroll behavior
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 20);

      if (currentY > lastScrollY && currentY > 80) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transform transition-all duration-500 ease-out
        ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div
          className={`border-b border-white/10 backdrop-blur-xl transition-colors duration-500
          ${
            scrolled
              ? "bg-[#0b0b0d]/95 shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
              : "bg-[#0b0b0d]/60"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link
                to="/"
                className="text-2xl font-semibold tracking-tight text-white"
              >
                <span className="text-gold-400">🔵</span>coco
              </Link>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-10 text-sm font-medium text-white/80">
                {[
                  { name: "Home", path: "/" },
                  { name: "Hotels", path: "/hotels" },
                  { name: "Liked", path: "/favorites" },
                  { name: "My Bookings", path: "/bookings" },
                  { name: "Profile", path: "/profile" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative hover:text-white transition
                      after:absolute after:left-0 after:-bottom-1
                      after:h-[1px] after:w-0 after:bg-gold-400
                      after:transition-all hover:after:w-full"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Desktop Auth */}
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <>
                    <span className="text-sm text-white/60">
                      Hi,{" "}
                      <span className="text-white font-medium">
                        {user.username || user.email}
                      </span>
                    </span>

                    <button
                      onClick={handleLogout}
                      className="px-5 py-2 rounded-full bg-white/10 text-white
                        hover:bg-white/20 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {/* LOGIN */}
                    <Link
                      to="/login"
                      className="px-5 py-2 rounded-full text-white/80
                        hover:text-white hover:scale-[1.05]
                        transition-transform duration-300"
                    >
                      Login
                    </Link>

                    {/* SIGN UP */}
                    <Link
                      to="/signup"
                      className="px-6 py-2 rounded-full bg-white text-black
                        font-medium transition-all duration-300
                        hover:bg-gold-400 hover:scale-[1.08]
                        hover:shadow-[0_0_30px_rgba(191,167,111,0.6)]"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Button */}
              <button
                className="md:hidden text-white text-2xl"
                onClick={() => setOpen(!open)}
              >
                ☰
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-500
              ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="pb-6 pt-2 space-y-4 text-white/80">
                {[
                  { name: "Home", path: "/" },
                  { name: "Hotels", path: "/hotels" },
                  { name: "Wishlist", path: "/favorites" },
                  { name: "My Bookings", path: "/bookings" },
                  { name: "Profile", path: "/profile" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-4 border-t border-white/10">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 rounded-full bg-white/10 text-white
                        hover:bg-white/20 transition"
                    >
                      Logout
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="flex-1 text-center py-2 rounded-full
                          bg-white/10 text-white hover:bg-white/20 transition"
                      >
                        Login
                      </Link>

                      <Link
                        to="/signup"
                        onClick={() => setOpen(false)}
                        className="flex-1 text-center py-2 rounded-full
                          bg-white text-black font-medium
                          hover:bg-gold-400 transition"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* SPACER TO PREVENT OVERLAP */}
      <div className="h-20" />
    </>
  );
}

export default Navbar;
