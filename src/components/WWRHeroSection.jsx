import React, { useRef, useState } from 'react';
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useInView } from 'framer-motion';

export default function WWRHeroSection({ onLoad }) {
  const contentRef = useRef(null);
  const dropdownRef = useRef(null);
  const isInView = useInView(contentRef, { once: true });

  const [open, setOpen] = useState(false);

  // Dropdown handlers
  const handleMouseEnter = () => {
    if (window.innerWidth > 768) setOpen(true); // only on desktop
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) setOpen(false);
  };

  const handleButtonClick = () => {
    if (window.innerWidth <= 768) setOpen(prev => !prev); // toggle on mobile
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
        <source src="/bgv.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 md:px-10 text-white max-w-5xl w-full mx-auto">
        <motion.div
          ref={contentRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mt-24"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            <motion.span variants={itemVariants}>
            Who We Are<br />
              <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
               
Shaping the future of spaces, one project at a time

              </span>
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 max-w-3xl mb-8"
          >
          We are a multidisciplinary team of designers, engineers, and project managers dedicated to creating exceptional commercial environments. From high-impact industrial facilities to human-centric healthcare and education spaces, our projects span across sectors and are unified by our commitment to design excellence and flawless execution.

          </motion.p>

          {/* Dropdown */}
          <motion.div
            variants={itemVariants}
            className="relative inline-block"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleButtonClick}
              className="px-6 py-2 bg-white/10 border border-white rounded-full hover:bg-gradient-to-r from-sky-500 to-purple-500 transition-all flex items-center gap-2"
            >
              I'm interested in
              <ChevronDown size={18} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute mt-2 w-56 bg-white text-black rounded-lg shadow-lg z-50"
                >
                  {['Design & Build', 'General Contracting'].map((item, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        console.log(`Selected: ${item}`);
                        setOpen(false);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
