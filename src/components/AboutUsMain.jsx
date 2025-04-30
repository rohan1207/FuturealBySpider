import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const AboutUsMain = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div
      ref={sectionRef}
      className="bg-[#f8f8f8] min-h-screen relative overflow-hidden py-20"
    >
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Founder Section */}
        <motion.div
          className="max-w-6xl mx-auto mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Founder Image - Smaller and closer to text */}
            <motion.div
              className="md:col-span-4 relative max-w-[240px] mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/Founder.png"
                  alt="Founder"
                  className="w-full h-auto aspect-[3/4] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Founder Info - Adjusted spacing and grid position */}
            <motion.div
              className="md:col-span-8 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">
                  Our Founder
                </h2>
                <div className="h-0.5 w-16 bg-gray-900 mb-6" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                A 3x founder with 22 years of experience in Project Management,
                Real Estate Development, Private Equity Investments &
                Entrepreneurship. Abhishek has managed multiple projects working
                with companies like Bovis Lend Lease, OTZ, Ochziff & ABIL to
                name a few SAP labs compuses, Philips Software, Metro Cash &
                Carry, Coca-Cola, Honeywell, West In Hotel, W Resort & multiple
                luxury residential developments.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Abhishek has been an entrepreneur for the last 10 years building
                businesses in the interior fit-out space and coliving (under
                Covie). Abhishek holds a civil engineering degree with a
                post-graduation in construction management from XIME Bangalore.
                He has also done his executive management program at IIM
                Colrutto & Ivey League Cornell University.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {[
              { number: "50+", label: "Years of Collective Experience" },
              { number: "15+", label: "Clients" },
              { number: "10,00,000+", label: "Sq.ft.delivered" },
              { number: "50+", label: "Project Completed" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-lg"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.h3
                  className="text-4xl md:text-5xl font-light text-gray-900 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                >
                  {stat.number}
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index + 0.2 }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsMain;
