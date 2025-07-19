import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.nav
      className="flex items-center justify-between px-14 py-4 bg-white shadow-lg w-full z-50 rounded-b-xl border-b"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      {/* Logo / Brand */}
      <Link to="/" className="hover:scale-105 transition-transform">
        <img src={logo} alt="SmartJobFit Logo" className="h-14" />
      </Link>

      {/* Right Nav */}
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            {/* Role-specific link */}
            {user?.role === "employer" && (user?.id || user?._id) && (
              <Link
                to="/employer"
                className="text-gray-700 hover:text-indigo-700 font-semibold"
              >
                Employer Dashboard
              </Link>
            )}
            {user?.role === "seeker" && (user?.id || user?._id) && (
              <Link
                to="/seeker"
                className="text-gray-700 hover:text-indigo-700 font-semibold"
              >
                Seeker Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-700 font-semibold transition"
            >
              Login
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
