import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { RiShieldLine, RiSpeedLine, RiHeartLine, RiUserSmileLine } from "react-icons/ri";

const values = [
  {
    id: 'efficiency',
    icon: <RiSpeedLine className="text-4xl" />,
    title: "Efficiency",
    description: "Our solutions are designed to maximize productivity, minimizing waste and delivering results quickly and effectively."
  },
  {
    id: 'transparency',
    icon: <RiShieldLine className="text-4xl" />,
    title: "Transparency",
    description: "We believe in open communication and clear processes, ensuring trust and accountability in everything we do."
  },
  {
    id: 'respect',
    icon: <RiUserSmileLine className="text-4xl" />,
    title: "Respect",
    description: "We value our clients and partners, fostering relationships built on mutual respect and appreciation."
  },
  {
    id: 'passion',
    icon: <RiHeartLine className="text-4xl" />,
    title: "Passion",
    description: "Driven by a deep commitment to excellence, we put our heart into every project to ensure success."
  }
];

const OurValues = ({ onLoad }) => {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/background.avif';
    img.onload = () => {
      console.log('OurValues background loaded');
      setBgLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      console.log('OurValues background failed to load');
      setBgLoaded(true);
      onLoad?.();
    };
  }, [onLoad]);
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
          <p className="text-gray-200 max-w-2xl mx-auto">
            We love what we do and have a lot of fun at work, but we're also deeply committed to delivering exceptional results.
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
            disableOnInteraction: false
          }}
          breakpoints={{
            768: {
              slidesPerView: 2
            },
            1024: {
              slidesPerView: 4
            }
          }}
        >
          {values.map((value, index) => (
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
      </div>
    </section>
  );
};

export default OurValues;
