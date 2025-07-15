import React from "react";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaSearch,
  FaPaperPlane,
  FaChartLine,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Register",
    desc: "Create your free account as employer or job seeker.",
    icon: <FaUserPlus size={32} className="text-indigo-600" />,
  },
  {
    id: 2,
    title: "Post or Search",
    desc: "Employers post jobs, seekers search easily.",
    icon: <FaSearch size={32} className="text-indigo-600" />,
  },
  {
    id: 3,
    title: "Apply or Hire",
    desc: "One-click applications, real-time notifications.",
    icon: <FaPaperPlane size={32} className="text-indigo-600" />,
  },
  {
    id: 4,
    title: "Track Everything",
    desc: "Dashboard access for jobs and applications.",
    icon: <FaChartLine size={32} className="text-indigo-600" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-indigo-700 mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
