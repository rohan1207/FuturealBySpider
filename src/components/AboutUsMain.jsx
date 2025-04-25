import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
const AboutUsMain = () => {
    return (
      <div className="bg-[#0f0f0f] text-white py-20 px-5 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold">Our Story</h2>
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            We bring your vision to life with creativity and technical excellence.
          </p>
        </motion.div>
  
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="/  .jpg"
            alt="Team Work"
            className="rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          />
  
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-md mb-4">
              Tempor commodo ullamcorper a lacus. Amet commodo nulla facilisi nullam. Molestie nunc non blandit massa enim nec. Felis bibendum ut tristique et egestas quis.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-red-500" />
                <span>10k+ Completed Projects</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-red-500" />
                <span>15k+ Satisfied Customers</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-red-500" />
                <span>10+ Years Of Mastery</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-red-500" />
                <span>45+ Worldwide Honors</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default AboutUsMain 
  