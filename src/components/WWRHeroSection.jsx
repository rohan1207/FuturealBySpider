import React, { useEffect, useState } from 'react';
import { ChevronDown } from "lucide-react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function WWRHeroSection({ onLoad }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto" 
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: 'fadeIn 1s ease-in-out' }}
        onLoadedData={() => onLoad?.()}
      >
        <source src="/bgv2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Lightened Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white max-w-4xl mx-auto text-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Who We Are
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-[192px] drop-shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          We revolutionize turnkey project delivery through innovation, precision, and empathy — creating exceptional experiences and lasting value.
        </motion.p>

        <motion.button
          className="bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] text-white px-5 py-2 rounded-full text-sm font-medium hover:from-[#1E5FD8] hover:to-[#7D3AD8] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/contact-us">Contact Us</Link>
        </motion.button>
      </div>

      {/* Bouncing Arrow - Fixed positioning for perfect centering */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center z-10 mb-6">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white"
        >
          <ChevronDown size={36} strokeWidth={2.5} />
        </motion.div>
      </div>
    </div>
  );
}