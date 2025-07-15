import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <motion.nav
      className="flex items-center justify-between px-14 py-4 bg-white shadow-lg fixed w-full z-50 rounded-b-xl border-b"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      {/* Logo / Brand */}
      <motion.h1
        className="text-2xl font-extrabold text-indigo-600 hover:scale-105 transition-transform cursor-pointer"
        whileHover={{ scale: 1.1 }}
      >
        <img src={logo} alt="" className="h-14" />
      </motion.h1>

      {/* Auth Buttons */}
      <div className="space-x-3 flex items-center">
        <Link
          to="/login"
          className="text-gray-700 hover:text-indigo-700 font-semibold transition duration-200 transform hover:-translate-y-1"
        >
          Login
        </Link>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300"
          >
            Register
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
