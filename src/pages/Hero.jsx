import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, controls]);

  // Memoize sectors data to prevent unnecessary re-renders
  const sectors = useMemo(() => [
    { title: 'Offices', img: '/image9.jpg' },
    { title: 'Healthcare', img: '/pic5.jpg' },
    { title: 'Industrial Spaces', img: '/shop.webp' }
  ], []);

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
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sectors.length) % sectors.length);
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
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 1.1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 1.0,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const approachVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const approachContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <div className='w-full' role="main" aria-label="Hero section" ref={containerRef}>
      {/* Hero Section */}
      <motion.div
        className='relative w-full h-[100vh]'
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <motion.video
          src='/bgv.mp4' 
          alt='Hero Background' 
          className='h-full w-full object-cover'
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          loading="eager"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 1.5,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
        />
        <div className='absolute inset-0 bg-black/50' aria-hidden="true"></div>

        {/* Content */}
        <motion.div 
          className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 pb-[200px] sm:pb-[370px] z-10'
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className='mt-[160px] text-white text-4xl sm:text-3xl md:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 drop-shadow-xl relative z-20'
            variants={fadeInUp}
          >
            What We Do
          </motion.h1>
          <motion.p 
            className='text-white text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed px-4 sm:px-0 relative z-20 text-justify'
            variants={fadeInUp}
          >
            At Futureal, our Design & Build approach offers a seamless solution for clients seeking an end-to-end construction experience. We integrate design, planning, and execution into a single streamlined process.
          </motion.p>
        </motion.div>

        {/* Scroll Icon */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 text-white"
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          role="button"
          aria-label="Scroll down"
        >
          <ChevronDown size={36} strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      {/* DESIGN AND BUILD + OUR APPROACH */}
      <motion.div
        className='relative'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div
          style={{
            backgroundImage: "url('/image3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className='relative'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ 
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
        >
          <div className='absolute inset-0 bg-black/70' aria-hidden="true"></div>

          <div className='relative z-10 py-20'>
            <motion.h2
              className='text-4xl md:text-5xl text-white font-bold text-center mb-10'
              variants={slideInLeft}
            >
              DESIGN AND BUILD
            </motion.h2>
            <motion.p
              className='max-w-4xl mx-auto text-lg md:text-xl text-white text-center px-6 mb-16 text-justify'
              variants={slideInRight}
            >
              Our Design & Build approach offers a seamless solution for clients seeking an end-to-end construction experience. We integrate design, planning, and execution into a single streamlined process.
            </motion.p>

            <motion.h2
              className='text-4xl text-white font-bold text-center mb-10'
              variants={slideInLeft}
            >
              OUR APPROACH
            </motion.h2>
            <motion.div 
              className='max-w-5xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6'
              variants={approachContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                "We closely collaborate to understand each client's vision.",
                "We build with precision, creativity, and innovation.",
                "We follow all standards to ensure safety and quality.",
                "We create functional and visually striking spaces."
              ].map((text, index) => (
                <motion.div
                  key={index}
                  className='bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white rounded-xl p-3 sm:p-4 flex items-start gap-3 sm:gap-4 shadow-md hover:shadow-lg transition'
                  variants={approachVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    variants={iconVariants}
                    className="flex-shrink-0"
                  >
                    <FaCheckCircle className="text-white text-xl sm:text-2xl mt-1" aria-hidden="true" />
                  </motion.div>
                  <motion.p 
                    className='text-white text-sm sm:text-lg'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                  >
                    {text}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* SECTORS WE SERVE */}
      <motion.div
        className='relative py-16 bg-gray-900'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.img
          src='/pic3.jpg'
          alt='Background'
          className='absolute inset-0 w-full h-full object-cover object-center z-0 opacity-60'
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ 
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
        />

        <div className='relative z-10'>
          <motion.h2 
            className='text-3xl md:text-4xl text-white font-bold text-center mb-8'
            variants={slideInLeft}
          >
            SECTORS WE SERVE
          </motion.h2>

          {/* Mobile: Carousel */}
          <div className='md:hidden w-full px-4'>
            <motion.div 
              className='relative overflow-hidden rounded-xl h-[300px]'
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <motion.div
                className='w-full h-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={sectors[currentIndex].img}
                  alt={sectors[currentIndex].title}
                  className='w-full h-full object-cover object-center'
                  loading="lazy"
                  decoding="async"
                />
                <div className='absolute inset-0 bg-black/20'></div>
                <div className='absolute bottom-0 w-full py-4 text-white text-center'>
                  <h3 className='text-xl font-semibold mb-2'>{sectors[currentIndex].title}</h3>
                </div>
              </motion.div>
              
              {/* Navigation Arrows */}
              <button
                className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 text-white p-2 rounded-full'
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 text-white p-2 rounded-full'
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Carousel Indicators */}
              <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                {sectors.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Desktop: Grid */}
          <div className='hidden md:flex justify-evenly w-full px-6 gap-6'>
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                className='relative w-[400px] h-[300px] rounded-xl overflow-hidden border border-gray-700 shadow-md hover:shadow-lg bg-gray-800'
                whileHover={{ scale: 1.03 }}
                variants={fadeInUp}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
              >
                <img
                  src={sector.img}
                  alt={sector.title}
                  className='w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110'
                  loading="lazy"
                  decoding="async"
                />
                <div className='absolute inset-0 bg-black/20'></div>
                <div className='absolute bottom-0 w-full py-3 text-white text-center text-xl font-semibold'>
                  {sector.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* WHY CHOOSE US */}
      <motion.div
        className='bg-gradient-to-r from-black via-gray-800 to-black py-16'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className='max-w-4xl mx-auto px-6 text-center'>
          <motion.h2 
            className='text-4xl md:text-5xl text-white font-bold mb-6'
            variants={slideInLeft}
          >
            Why Choose Us
          </motion.h2>
          <motion.p 
            className='text-lg md:text-xl text-white mb-8'
            variants={slideInRight}
          >
            We are committed to delivering quality, innovative, and sustainable solutions that exceed client expectations. Our team of experts ensures that every project is executed with precision and care.
          </motion.p>
          <motion.button
            className='bg-white text-black py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition duration-300'
            whileHover={{ scale: 1.05 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
            variants={fadeInUp}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(Hero);

