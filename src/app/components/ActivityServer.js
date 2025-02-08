import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const ActivityServer = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden " id="activity">
      <h2 className="relative z-0 text-[10vw] font-black text-neutral-800 md:text-[100px]">
        Aktivitas<span className="text-indigo-500">.</span>
      </h2>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="https://dummyimage.com/300"
        alt="Example image"
        rotate="6deg"
        top="20%"
        left="25%"
        className="w-[150] md:w-[300]"
      />
      <Card
        containerRef={containerRef}
        src="https://dummyimage.com/300"
        alt="Example image"
        rotate="12deg"
        top="45%"
        left="60%"
        className="w-[150] md:w-[300]"
      />
      <Card
        containerRef={containerRef}
        src="https://dummyimage.com/300"
        alt="Example image"
        rotate="-6deg"
        top="20%"
        left="40%"
        className="w-[150] md:w-[300]"
      />
      <Card
        containerRef={containerRef}
        src="https://dummyimage.com/300&text=dummyimage.com+rocks!"
        alt="Example image"
        rotate="8deg"
        top="50%"
        left="40%"
        className="w-[150] md:w-[300]"
      />
      <Card
        containerRef={containerRef}
        src="https://dummyimage.com/300"
        alt="Example image"
        rotate="18deg"
        top="20%"
        left="65%"
        className="w-[150] md:w-[300]"
      />
      <Card
        containerRef={containerRef}
        src="https://dummyimage.com/300"
        alt="Example image"
        rotate="-3deg"
        top="35%"
        left="55%"
        className="w-[150] md:w-[300]"
      />
    </div>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <>
      <motion.img
        onMouseDown={updateZIndex}
        style={{
          top,
          left,
          rotate,
          zIndex,
        }}
        className={twMerge(
          "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
          className
        )}
        src={src}
        alt={alt}
        drag
        dragConstraints={containerRef}
        // Uncomment below and remove dragElastic to remove movement after release
        //   dragMomentum={false}
        dragElastic={0.65}
      />
    </>
  );
};

export default ActivityServer;
