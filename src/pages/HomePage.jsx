import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhoAreWe from '../components/WhoAreWe'
import OurValues from '../components/OurValues'
import OurProcess from '../components/OurProcess'
import Footer from '../components/Footer'



export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutOccurred, setTimeoutOccurred] = useState(false);
  const [componentLoaded, setComponentLoaded] = useState({
    hero: false,
    whoAreWe: false,
    ourValues: false,
    ourProcess: false
  });

  // Effect for checking loaded components
  useEffect(() => {
    const allLoaded = Object.values(componentLoaded).every(loaded => loaded);
    console.log('Component load status:', componentLoaded);
    if (allLoaded || timeoutOccurred) {
      console.log('All components loaded or timeout occurred');
      setIsLoading(false);
    }
  }, [componentLoaded, timeoutOccurred]);

  // Effect for timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Loading timeout occurred');
      setTimeoutOccurred(true);
    }, 5000); // 5 second timeout

    return () => clearTimeout(timer);
  }, []);

  const handleComponentLoad = (component) => {
    console.log(`Component loaded: ${component}`);
    setComponentLoaded(prev => ({
      ...prev,
      [component]: true
    }));
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                 style={{ borderImage: 'linear-gradient(to right, #2A72F8, #8F44EC) 1' }} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Hero onLoad={() => handleComponentLoad('hero')} />
      <OurValues onLoad={() => handleComponentLoad('ourValues')} />
      <WhoAreWe onLoad={() => handleComponentLoad('whoAreWe')} />
      
      <OurProcess onLoad={() => handleComponentLoad('ourProcess')} />
    </>
  )
}
