"use client"
import { useState, useEffect } from "react";

export function useMediaQuery(query, options = {}) {
  const [matches, setMatches] = useState(options.defaultValue ?? false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    if (options.initializeWithValue !== false) {
      setMatches(media.matches);
    }

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [query, options]);

  return matches;
}
