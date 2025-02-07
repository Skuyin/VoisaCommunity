"use client";

import { motion } from "motion/react";
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
    <section className="relative w-full h-96 md:h-screen flex items-center justify-center overflow-hidden">
      <motion.svg
        viewBox="0 0 792.54596 316.66394" // Adjusted for better centering
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-screen h-screen justify-center object-contain  md:bottom-0"
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
              // scale: [0.9, 1, 0.9], // Scale up and back down
              opacity: 1, // Fade in
              stroke: "#4A90E2",
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
      <div className="relative z-10 text-center top-12 md:top-0">
        <h2 className="my-6 text-center lg:text-9xl font-bold md:my-6 md:text-4xl text-[#000000]">
          Voisa Community
        </h2>
        <a
          href="https://discord.com/invite/F4Bjuyvs"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative px-6 py-3 my-6 text-sm md:text-xl font-semibold bg-[#000000] rounded-2xl text-white overflow-hidden group"
          >
            Learn More
            {/* Border animasi */}
            <motion.div
              className="absolute inset-1 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100"
              animate={{ backgroundPosition: ["0% 50%", "300% 50%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "linear-gradient(90deg,rgb(118, 118, 255), #80dfff)",
                backgroundSize: "300% 300%",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
              }}
            />
          </motion.button>
        </a>
      </div>
    </section>
  );
};

export default Hero;
