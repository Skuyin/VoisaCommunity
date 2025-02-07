"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "../../utils/cn";

export const InfiniteScroll = ({
  direction,
  speed,
  pauseOnHover,
  children,
  className,
}) => {
  const [start, setStart] = useState(false);

  const scrollerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      className="overflow-hidden w-full scroller [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]"
      ref={containerRef}
    >
      <ul
        className={cn(
          "flex items-center justify-center gap-4 flex-nowrap  shrink-0 w-max",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
          className
        )}
        ref={scrollerRef}
      >
        {children}
      </ul>
    </div>
  );
};
