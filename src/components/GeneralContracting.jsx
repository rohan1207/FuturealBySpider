import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";

export const GeneralContracting = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  const titleX = useTransform(scrollYProgress, [0, 0.3], ["-100%", "0%"]);

  const textScale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

  const isInView = useInView(contentRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  // Mobile card auto-sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      text: "Futureal's General Contracting services are anchored in technical expertise, project transparency, and on-ground execution excellence. We take charge of everything - from managing daily site operations to coordinating subcontractors, handling procurement, and maintaining safety and compliance protocols.",
    },
    {
      text: "Our clients trust us for price-worthy construction solutions, proactive timelines, and strict quality control. Whether collaborating with architects or consultants, we ensure your vision is executed with precision and professionalism across all sectors.",
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black pt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover scale-105"
        >
          <source src="/GC.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 min-h-[calc(100vh-6rem)] flex flex-col justify-center">
        <div ref={contentRef} className="max-w-7xl mx-auto">
          {/* Innovative Title Section - Adjusted for mobile */}
          <motion.div
            className="text-center mb-16 relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="relative inline-block"
              initial={{ y: 50 }}
              animate={isInView ? { y: 0 } : { y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-8 relative z-10">
                GENERAL CONTRACTING
                <motion.div
                  className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC]"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </h2>
            </motion.div>

            <motion.div
              className="relative overflow-hidden inline-block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-white font-light tracking-wide mb-12"
                initial={{ y: 20 }}
                animate={isInView ? { y: 0 } : { y: 20 }}
                transition={{ duration: 0.8 }}
              >
                Reliable General Contracting for Timely & Quality Construction
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Content Cards - Desktop */}
          <div className="hidden md:grid md:grid-cols-2 gap-12">
            <motion.div
              className="backdrop-blur-md bg-black/40 rounded-2xl p-8 border border-white/10 relative group"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2A72F8]/20 to-[#8F44EC]/20"
                style={{
                  opacity: 0,
                  scale: 0.6,
                  transition: { duration: 0.6 },
                }}
                whileHover={{
                  opacity: 1,
                  scale: 1,
                }}
              />
              <p className="text-gray-300 leading-relaxed text-lg relative z-10">
                Futureal’s General Contracting services are anchored in
                technical expertise, project transparency, and on-ground
                execution excellence. We take charge of everything - from
                managing daily site operations to coordinating subcontractors,
                handling procurement, and maintaining safety and compliance
                protocols.
              </p>
            </motion.div>

            <motion.div
              className="backdrop-blur-md bg-black/40 rounded-2xl p-8 border border-white/10 relative group"
              whileHover={{ scale: 1.02, rotateY: -5 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-[#2A72F8]/20 to-[#8F44EC]/20"
                style={{
                  opacity: 0,
                  scale: 0.6,
                  transition: { duration: 0.6 },
                }}
                whileHover={{
                  opacity: 1,
                  scale: 1,
                }}
              />
              <p className="text-gray-300 leading-relaxed text-lg relative z-10">
                Our clients trust us for price-worthy construction solutions,
                proactive timelines, and strict quality control. Whether
                collaborating with architects or consultants, we ensure your
                vision is executed with precision and professionalism across all
                sectors - including Schools, Hospitals, and Industrial units.
              </p>
            </motion.div>
          </div>

          {/* Content Cards - Mobile with Auto-slide */}
          <div className="md:hidden w-full max-w-md mx-auto overflow-hidden">
            <motion.div className="relative h-[400px]">
              <AnimatePresence initial={false} mode="crossfade">
                <motion.div
                  key={currentCard}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <motion.div
                    className="relative group h-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#2A72F8]/20 to-[#8F44EC]/20 opacity-20 blur group-hover:opacity-30 transition duration-500"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <div className="relative h-full">
                      <motion.div className="backdrop-blur-sm bg-black/40 rounded-2xl p-6 border border-white/10 h-full flex items-center">
                        <p className="text-gray-300 leading-relaxed text-base">
                          {cards[currentCard].text}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[0, 1].map((index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentCard === index ? "w-6 bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </motion.section>
  );
};
