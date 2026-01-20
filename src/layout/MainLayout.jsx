import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  const location = useLocation();

  // Hide footer on these routes
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/profile";

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default MainLayout;
