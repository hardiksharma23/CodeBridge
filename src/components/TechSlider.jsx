import React from "react";
import { motion } from "framer-motion";

const techStack = [
  "React", "Next.js", "HTML", "CSS", "JavaScript",
  "AI/ML", "DevOps", "Cloud", "Cyber Security", "Blockchain"
];

const TechSlider = () => {
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <div className="flex w-full justify-center">
      <div className="relative w-11/12 max-w-[1260px] rounded-3xl overflow-hidden py-6">
        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-700 to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-700 to-transparent z-20" />

        <motion.div
          className="flex gap-8"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedStack.map((tech, index) => (
            <div
              key={index}
              className="text-white text-xl font-medium bg-gray-800 px-6 py-3 rounded-xl whitespace-nowrap"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

 export default TechSlider;