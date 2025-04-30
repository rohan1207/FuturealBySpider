import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Eye, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function VisonandMission({ onLoad }) {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    
    "/school3.jpg",
    "/school4.jpeg",
    "/school5.jpg",
    "/office1.jpg",
    "/office2.jpg",
    "/office5.jpg",
    "/office6.jpg",
    "/office7.jpg",
    "/hospital1.jpg",
    "/hospital2.jpg",
    "/hospital3.jpg",
    "/hospital4.jpg",
   
  ];

  const cards = [
    {
      icon: <Eye className="text-white" size={20} />,
      title: "Vision",
      description:
        "To revolutionize turnkey project delivery by setting new standards in Design & Build and General Contracting services. We envision a future where every project is delivered with unparalleled innovation, meticulous precision, and a deep sense of empathy, ensuring that each space we create offers exceptional experiences and lasting value. Through our integrated approach, we aim to transform the project delivery landscape, building enduring partnerships with clients who trust us to bring their visions to life with excellence",
    },
    {
      icon: <Target className="text-white" size={20} />,
      title: "Mission",
      description:
        "Our mission is to deliver seamless, service-driven turnkey solutions that consistently exceed expectations through our expertise in Design & Build and General Contracting. We are committed to creating exceptional value for our clients by optimizing returns on investment, enhancing project efficiencies, and pioneering innovations in quality, craftsmanship, and sustainability. By maintaining the highest industry standards and fostering a culture of collaboration, transparency, and continuous improvement, we strive to set new benchmarks in every project we undertake, leaving a legacy of trust, quality, and innovation.",
    },
  ];

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      console.log('WhoAreWe: Starting to preload images');
      images.forEach((imagePath) => {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
          console.log(`WhoAreWe: Image loaded - ${imagePath}`);
          setImagesLoaded(prev => {
            const newCount = prev + 1;
            if (newCount === images.length) {
              console.log('WhoAreWe: All images loaded');
              onLoad?.();
            }
            return newCount;
          });
        };
        img.onerror = () => {
          console.log(`WhoAreWe: Image failed to load - ${imagePath}`);
          setImagesLoaded(prev => {
            const newCount = prev + 1;
            if (newCount === images.length) {
              console.log('WhoAreWe: All images processed (including errors)');
              onLoad?.();
            }
            return newCount;
          });
        };
      });
    };
    preloadImages();
  }, [onLoad, images]);

  // Combined slide interval - syncs both images and cards
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the maximum number of unique slides needed
      const totalItems = Math.max(images.length, cards.length);
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get the current card and image based on active index
  const currentCard = activeIndex % cards.length;
  const currentImage = activeIndex % images.length;

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-16 overflow-hidden min-h-screen flex items-center">
      {/* Background image carousel */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence>
          {images.map((image, index) => (
            currentImage === index && (
              <motion.div
                key={image}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${image})`,
                    filter: "brightness(0.5)", // Darker overlay for better contrast
                  }}
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-indigo-900/50 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">

        {/* Desktop layout (2x2 grid) */}
        <div className="mt-12 hidden md:grid grid-cols-2 gap-6 max-w-[80rem] mx-auto">

          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 flex flex-col items-center text-center hover:bg-white hover:scale-105 transition-all duration-300"
            >
              <div className="w-10 h-10 mb-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
              <p className="text-gray-600 text-center text-[1.2rem]">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile swiper layout */}
        <div className="mt-6 md:hidden relative">
          <div className="overflow-hidden px-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentCard * 100}%)` }}
            >
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="min-w-full px-2"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
                    <div className="w-10 h-10 mb-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                    <p className="text-gray-600 text-xs">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Single set of navigation dots for both mobile and desktop */}
        <div className="flex justify-center mt-6 gap-1">
          {/* Show dots based on the max number of either images or cards */}
          {Array.from({ length: Math.max(images.length, cards.length) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex % Math.max(images.length, cards.length) === index ? "bg-white scale-125" : "bg-white/40"
              }`}
              aria-label={`View slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Glass effect Read More button */}
        <div className="flex justify-center mt-8">
          <Link 
            to="/whoweare" 
            className="relative px-6 py-2.5 group"
          >
          </Link>
        </div>
      </div>
    </section>
  );
}