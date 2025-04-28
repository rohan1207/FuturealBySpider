import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useScroll,
} from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import WhatWeDoHero from "../components/WhatWeDoHero";
import WhyChooseUs from "../components/WhyChooseUs";
import { DesignandBuild } from "../components/DesignandBuild";
import { GeneralContracting } from "../components/GeneralContracting";

const WhatWeDo = ({ onLoad }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [resourcesLoaded, setResourcesLoaded] = useState({
    video: false,
    images: new Set(),
  });
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const containerRef = useRef(null);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        controls.start("visible");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, controls]);

  // Effect to track resource loading
  useEffect(() => {
    const allImagesLoaded = sectors.every((sector) =>
      resourcesLoaded.images.has(sector.img)
    );
    const allResourcesLoaded = allImagesLoaded && resourcesLoaded.video;

    if (allResourcesLoaded) {
      setIsLoading(false);
      onLoad?.();
    }
  }, [resourcesLoaded, onLoad]);

  // Handle video load
  const handleVideoLoad = () => {
    setResourcesLoaded((prev) => ({
      ...prev,
      video: true,
    }));
  };

  // Handle image preloading
  const handleImageLoad = (imagePath) => {
    setResourcesLoaded((prev) => ({
      ...prev,
      images: new Set([...prev.images, imagePath]),
    }));
  };

  // Preload all sector images
  useEffect(() => {
    sectors.forEach((sector) => {
      const img = new Image();
      img.src = sector.img;
      img.onload = () => handleImageLoad(sector.img);
      img.onerror = () => handleImageLoad(sector.img); // Count errors as loaded to prevent hanging
    });
  }, []);

  // Memoize sectors data to prevent unnecessary re-renders
  const sectors = useMemo(
    () => [
      { title: "Offices", img: "/image9.jpg" },
      { title: "Healthcare", img: "/pic5.jpg" },
      { title: "Industrial Spaces", img: "/shop.webp" },
    ],
    []
  );

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Optimize slide effects with useCallback
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sectors.length);
  }, [sectors.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + sectors.length) % sectors.length
    );
  }, [sectors.length]);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Animation variants with optimized timing and easing
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.0,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const approachVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const approachContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <>
      <WhatWeDoHero />

      {/* DESIGN AND BUILD + OUR APPROACH */}
      <DesignandBuild />

      {/* SECTORS WE SERVE */}
      <motion.div
        className="relative min-h-screen bg-black/95 overflow-hidden py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {/* Background with parallax effect */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/pic3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1.2 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black z-0" />
        <GeneralContracting/>
        <div className="relative z-10 container mx-auto px-4">
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <motion.h2
              className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              SECTORS WE SERVE
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </motion.div>

          {/* Mobile: Enhanced Carousel */}
          <div className="md:hidden w-full px-4">
            <motion.div
              className="relative overflow-hidden rounded-2xl aspect-[3/4]"
              variants={fadeIn}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={sectors[currentIndex].img}
                    alt={sectors[currentIndex].title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <motion.div
                    className="absolute bottom-0 w-full p-6 text-white"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-light mb-2">
                      {sectors[currentIndex].title}
                    </h3>
                    <p className="text-sm text-gray-300 opacity-90">
                      Discover our expertise in creating innovative spaces
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Enhanced Navigation Controls */}
              <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 pointer-events-none">
                <motion.button
                  className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center pointer-events-auto"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSlide}
                >
                  <ChevronDown className="w-6 h-6 rotate-90" />
                </motion.button>
                <motion.button
                  className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center pointer-events-auto"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSlide}
                >
                  <ChevronDown className="w-6 h-6 -rotate-90" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Desktop: Enhanced Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900"
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={sector.img}
                    alt={sector.title}
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-500">
                  <motion.h3
                    className="text-2xl font-light text-white mb-4 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {sector.title}
                    <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] transition-all duration-500" />
                  </motion.h3>

                  <motion.p className="text-gray-300 text-sm opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore our innovative solutions and expertise in creating
                    exceptional spaces that define the future.
                  </motion.p>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur"
                  style={{ zIndex: -1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* WHY CHOOSE US */}
      <WhyChooseUs />
    </>
  );
};

export default React.memo(WhatWeDo);
