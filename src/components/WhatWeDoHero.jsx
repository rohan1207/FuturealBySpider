import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView
} from "framer-motion";
import { Link } from "react-router-dom";

const images = [
  { src: "./image1.jpg", title: "Civil & Interior Works", category: "construction" },
  { src: "./image7.jpg", title: "Turnkey D&B", category: "development" },
  { src: "./image3.jpg", title: "General Contracting", category: "construction" },
  { src: "./image8.jpg", title: "Civil & Interior Works", category: "interior" },
  { src: "./image9.jpg", title: "Turnkey D&B", category: "development" },
  { src: "./image10.jpg", title: "General Contracting", category: "construction" },
  { src: "./img6.webp", title: "General Contracting", category: "construction" },
  { src: "./pic1.jpg", title: "Turnkey D&B", category: "commercial" },
  { src: "./pic2.jpg", title: "Civil & Interior Works", category: "residential" },
  { src: "./pic3.jpg", title: "Turnkey D&B", category: "commercial" },
  { src: "./pic4.jpg", title: "Civil & Interior Works", category: "residential" },
  { src: "./pic5.jpg", title: "Turnkey D&B", category: "commercial" },
  { src: "./realestate.jpg", title: "Civil & Interior Works", category: "residential" }
];

const WhatWeDoHero = ({ onLoad }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef();
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    const preloadImages = () => {
      let loadedCount = 0;
      const totalImages = images.length;
      images.forEach((image, index) => {
        const img = new Image();
        img.src = image.src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
            onLoad?.();
          }
        };
        img.onerror = () => {
          setImageErrors((prev) => new Set([...prev, index]));
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
            onLoad?.();
          }
        };
      });
    };
    preloadImages();
  }, [onLoad]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }
    },
    exit: (direction) => ({ x: direction > 0 ? -1000 : 1000, opacity: 0, transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } } })
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      // Add a small delay before closing to allow user to move to dropdown items
      setTimeout(() => {
        // Only close if the mouse is not over the dropdown container
        if (dropdownRef.current && !dropdownRef.current.matches(':hover')) {
          setOpen(false);
        }
      }, 100);
    }
  };

  const handleButtonClick = () => {
    setOpen(prev => !prev);
  };

  return (
    <section className="w-full relative min-h-[90vh] flex flex-col items-center justify-center bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentImage}
            src={images[currentImage]?.src}
            alt={images[currentImage]?.title}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>

      <div className="relative z-10 px-4 md:px-10 text-white max-w-5xl w-full">
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
            What We Do<br />
              <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">Defining Experiences</span>
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 max-w-3xl mb-8"
          >
         We deliver designs that inspire, connect and perform.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="relative inline-block" 
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleButtonClick}
              className="px-6 py-2 bg-white/10 border border-white rounded-full hover:bg-gradient-to-r from-sky-500 to-purple-500 transition-all"
            >
              I'm interested in
            </button>
            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute mt-1 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50"
                >
                  {['Design & Build', 'General Contracting'].map((item, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        // Handle the selection
                        console.log(`Selected: ${item}`);
                        // Close the dropdown after selection
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
    </section>
  );
};

export default WhatWeDoHero;