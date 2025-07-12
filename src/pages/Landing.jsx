import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

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
