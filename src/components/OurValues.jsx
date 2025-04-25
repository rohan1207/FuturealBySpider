import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import {
  RiShieldLine,
  RiSpeedLine,
  RiHeartLine,
  RiUserSmileLine,
} from "react-icons/ri";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const values = [
  {
    id: "efficiency",
    icon: <RiSpeedLine className="text-4xl" />,
    title: "Efficiency",
    description:
      "Our solutions are designed to maximize productivity, minimizing waste and delivering results quickly and effectively.",
  },
  {
    id: "transparency",
    icon: <RiShieldLine className="text-4xl" />,
    title: "Transparency",
    description:
      "We believe in open communication and clear processes, ensuring trust and accountability in everything we do.",
  },
  {
    id: "respect",
    icon: <RiUserSmileLine className="text-4xl" />,
    title: "Respect",
    description:
      "We value our clients and partners, fostering relationships built on mutual respect and appreciation.",
  },
  {
    id: "passion",
    icon: <RiHeartLine className="text-4xl" />,
    title: "Passion",
    description:
      "Driven by a deep commitment to excellence, we put our heart into every project to ensure success.",
  },
];

const OurValues = ({ onLoad }) => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    const img = new Image();
    img.src = "/background.avif";
    img.onload = () => {
      setBgLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setBgLoaded(true);
      onLoad?.();
    };
  }, [onLoad]);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section className="relative py-20 px-6">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/background.avif"
          alt="Background"
          onLoad={() => setBgLoaded(true)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            The Values that Drive Everything We Do
          </h2>
          <p className="font-large text-gray-200 max-w-4xl mx-auto">
            Rooted in principles, focused on outcomes
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {values.map((value) => (
            <SwiperSlide key={value.id}>
              <div className="group p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 h-[260px]">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-gradient-to-r from-[#2A72F8]/20 to-[#8F44EC]/20 flex items-center justify-center transition-colors duration-300">
                    <div className="text-white group-hover:text-[#2A72F8]">
                      {value.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Quote Card */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
          className="mt-16 mx-auto max-w-4xl text-center bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
        >
          <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
            <span className="text-white/90">
              “At <span className="font-semibold text-[#2A72F8]">Futureal</span>, our work is guided by values that ensure consistency, quality, and integrity. We champion <span className="italic">innovation</span>, <span className="italic">transparency</span>, <span className="italic">collaboration</span>, and <span className="italic">accountability</span> — principles that shape how we work with clients, partners, and each other, ensuring every space we touch reflects purpose and professionalism.”
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurValues;
