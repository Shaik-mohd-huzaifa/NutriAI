import React from "react";
import Navbar from "./landing/Navbar";
import Hero from "./landing/Hero";
import Features from "./landing/Features";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

export default Home;
