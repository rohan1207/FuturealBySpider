import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const AboutUsHero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden"> 
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/bgv.mp4"
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10 flex flex-col items-center justify-center text-white px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg md:text-xl max-w-2xl"
        >
          Your Vision. Our Expertise. Your Success. Get Noticed. Generate Leads. Dominate.
        </motion.p>
      </div>
    </div>
  );
};

export default AboutUsHero;
