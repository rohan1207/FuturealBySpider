import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const DesignExcellence = ({ onLoad }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Enhanced smooth transforms for scroll animations
  const designX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    ["-100%", "-50%", "0%"]
  );
  const excellenceX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    ["100%", "50%", "0%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.8, 0.9, 1]);

  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#030014]"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover opacity-40"
          style={{ filter: "brightness(0.7) contrast(1.2)" }}
        >
          <source src="/water.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A72F8]/30 to-[#8F44EC]/30 mix-blend-overlay" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        {/* Design Excellence Text */}
        <div className="flex flex-col items-center space-y-6">
          <motion.h1
            style={{ x: designX }}
            initial={{ x: "-100%" }}
            className="text-7xl md:text-9xl font-extralight text-white/90 tracking-wider"
          >
            design
          </motion.h1>
          <motion.h1
            style={{ x: excellenceX }}
            initial={{ x: "100%" }}
            className="text-7xl md:text-9xl font-extralight text-white/90 tracking-wider"
          >
            excellence
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          style={{ opacity, scale }}
          initial={{ opacity: 0, scale: 0.8 }}
          className="mt-16 text-xl md:text-2xl text-gray-300/90 text-center max-w-2xl mx-auto leading-relaxed"
        >
          You can make meaningful change through design.
          <br />
          Let us show you how
        </motion.p>
      </div>
    </div>
  );
};

export default DesignExcellence;
