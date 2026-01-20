import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16 text-white">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔵</span>
              <span className="text-xl font-semibold tracking-tight">
                coco
              </span>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-md">
              coco is a modern hotel booking platform focused on refined
              UI/UX, performance-driven frontend architecture, and a
              seamless booking experience — built as part of a GDG
              frontend challenge.
            </p>

            <p className="mt-4 text-xs text-white/40">
              Built with attention to detail, scalability, and product
              thinking.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>About coco</li>
              <li>Careers</li>
              <li>Press & Media</li>
              <li>GDG Initiative</li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-white transition">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-white transition">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="hover:text-white transition">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Help Center</li>
              <li>Booking Policy</li>
              <li>Cancellation Policy</li>
              <li>Contact Support</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-white/10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} coco. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6 text-xs text-white/50">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Preferences</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
