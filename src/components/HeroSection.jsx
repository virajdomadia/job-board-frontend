import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";
import heroAnimation from "../assets/hero-animation.json"; // replace with your Lottie file

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 pt-20 flex items-center justify-center">
      <div className="max-w-7xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Text Content */}
        <div className="text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find Your Dream Job or Hire Top Talent
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white mb-8 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Typewriter
              words={[
                "Post Jobs.",
                "Apply Instantly.",
                "Track Applications.",
                "Get Hired.",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.p>

          <motion.div
            className="space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Get Started
              </Link>
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login"
                className="bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-800 transition"
              >
                Login
              </Link>
            </motion.span>
          </motion.div>
        </div>

        {/* RIGHT: Lottie Animation */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Lottie
            animationData={heroAnimation}
            loop={true}
            className="w-full h-auto max-h-[400px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
