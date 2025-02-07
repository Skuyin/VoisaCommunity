import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ text }) => {
  useEffect(() => {
    const quotes = document.querySelectorAll(".animatedTitle");

    const splitText = (text) => {
      // Create a span element for each character and preserve spaces as separate span elements
      return text.split("").map((char, index) => {
        const span = document.createElement("span");
        span.className = "split-char inline-block";
        span.textContent = char === " " ? "\u00A0" : char; // Use non-breaking space for spaces
        return span;
      });
    };

    const setupSplits = () => {
      quotes.forEach((quote) => {
        // Get the text content, split it into characters, and update the element
        const splitChars = splitText(quote.innerText);
        quote.innerHTML = ""; // Clear the content
        splitChars.forEach((charElement) => {
          quote.appendChild(charElement); // Append each character back to the quote
        });

        // Set up the bounce animation
        gsap.from(quote.children, {
          scrollTrigger: {
            trigger: quote,
            toggleActions: "restart pause resume reverse",
            start: "center center",
          },
          duration: 0.8,
          ease: "bounce.out", // Bounce animation
          y: 50, // Start from below
          opacity: 0, // Start as invisible
          stagger: 0.05,
        });
      });
    };

    ScrollTrigger.addEventListener("refresh", setupSplits);
    setupSplits();

    return () => {
      // Cleanup the scroll trigger when the component is unmounted
      ScrollTrigger.removeEventListener("refresh", setupSplits);
    };
  }, []);

  return (
    <div className="flex items-start justify-center w-full px-4 pb-16">
      <div className="animatedTitle text-center text-6xl font-bold uppercase md:text-7xl text-black">
        {text}
      </div>
    </div>
  );
};

export default AnimatedTitle;
