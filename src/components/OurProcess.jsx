import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineCube,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

const steps = [
  {
    title: "Project Initiation",
    description:
      "Understanding the client's requirements and project parameters, to proceed with strategising the project",
    icon: HiOutlineCog,
    color: "#3B82F6",
  },
  {
    title: "Strategy Development",
    description:
      "We develop a holistic strategy leveraging our extensive experience and market research.",
    sub: "Feasibility >> Market Research >> Project Strategy",
    icon: HiOutlineChartBar,
    color: "#8B5CF6",
  },
  {
    title: "Implementation",
    description:
      "Implementing all the plans with the assured period and cost. Adhering to all the safety guidelines set by the client.",
    sub: "Construction Management >> Quality Control >> Time Management",
    icon: HiOutlineCube,
    color: "#EC4899",
  },
  {
    title: "Delivery & Beyond",
    description:
      "Transforming our client's vision into reality by maintaining a perfect balance of cost, time, and quality.",
    icon: HiOutlineClipboardCheck,
    color: "#10B981",
  },
];

const OurProcess = ({ onLoad }) => {
  const [bgLoaded, setBgLoaded] = useState(false);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = '/fbg.jpg';
    img.onload = () => {
      console.log('OurProcess background loaded');
      setBgLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      console.log('OurProcess background failed to load');
      setBgLoaded(true);
      onLoad?.();
    };
  }, [onLoad]);
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto advance steps after component is in view
  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          const nextStep = prev + 1;
          if (nextStep >= steps.length) {
            clearInterval(interval);
            return prev;
          }
          return nextStep;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, 400);

    return () => clearTimeout(timer);
  }, [isInView]);

  // Handle step selection
  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/fbg.jpg')",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Subtle gradient overlay instead of blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Process
          </h2>
          <p className="text-lg text-slate-800">
            Our proven methodology ensures successful project delivery from
            concept to completion
          </p>
        </div>

        {/* Process visualization */}
        <div
          className={`transition-all duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Desktop/Tablet layout */}
          <div className="hidden md:block relative">
            {/* Progress Line - FIXED: Set to lowest z-index */}
            <div className="absolute left-0 right-0 top-[77px] h-0.5 bg-slate-200/60 z-0">
              <div
                className="h-full transition-all duration-700 ease-out rounded-full"
                style={{
                  width: `${(activeStep / (steps.length - 1)) * 100}%`,
                  background:
                    "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 33%, #EC4899 66%, #10B981 100%)",
                }}
              ></div>
            </div>

            {/* Steps Container */}
            <div className="flex justify-between relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center px-4 pt-2 relative"
                  style={{
                    width: `${100 / steps.length}%`,
                    cursor: "pointer",
                  }}
                  onClick={() => handleStepClick(index)}
                >
                  {/* Step Number - Positioned to the left of the icon */}
                  <div
                    className={`absolute top-[12px] z-30 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                      index <= activeStep ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      color: "#fff",
                      backgroundColor: step.color,
                      left: "calc(50% - 30px)",
                      boxShadow: `0 2px 5px ${step.color}40`,
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Icon Circle - FIXED: Increased z-index to appear over line */}
                  <div
                    className={`w-[44px] h-[44px] mb-6 rounded-full flex items-center justify-center z-20 transition-all duration-500 ease-in-out ${
                      index <= activeStep
                        ? "scale-110 shadow-lg"
                        : "scale-90 bg-white/90 border border-slate-200/50"
                    }`}
                    style={{
                      backgroundColor:
                        index <= activeStep
                          ? step.color
                          : "rgba(255,255,255,0.9)",
                      boxShadow:
                        index <= activeStep
                          ? `0 10px 15px -3px ${step.color}40`
                          : "0 4px 6px rgba(0,0,0,0.05)",
                      transform: `scale(${
                        index === activeStep
                          ? 1.15
                          : index < activeStep
                          ? 1.05
                          : 0.9
                      })`,
                    }}
                  >
                    {React.createElement(step.icon, {
                      className: `w-5 h-5 transition-colors duration-300 ${
                        index <= activeStep ? "text-white" : "text-slate-500"
                      }`,
                    })}
                  </div>

                  {/* Content Card - FIXED: Ensure z-index is higher than the line */}
                  <div
                    className={`bg-white/80 backdrop-blur-sm rounded-xl p-5 transition-all duration-500 ease-in-out w-full z-10 ${
                      index <= activeStep
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-40"
                    }`}
                    style={{
                      borderColor:
                        index === activeStep
                          ? `${step.color}30`
                          : "rgba(241, 245, 249, 0.6)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      boxShadow:
                        index === activeStep
                          ? `0 8px 20px -5px ${step.color}20`
                          : "0 2px 10px rgba(0,0,0,0.03)",
                      transform:
                        index === activeStep
                          ? "translateY(-4px)"
                          : "translateY(0)",
                    }}
                  >
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{
                        color: index <= activeStep ? step.color : "#64748b",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-700 mb-1 line-clamp-3">
                      {step.description}
                    </p>
                    {step.sub && (
                      <p
                        className="text-xs font-medium mt-2 opacity-80"
                        style={{ color: step.color }}
                      >
                        {step.sub}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden">
            {/* Progress Line - FIXED: Set to lowest z-index */}
            <div className="absolute left-8 top-[220px] bottom-[100px] w-0.5 bg-slate-200/60 z-0">
              <div
                className="w-full transition-all duration-700 ease-out rounded-full"
                style={{
                  height: `${(activeStep / (steps.length - 1)) * 100}%`,
                  background:
                    "linear-gradient(180deg, #3B82F6 0%, #8B5CF6 33%, #EC4899 66%, #10B981 100%)",
                }}
              ></div>
            </div>

            {/* Steps Container - FIXED: Added z-index to ensure it's above the line */}
            <div className="pl-16 space-y-12 pt-6 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                  onClick={() => handleStepClick(index)}
                >
                  {/* Step Number */}
                  <div
                    className={`absolute -left-20 top-0 text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 z-20 ${
                      index <= activeStep ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      color: "#fff",
                      backgroundColor: step.color,
                      boxShadow: `0 2px 5px ${step.color}40`,
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Icon Circle */}
                  <div
                    className={`absolute -left-16 w-[40px] h-[40px] rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                      index <= activeStep
                        ? "scale-110 shadow-lg"
                        : "scale-90 bg-white/90 border border-slate-200/50"
                    }`}
                    style={{
                      backgroundColor:
                        index <= activeStep
                          ? step.color
                          : "rgba(255,255,255,0.9)",
                      boxShadow:
                        index <= activeStep
                          ? `0 8px 15px -3px ${step.color}40`
                          : "0 4px 6px rgba(0,0,0,0.05)",
                      transform: `scale(${
                        index === activeStep
                          ? 1.1
                          : index < activeStep
                          ? 1
                          : 0.9
                      })`,
                    }}
                  >
                    {React.createElement(step.icon, {
                      className: `w-5 h-5 transition-colors duration-300 ${
                        index <= activeStep ? "text-white" : "text-slate-500"
                      }`,
                    })}
                  </div>

                  {/* Content Card - FIXED: Added z-index to ensure it's above the line */}
                  <div
                    className={`bg-white/80 backdrop-blur-sm rounded-xl p-5 transition-all duration-500 z-10 ${
                      index <= activeStep
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-40"
                    }`}
                    style={{
                      borderColor:
                        index === activeStep
                          ? `${step.color}30`
                          : "rgba(241, 245, 249, 0.6)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      boxShadow:
                        index === activeStep
                          ? `0 8px 15px -5px ${step.color}20`
                          : "0 2px 8px rgba(0,0,0,0.03)",
                    }}
                  >
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{
                        color: index <= activeStep ? step.color : "#64748b",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-700 mb-1">
                      {step.description}
                    </p>
                    {step.sub && (
                      <p
                        className="text-xs font-medium mt-2 opacity-80"
                        style={{ color: step.color }}
                      >
                        {step.sub}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Navigation Dots */}
          <div className="flex justify-center mt-12 gap-2">
            {steps.map((step, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeStep ? "w-8" : ""
                }`}
                style={{
                  backgroundColor:
                    index <= activeStep
                      ? step.color
                      : "rgba(226, 232, 240, 0.8)",
                  opacity: index < activeStep ? 0.7 : 1,
                }}
                onClick={() => handleStepClick(index)}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;