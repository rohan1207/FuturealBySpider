import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const menuItems = [
  { name: "Who We Are", path: "/whoweare" },
  { name: "What We Do", path: "/design-build" },
  { name: "About US", path: "/about" },
];

const rightLinks = [
  { name: "Newsletter", path: "/newsletter" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black z-20 sticky top-0 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Link to="/home">
                <img
                  src="/FLogo.png"
                  alt="Logo"
                  className="h-10 md:h-11 w-auto object-contain transition-all duration-300"
                />
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-white text-base font-medium ml-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] relative group"
              >
                {item.name}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-6 ml-auto text-white text-sm font-medium">
            {rightLinks.map((item, index) => (
              <Link key={index} to={item.path} className="hover:text-[#8F44EC] transition-colors">
                {item.name}
              </Link>
            ))}
            <motion.button
              className="bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] text-white px-5 py-2 rounded-full text-sm font-medium hover:from-[#1E5FD8] hover:to-[#7D3AD8] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact-us">Get in Touch</Link>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 bg-black bg-opacity-95 backdrop-blur-sm z-40 flex flex-col px-6 py-6"
    >
      {/* Logo and Close Button */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/home" onClick={() => setIsOpen(false)}>
          <img
            src="/newlogo.png"
            alt="Logo"
            className="h-10 object-contain"
          />
        </Link>
        <button onClick={() => setIsOpen(false)} className="text-white">
          <XIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col items-start gap-5">
        {[...menuItems, ...rightLinks].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className="text-white text-lg font-medium hover:text-[#8F44EC] transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>

    

      {/* Optional: Search */}
      <div className="mt-auto pt-10">
  
         {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] text-white px-6 py-3 rounded-full font-semibold text-base w-full text-center"
        onClick={() => setIsOpen(false)}
      >
        <Link to="/contact-us">Get in Touch</Link>
      </motion.button>
      
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </header>
  );
};

export default Navbar;
