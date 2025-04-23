import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Route, ShieldCheck, Search, DollarSign, Calendar } from "lucide-react";

export default function WhyChooseUs({ onLoad }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  const services = [
    {
      icon: <Target size={24} />,
      title: "Single Point Responsibility",
      description: "Our single-point responsibility model means clients have a dedicated contact who oversees every project detail, fostering clear, consistent communication"
    },
    {
      icon: <Route size={24} />,
      title: "End-To-End Support",
      description: "From initial planning through to the project handover, our team provides comprehensive support, ensuring smooth execution"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Quality & Safety Assured",
      description: "We are committed to stringent quality control and safety standards, ensuring safe, durable, and sustainable project outcomes"
    },
    {
      icon: <Search size={24} />,
      title: "Simplified Project Oversight",
      description: "We handle all the project phases, allowing clients to focus on their core business without the hassle of daily project management"
    },
    {
      icon: <DollarSign size={24} />,
      title: "Maximized ROI",
      description: "Through strategic planning, cost optimization, and value engineering, we ensure clients get the most from their investment"
    },
    {
      icon: <Calendar size={24} />,
      title: "Customized Solutions",
      description: "Every project is tailored to align with the client's vision, needs and goals, creating spaces that resonate with their brand and values"
    }
  ];

  // Signal component is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentReady(true);
      onLoad?.();
    }, 200);
    return () => clearTimeout(timer);
  }, [onLoad]);

  // Check if screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Auto-rotate cards on timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length]);

  // Pause autoplay when user interacts
  const handleCardClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We deliver excellence through our comprehensive approach to project delivery,
            ensuring unparalleled results for our clients.
          </p>
        </motion.div>

        {/* Mobile carousel view */}
        <div className="md:hidden">
          <div className="relative pb-10">
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: `-${activeIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex"
              >
                {services.map((service, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-3">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className={`bg-white rounded-xl p-6 shadow-lg h-full border-t-4 ${
                        index === activeIndex ? "border-gradient-to-r from-[#2A72F8] to-[#8F44EC]" : "border-transparent"
                      }`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] rounded-full flex items-center justify-center text-white mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-blue-500 scale-125" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop grid view */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-md h-full border-t-4 border-transparent group-hover:border-blue-500 group-hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] rounded-full flex items-center justify-center text-white mb-4  transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
      
      </div>
    </section>
  );
}