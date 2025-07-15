import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-50 py-10 border-t border-gray-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-center md:text-left">
        {/* Brand + Copyright */}
        <div>
          <h1 className="text-indigo-600 text-xl font-bold">
            <img src={logo} alt="JobBoard" className="h-10" />
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            © 2025 SmartJobFit AI. All rights reserved.
          </p>
        </div>

        {/* Footer Links */}
        <div className="space-x-6 text-gray-600 font-medium">
          <a href="#about" className="hover:text-indigo-600 transition">
            About
          </a>
          <a href="#contact" className="hover:text-indigo-600 transition">
            Contact
          </a>
          <a href="#privacy" className="hover:text-indigo-600 transition">
            Privacy
          </a>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4 text-gray-600">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
