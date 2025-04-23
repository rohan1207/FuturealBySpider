import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";

const cards = [
  {
    id: 'integration',
    title: "End-to-End Integration",
    description:
      "We act as your single point of responsibility, eliminating fragmentation across the project value chain. Our approach allows clients to focus on their core business while we manage all the development."
  },
  {
    id: 'sustainability',
    title: "Sustainability-Driven Solutions",
    description:
      "Our focus on sustainable design ensures your project meets environmental benchmarks while maximizing functionality and appeal."
  },
  {
    id: 'agile',
    title: "Agile & Lean Practices",
    description:
      "Incorporating principles of Lean Management, our approach minimizes waste and maximizes efficiency, ensuring projects are delivered on time and within budget."
  },
  {
    id: 'expertise',
    title: "Expertise at Every Level",
    description:
      "Our team comprises seasoned professionals with international and local expertise, ensuring innovative solutions tailored to market-specific demands."
  }
];

export default function IPDValueCreation({ onLoad }) {
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(-1);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Since this component doesn't have actual images to load,
    // we'll simulate a short load time for the animations
    const timer = setTimeout(() => {
      setImagesLoaded(true);
      onLoad?.();
    }, 300);

    return () => clearTimeout(timer);
  }, [onLoad]);

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === cards.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const variants = {
    enter: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? "-100%" : "100%",
      opacity: 0
    })
  };

  return (
    <div className="relative w-full min-h-[90vh] py-20 px-4 bg-gradient-to-br from-[#1f2937] via-[#111827] to-[#1f2937] text-white overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16 drop-shadow-xl">
        Value Creation Through IPD
      </h2>

      {!isMobile && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="relative w-full max-w-xs h-60 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-3 text-center">
                {card.title}
              </h3>
              <p className="text-sm text-center text-gray-200">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {isMobile && (
        <div className="relative w-full overflow-hidden h-72">
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                whileHover={{ scale: 1.03 }}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute max-w-xs w-4/5 h-60 p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20"
              >
                <h3 className="text-lg font-semibold mb-3 text-center">
                  {cards[activeIndex].title}
                </h3>
                <p className="text-sm text-center text-gray-200">
                  {cards[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-2">
            {cards.map((_, index) => (
              <button
                key={card.id}
                className={`w-2 h-2 rounded-full ${
                  activeIndex === index ? "bg-white" : "bg-white bg-opacity-30"
                } focus:outline-none`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
