import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GsapMagnetic({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current; // Store the element reference

    const xTo = gsap.quickTo(element, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      xTo(x);
      yTo(y);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mouseleave", mouseLeave);

    return () => {
      if (element) {
        // Ensure the element exists before removing listeners
        element.removeEventListener("mousemove", mouseMove);
        element.removeEventListener("mouseleave", mouseLeave);
      }
    };
  }, []); // Run effect only once

  return React.cloneElement(children, { ref });
}
