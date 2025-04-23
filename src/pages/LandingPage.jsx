import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Only start navigation timer when all assets are loaded
    if (!isLoading) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [navigate, isLoading]);

  useEffect(() => {
    // Set loading to false when all assets are loaded
    if (bgLoaded && logoLoaded) {
      setIsLoading(false);
    }
  }, [bgLoaded, logoLoaded]);

  return (
    <div className="relative min-h-screen">
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
      {/* Background Image with Overlay */}
      <img
        src="./bg.jpg"
        onLoad={() => setBgLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
        alt="background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"/>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] rounded-full blur-2xl opacity-30 animate-pulse" />
              <img
                src="./footer_logo.png"
                alt="Logo"
                onLoad={() => setLogoLoaded(true)}
                className="mx-auto h-40 w-40 md:h-48 md:w-48 object-contain relative z-10 drop-shadow-lg"
              />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.3,
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] bg-clip-text text-transparent">
                Transforming Spaces
              </span>
              <br />
              <span className="text-white">with Art & Elegance</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.5,
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Creating timeless interiors that reflect your unique style and personality
            </motion.p>
          </motion.div>
        </div>
      </div>
      </AnimatePresence>
    </div>
  );
}
