import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { 
  UserCheck, 
  LineChart, 
  Wrench, 
  Briefcase, 
  Settings,
  PenTool,
  Home,
  Ruler,
  PaintBucket,
  Compass,
  Hammer,
  HardHat,
  Lightbulb,
  Scale,
  Building,
  Trello,
  Layers,
  Truck,
  Pencil
} from 'lucide-react';

const benefits = [
  {
    title: 'Increased Customer Satisfaction',
    icon: <UserCheck className="text-white" size={20} />,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    shortDesc: 'Improved client experience and loyalty',
    iconPos: 'top-[-85px] left-[112px]',
    textPos: 'top-[-90px] left-[168px]'
  },
  {
    title: 'Increased Revenue',
    icon: <LineChart className="text-white" size={20} />,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    shortDesc: 'Better profit margins and growth',
    iconPos: 'top-[0px] left-[243px]',
    textPos: 'top-[1px] left-[304px]'
  },
  {
    title: 'Upgradation of Resource Skills',
    icon: <Wrench className="text-white" size={20} />,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    shortDesc: 'Enhanced team capabilities',
    iconPos: 'top-[113px] left-[272px]',
    textPos: 'top-[116px] left-[326px]'
  },
  {
    title: 'Enhanced Portfolio',
    icon: <Briefcase className="text-white" size={20} />,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    shortDesc: 'Stronger project showcase',
    iconPos: 'bottom-[-30px] left-[239px]',
    textPos: 'bottom-[-57px] left-[301px]'
  },
  {
    title: 'Increase Efficiency',
    icon: <Settings className="text-white" size={20} />,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    shortDesc: 'Optimized workflows and processes',
    iconPos: 'bottom-[-97px] left-[120px]',
    textPos: 'bottom-[-127px] left-[170px]'
  }
];
// Background icons for the pattern
const backgroundIcons = [
  { Icon: PenTool, position: "top-[10%] left-[5%]", size: 26, rotation: 15, opacity: 0.1 },
  { Icon: Home, position: "top-[20%] left-[15%]", size: 34, rotation: -10, opacity: 0.15 },
  { Icon: Ruler, position: "top-[30%] right-[10%]", size: 30, rotation: 45, opacity: 0.12 },
  { Icon: PaintBucket, position: "bottom-[15%] left-[25%]", size: 28, rotation: -20, opacity: 0.1 },
  { Icon: Compass, position: "top-[50%] right-[20%]", size: 32, rotation: 30, opacity: 0.14 },
  { Icon: Hammer, position: "bottom-[30%] right-[15%]", size: 26, rotation: -15, opacity: 0.12 },
  { Icon: Lightbulb, position: "top-[15%] left-[40%]", size: 30, rotation: 0, opacity: 0.1 },
  { Icon: Scale, position: "bottom-[40%] left-[10%]", size: 28, rotation: 25, opacity: 0.15 },
  { Icon: Building, position: "top-[40%] left-[25%]", size: 36, rotation: 5, opacity: 0.09 },
  { Icon: Trello, position: "bottom-[20%] right-[30%]", size: 30, rotation: -5, opacity: 0.11 },
  { Icon: Layers, position: "top-[25%] right-[35%]", size: 32, rotation: 15, opacity: 0.13 },
  { Icon: Truck, position: "bottom-[25%] left-[35%]", size: 28, rotation: -10, opacity: 0.1 },
  { Icon: Pencil, position: "bottom-[10%] right-[5%]", size: 26, rotation: 20, opacity: 0.14 },
];

export default function ProjectBenefits({ onLoad }) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      onLoad?.();
    }
  }, [inView, onLoad]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div className="py-20 relative overflow-hidden" ref={containerRef}>
      {/* Background with whitish gradient and scattered icons */}
      <div className="absolute inset-0 z-0">
        {/* Scattered icons with parallax effect */}
        {backgroundIcons.map((IconItem, index) => (
          <motion.div 
            key={index} 
            className={`absolute ${IconItem.position} hidden md:block`}
            style={{
              opacity: IconItem.opacity,
              rotate: IconItem.rotation
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: IconItem.opacity } : {}}
            transition={{ 
              duration: 1.2, 
              delay: 0.2 + (index * 0.05),
              ease: "easeOut" 
            }}
          >
            <IconItem.Icon size={IconItem.size} className="text-black" />
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10">
        {/* Title with staggered character reveal */}
        <motion.div
          className="overflow-hidden text-center mb-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-black inline-block"
            initial={{ y: 60 }}
            animate={inView ? { y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            Our IPD Model
          </motion.h2>
        </motion.div>

        {/* Subtitle with delayed fade in */}
        <motion.div
          className="overflow-hidden text-center mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.p
            className="text-center text-gray-900 text-sm md:text-base"
            initial={{ y: 30 }}
            animate={inView ? { y: 0 } : {}}
            transition={{ 
              duration: 0.7, 
              delay: 0.2,
              ease: "easeOut" 
            }}
          >
            Discover the benefits of Futureal's Integrated Project Delivery system
          </motion.p>
        </motion.div>

        {/* Desktop layout with parallax effects */}
        <div className="hidden md:flex justify-center items-center relative">
          <div className="relative w-[226px] h-[222px] rounded-full bg-gray-200 shadow-xl flex items-center justify-center mr-[17%] mt-[100px] mb-[83px]">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: "easeOut" 
              }}
            >
              <motion.img
                src="logo.png"
                alt="Logo"
                className="mx-auto"
                initial={{ y: 15 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ 
                  duration: 1,
                  delay: 0.5,
                  ease: "easeOut" 
                }}
              />
              <motion.h2
                className="text-gray-700 font-semibold mt-2"
                initial={{ y: 10, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6,
                  ease: "easeOut" 
                }}
              >
                Futureal IPD Benefits
              </motion.h2>
            </motion.div>

            {/* Benefit icons with staggered pop-in effect */}
            {benefits.map((benefit, index) => {
              // Calculate custom parallax values for each icon
              const yOffset = useTransform(
                scrollYProgress, 
                [0, 1], 
                [index % 2 === 0 ? 15 : -15, index % 2 === 0 ? -15 : 15]
              );
              
              return (
                <motion.div
                  key={index}
                  className={`absolute ${benefit.iconPos} bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] w-[41px] h-[39px] p-[4px] rounded-full flex items-center justify-center shadow-md`}
                  style={{ y: yOffset }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.3 + (0.15 * index),
                    ease: "easeOut" 
                  }}
                >
                  {benefit.icon}
                </motion.div>
              );
            })}

            {/* Benefit text with slide up reveal */}
            {benefits.map((benefit, index) => {
              // Custom parallax values for text 
              const yOffset = useTransform(
                scrollYProgress, 
                [0, 1], 
                [index % 2 === 0 ? 10 : -5, index % 2 === 0 ? -5 : 10]
              );
              
              return (
                <motion.div
                  key={`text-${index}`}
                  className={`absolute ${benefit.textPos} w-[350px]`}
                  style={{ y: yOffset }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5 + (0.15 * index),
                    ease: "easeOut" 
                  }}
                >
                  <motion.h3 
                    className="font-bold text-md text-gray-900"
                    initial={{ y: 15 }}
                    animate={inView ? { y: 0 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.6 + (0.15 * index),
                      ease: "easeOut" 
                    }}
                  >
                    {benefit.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-black"
                    initial={{ y: 10, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.7 + (0.15 * index),
                      ease: "easeOut" 
                    }}
                  >
                    {benefit.desc}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile layout - keep unchanged as you mentioned */}
        <div className="md:hidden px-4">
          <div className="flex flex-col gap-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="flex items-center p-3">
                  <div className="bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] w-10 h-10 rounded-full flex items-center justify-center shadow-md mr-3 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{benefit.title}</h3>
                    <p className="text-xs text-gray-600">{benefit.shortDesc}</p>
                  </div>
                </div>
                <motion.div 
                  className="h-1 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC]" 
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ delay: 0.2 + (0.1 * index), duration: 0.7 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}