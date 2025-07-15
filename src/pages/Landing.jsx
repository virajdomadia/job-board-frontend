import React from "react";
import Navbar from "../components/common/Navbar";
import HeroSection from "../components/Landing/HeroSection";
import HowItWorks from "../components/Landing/HowItWorks";
import Footer from "../components/common/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

const Landing = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Landing;
