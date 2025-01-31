"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    // Fetch the SVG content dynamically
    fetch("/indonesia.svg")
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const pathElements = Array.from(svgDoc.querySelectorAll("path")); // Get all <path> elements
        setPaths(
          pathElements.map((path, index) => ({
            id: path.id || `path-${index + 1}`, // Use the path ID or generate one
            d: path.getAttribute("d"), // Get the path's "d" attribute
          }))
        );
      });
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
    
      <motion.svg
        viewBox="0 0 792.54596 316.66394" // Adjusted for better centering
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-screen h-screen justify-center object-contain bottom-20 md:bottom-0"
        preserveAspectRatio="xMidYMid meet"
      >
        {paths.map((path, index) => (
          <motion.path
            key={path.id}
            d={path.d} // Set the "d" attribute for the path
            initial={{
              fill: "#FFFFFF", // Start color

              opacity: 1, // Fully transparent
              
            }}
            animate={{
              fill: ["#FFFFFF", "#7FB3FF", "#56CCF2", "#4A90E2"], // Gradual color change
              scale: [0.9, 1, 0.9], // Scale up and back down
              opacity: 1, // Fade in
              stroke: "#4A90E2"
            }}
            transition={{
              duration: 4, // Total animation time
              delay: index * 0.3, // Staggered delay for each path
              repeat: Infinity, // Loop forever
              repeatType: "reverse", // Reverse direction for smooth looping
              ease: "easeInOut", // Smooth easing
            }}
          />
        ))}
      </motion.svg>
      <div className="relative z-10 text-center top-20 md:top-0">
        <h1 className="text-2xl md:text-7xl font-bold text-black drop-shadow-lg">
          Voisa Community
        </h1>
        <button className="mt-5 px-4 py-2 text-sm md:text-xl font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;
