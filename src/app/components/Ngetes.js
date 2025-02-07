import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Ubah import karena "motion/react" salah

const AnimatedSVG = () => {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    fetch("/provindo.svg")
      .then((response) => response.text())
      .then((svgText) => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const pathElements = Array.from(svgDoc.querySelectorAll("path")).filter(
          (path) => path.getAttribute("fill") !== "none"
        ); // Filter hanya yang punya fill

        setPaths(
          pathElements.map((path, index) => ({
            id: path.id || `path-${index + 1}`,
            d: path.getAttribute("d"),
            fill: path.getAttribute("fill") || "#FFFFFF", // Pakai fill asli atau default putih
          }))
        );
      });
  }, []);

  return (
    <section className="relative w-full h-96 md:h-screen flex items-center justify-center overflow-hidden ">
      <motion.svg
        viewBox="0 0 1875.5 860.859"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-screen h-screen justify-center object-contain md:bottom-0"
        preserveAspectRatio="xMidYMid meet"
      >
        {paths.map((path, index) => (
          <motion.path
            key={path.id}
            d={path.d}
            initial={{
              fill: path.fill, // Pakai warna asli dari SVG
              opacity: 0,
            }}
            animate={{
              fill: path.fill, // Animasi warna
              scale: [0.9, 1],
              opacity: 1,
              stroke: "#4A90E2",
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
      
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 3,
        }}
        className="relative z-10 text-center top-28 md:top-0"
      >
        <h1 className="text-3xl md:text-6xl lg:text-9xl font-bold text-black drop-shadow-lg">
          Voisa Community
        </h1>
        <a
          href="https://discord.com/invite/dK6h568e"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative px-3 py-1 md:px-6 md:py-3 text-xs md:text-xl font-semibold bg-[#4A90E2] rounded-full text-white overflow-hidden group"
          >
            Learn More
            {/* Border animasi */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent opacity-0 group-hover:opacity-100"
              animate={{ backgroundPosition: ["0% 50%", "300% 50%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "linear-gradient(90deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ff92, #00c8ff, #8000ff, #ff0080, #ff0000)",
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
      </motion.div>
    </section>
  );
};



const Ngetes = () => {
  return (
    <div>
      <AnimatedSVG />
    </div>
  );
};

export default Ngetes;
